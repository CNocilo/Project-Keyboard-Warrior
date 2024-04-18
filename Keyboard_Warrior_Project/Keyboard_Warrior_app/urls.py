from django.urls import path
from . import views

urlpatterns = [
    path('api/leaderboard', views.leaderboard, name='leaderboard'),
    path('api/login', views.login, name='login'),
    path('api/register', views.register, name='register'),
    path('api/accountinfo', views.account_info, name='account_info'),
    path('api/accountupdate', views.account_update, name='account_update'),
    path('api/finishedgame', views.finished_game, name='finished_game'),
]