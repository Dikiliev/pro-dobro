from django.contrib import admin
from .models import User, Course, Comment

admin.site.register(User)
admin.site.register(Course)
admin.site.register(Comment)
