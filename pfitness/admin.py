from django.contrib import admin
from .models import User, Excercise, Notes, Streak, Foods, ExcerciseList

# Register your models here.

admin.site.register(User)
admin.site.register(Excercise)
admin.site.register(Notes)
admin.site.register(Streak)
admin.site.register(Foods)
admin.site.register(ExcerciseList)

