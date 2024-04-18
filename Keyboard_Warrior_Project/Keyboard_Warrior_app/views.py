from django.http import JsonResponse
from .models import Game, User

def leaderboard(request):
    # todo, get leaderboard info from db, generate json, respond with that
    return JsonResponse("todo", safe=False)

def login(request):
    if request.method == 'POST':
        # todo: implement login logic
        return JsonResponse("todo", safe=False)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def register(request):
    if request.method == 'POST':
        # todo: implement user creation logic
        return JsonResponse("todo", safe=False)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def account_info(request):
    # todo: implement getting account info from db
    return JsonResponse("todo", safe=False)

def account_update(request):
    if request.method == 'POST':
        # todo, implement getting info from browser and update user in db with that
        return JsonResponse("todo", safe=False)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def finished_game(request):
    if request.method == 'POST':
        # todo, implement getting game info from browser and insert in db
        return JsonResponse("todo", safe=False)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)