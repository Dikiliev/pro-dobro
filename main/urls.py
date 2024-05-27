from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('catalog/', views.catalog, name='catalog'),
    path('about-us/', views.about_us, name='about-us'),

    path('course/<int:course_id>/', views.show_course, name='course'),
    path('join_team/<int:team_id>/', views.join_team, name='join_team'),
    # path('lesson/<int:lesson_id>/', views.show_lesson, name='lesson'),

    path('create-course/', views.create_course, name='create-course'),
    path('thanks/', views.thanks, name='thanks'),

    path('add-comment/', views.add_comment, name='add-comment'),
    path('get-comments/<int:course_id>', views.get_comments, name='get-comments'),

    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.logout_user, name='logout'),
]
