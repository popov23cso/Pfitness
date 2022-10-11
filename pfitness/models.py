from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    level = models.CharField(max_length=32, default="beginner")
    workout_type = models.CharField(max_length=16, default='None')
    calorie_goal = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    def __str__(self):
        return f"{self.username}"


class Streak(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    streak = models.IntegerField(default=0)
    last_day = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user} - {self.streak}"


class Excercise(models.Model):
    name = models.CharField(max_length=32)
    level = models.CharField(max_length=16)
    sets = models.IntegerField()
    reps = models.IntegerField()
    description = models.CharField(max_length=255)
    excercise_type = models.CharField(max_length=16)
    body_part = models.CharField(max_length=32)
    def __str__(self):
        return f"{self.name} - {self.excercise_type}"
    def serialize(self):
        return {
            "name": self.name,
            "level": self.level,
            "sets": self.sets,
            "reps": self.reps,
            "description": self.description,
            "exerciseType": self.excercise_type,
            "bodyPart": self.body_part
        }

class Foods(models.Model):
    name = models.CharField(max_length=24)
    calories = models.IntegerField()
    amount = models.IntegerField()
    type = models.CharField(max_length=16)
    def __str__(self):
        return f"{self.name}"


class Notes(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user}"


class ExcerciseList(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    exercise_list = models.ManyToManyField(Excercise)
    def __str__(self):
        return f"{self.user}"
