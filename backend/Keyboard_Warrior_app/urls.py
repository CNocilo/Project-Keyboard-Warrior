from django.urls import path
from . import views

urlpatterns = [
    path('api/leaderboard', views.leaderboard, name='leaderboard'),
    path('api/register', views.register_user, name='register_user'),
    path('api/login', views.login_user, name='login_user'),
    path('api/logout', views.logout_user, name='logout_user'),
    path('api/userinfo', views.user_info, name='user_info'),
    path('api/userupdate', views.user_update, name='user_update'),
    path('api/finishedgame', views.finished_game, name='finished_game'),
]