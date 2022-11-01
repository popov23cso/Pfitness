from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("programs", views.programs_view, name="programs"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("calculators", views.calculators, name="calculators"),
    path("logout", views.logout_view, name="logout"),
    path("homepage", views.homepage, name="homepage"),
    path("foods/<str:type>", views.foods, name="foods"),
    path("profile", views.profile, name="profile"),
    path("profile_update/<str:action>/<str:user_id>", views.update_profile, name="updateprofile"),
    path("notebook", views.notebook, name="notebook"),
    path("add_note", views.add_note, name="add_note"),
    path("exercises/<str:type>", views.get_exercises, name="exercise_type"),
    path("exercises", views.exercises_view, name="exercises"),
    path("exercise/<str:ex_name>", views.exercise_view, name="exercise"),
    path("my_exercises", views.exercise_list, name="exercise_list"),
    path("manage_list", views.manage_list, name="manage_list")
]