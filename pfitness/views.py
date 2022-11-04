from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from .models import User, Excercise, Notes, Streak, Foods, ExcerciseList
import datetime
import json


# Create your views here.

levels = ["beginner", "intermediate", "experienced"]
programs = ["cardio", "bodybuilding", "strength"]
food_types = ["protein", "carb", "fat"]

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        #Attempt to log the user in
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            present = datetime.datetime.now().date()
            streak = Streak.objects.get(user=user)
            if present > streak.last_day.date():
                streak.streak += 1
                streak.last_day = datetime.datetime.now()
                streak.save()
            return redirect("index")
        else:
            return render(request, "pfitness/login.html", {
                "error": "Invalid username and/or password!"
            })

    else:    
        return render(request, "pfitness/login.html")


def register(request):

    #Accept only POST requests
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        check = request.POST["passwordcheck"]
        email = request.POST["email"]
        if password != check:
            return render(request, "pfitness/register.html", {
                "error": "Passwords must match!"
            })

        #Attempt to create a new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "pfitness/register.html", {
                "error": "Username already taken!"
            })

        streak = Streak(user=user)
        streak.save()
        login(request, user)
        return redirect("index")
    else:
        return render(request, "pfitness/register.html")


def logout_view(request):

    #Log the user out
    logout(request)
    return redirect("index")


def index(request):
    return render(request, "pfitness/index.html")


@login_required
def homepage(request):
    return render(request, "pfitness/homepage.html")


def programs_view(request):
    return render(request, "pfitness/programs.html")


@login_required
def calculators(request):
    return render(request, "pfitness/calculators.html")


@login_required
def foods(request):

    #Check if the requested food type exists
   
    return render(request, "pfitness/foods.html")


@login_required
def profile(request):
    streak = Streak.objects.get(user=request.user)
    present = datetime.datetime.now().date()

    #If a day has passed update the users streak
    if present > streak.last_day.date():
        streak.streak += 1
        streak.last_day = datetime.datetime.now()
        streak.save()
    
    leaderboard = Streak.objects.order_by("-streak")[:5]
    return render(request, "pfitness/profile.html", {
        "streak": streak.streak,
        "leaderboard": leaderboard
    })

@login_required
def update_profile(request, action, user_id):

    #Accept only PUT requests
    if request.method == "PUT":
        tmp = json.loads(request.body)
        value = tmp.get("value")

        #Check if all of the needed data is provided
        if not action or not value or not user_id:
            return JsonResponse({"error": "missing information!"}, status=404)
        
        #Check if the requested user exists and if an user doesnt try to change another users personal stats
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse({"error": "No such user!"}, status=404)
        if request.user != user:
            return JsonResponse({"error": "Only the owner of the profile can edit theese values!"}, status=404)

        #Update the users personal stats depending on the action selected
        if action == "updateweight":
            try:
                value = int(value)
            except ValueError:
                return JsonResponse({"error": "Only integers allowed"}, status=404)
            user.weight = value
            user.save()
            return HttpResponse(status=204)
        elif action == "updatecalories":
            try:
                value = int(value)
            except ValueError:
                return JsonResponse({"error": "Only integers allowed"}, status=404)
            user.calorie_goal = value
            user.save()
            return HttpResponse(status=204)
        elif action == "updatelevel":
            if value not in levels:
                return JsonResponse({"error": "Invalid level selected"}, status=404)
            user.level = value
            user.save()
            return HttpResponse(status=204)
        elif action == "updateworkout":
            if value not in programs:
                return JsonResponse({"error": "Invalid program selected"}, status=404)
            user.workout_type = value
            user.save()
            return HttpResponse(status=204)
        else:
            return JsonResponse({"error": "Invalid request"}, status=404)

    else:
            return JsonResponse({"error": "Only PUT requests accepted"}, status=404)
        
@login_required
def notebook(request):

    #Loaded paginated version of the users noted - 4 at a time
    notes = Paginator(Notes.objects.filter(user=request.user).order_by("-timestamp").all(), 4)
    step = request.GET.get('page')
    paginated = notes.get_page(step)
    return render(request, "pfitness/notebook.html", {
        "notes": paginated
    })

@login_required
def add_note(request):

    #Accept only PUT requests
    if request.method == "PUT":
        tmp = json.loads(request.body)
        content = tmp.get("content")
        if not content:
            return JsonResponse({"error": "missing description!"}, status=404)
        note = Notes(user=request.user, content=content)
        note.save()
        return HttpResponse(status=204)
    else:
        return JsonResponse({"error": "Only PUT requests accepted"}, status=404)


@login_required
def get_exercises(request, type):

    #Check the requested exercise type
    if type not in programs:
        return JsonResponse({"error": "Invalid type."}, status=400)
    exercises = Excercise.objects.filter(excercise_type=type)
    return JsonResponse([exercise.serialize() for exercise in exercises], safe=False)


def get_foods(request, type):

    if type not in food_types:
        return JsonResponse({"error", "Invalid food type"}, status=400)
    foodList = Foods.objects.filter(type=type)
    return JsonResponse([food.serialize() for food in foodList], safe=False)

@login_required
def exercises_view(request):
    return render(request, "pfitness/exercises.html")


@login_required
def exercise_view(request, ex_name):

    #Try to get an exercise by name
    try:
        ex = Excercise.objects.get(name=ex_name)
    except Excercise.DoesNotExist:
            return render(request, "pfitness/error.html", {
            "error": "No such exercise in our database!"
        })

    #Check if the execise is in the users personal list
    try:
        exlist = ExcerciseList.objects.get(user=request.user)
        exercises = exlist.exercise_list.all()
    except ExcerciseList.DoesNotExist:
        exercises = None
    if exercises:
        if ex in exercises:
            check = True
        else:
            check = False
    else:
        check = False

    return render(request, "pfitness/exercise.html", {
        "exercise": ex,
        "check": check
    })


@login_required
def exercise_list(request):

    #Try to get the users personal exercise list
    try:
        exlist = ExcerciseList.objects.get(user=request.user)
        exercises = exlist.exercise_list.all()
    except ExcerciseList.DoesNotExist:
        exercises = None
    return render(request, "pfitness/exerciseList.html", {
        "exercises": exercises
    })


@login_required
def manage_list(request):

    #Accept only PUT requests
    if request.method == "PUT":
        tmp = json.loads(request.body)
        ex_pk = tmp.get("ex_pk")
        action = tmp.get("action")

        #Check for mising data
        if not ex_pk or not action:
            return JsonResponse({"error": "Missing input data"}, status=404)

        #Check if the exercise that is requested exists
        try:
            ex = Excercise.objects.get(pk=ex_pk)
        except Excercise.DoesNotExist:
            return JsonResponse({"error": "No such exercise found"}, status=404)

        exlist = ExcerciseList.objects.get(user = request.user)
        if action == "add":
            exlist.exercise_list.add(ex)
            return HttpResponse(status=204)
        elif action == "remove":
            exlist.exercise_list.remove(ex)
            return HttpResponse(status=204)
        else:
            return JsonResponse({"error": "Invalid command"}, status=404)

    else:
            return JsonResponse({"error": "Only PUT requests accepted"}, status=404)
