import json
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from .models import Game, GameUser


@csrf_exempt
def leaderboard(request):
    try:
        leaderboard_games = Game.objects.order_by('-wpm')[:10]    # query top games
        usernames = [game.username for game in leaderboard_games]    # extract userids from leaderboard_games
        users = GameUser.objects.filter(username__in=usernames)      # query the user objects using those ids
        user_map = {user.username: user for user in users}    # Create a dictionary to map user IDs to users
        
        # create the list containing game leaderboard data
        leaderboard_list = []
        for rank, game in enumerate(leaderboard_games, start=1):
            cur_user = user_map[game.username]
            leaderboard_list.append({
                'rank': rank,
                'username': cur_user.username,
                'wpm': game.wpm,
                'country': cur_user.country,
                'keyboardLayout': cur_user.keyboard
            })
            
        return JsonResponse({"data":leaderboard_list})
    
    except Exception as e:
        return JsonResponse({"error": "server_error", "message": str(e)}, status=500)
    

@csrf_exempt
def finished_game(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                username = request.user.username
                data = json.loads(request.body)
                wpm = data['wpm']
                
                game = Game.objects.create(username=username, wpm=wpm)    # Create a new Game object and insert into db
                return JsonResponse({"success": "Game inserted."}, status=201)
            
            except KeyError:
                return JsonResponse({"error": "missing_key", "message": "Missing JSON key."}, status=400)

            except json.JSONDecodeError:
                return JsonResponse({"error": "invalid_json", "message": "Invalid JSON data."}, status=400)

            except Exception as e:
                return JsonResponse({"error": "server_error", "message": str(e)}, status=500)

        else:
            return JsonResponse({"error": "not_authenticated", "message":"You are not logged in."}, status=401)
    else:
        return JsonResponse({"error": "post_required", "message": "Method must be POST"}, status=405)







@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            username = data['username']
            password = data['password']
            country = data['country']
            keyboard = data['keyboard']
            
            # todo: validate things like username not having cross site scripting, sql injection, valid unicode, etc
            
            # Create a new user instance
            new_user = GameUser.objects.create_user(
                username=username,
                password=password,
                display_name=username,
                country=country,
                keyboard=keyboard,
                description=""
            )

            return JsonResponse({'success': 'User created successfully'}, status=201)
        
        except KeyError:
            return JsonResponse({"error": "missing_key", "message": "Missing JSON key."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid_json", "message": "Invalid JSON data."}, status=400)

        except Exception as e:
            return JsonResponse({"error": "server_error", "message": str(e)}, status=500)

    else:
        return JsonResponse({"error": "post_required", "message": "Method must be POST"}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            username = data['username']
            password = data['password']

            # Authenticate user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"success": "User logged in successfully."})
            
            else:
                return JsonResponse({"error": "invalid_credentials", "message": "Invalid credentials"}, status=401)
            
        except KeyError:
            return JsonResponse({"error": "missing_key", "message": "Missing JSON key."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid_json", "message": "Invalid JSON data."}, status=400)

        except Exception as e:
            return JsonResponse({"error": "server_error", "message": str(e)}, status=500)

    else:
        return JsonResponse({"error": "post_required", "message": "Method must be POST"}, status=405)



@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"success": "User logged out successfully."})
    else:
        return JsonResponse({"error": "post_required", "message": "Method must be POST"}, status=405)

@csrf_exempt
def user_info(request):
    try:
        username = request.GET.get('username')  # query string
        if not username:
            return JsonResponse({"error": "missing_param", "message": "Missing query parameter 'username'"}, status=400)

        user = GameUser.objects.get(username=username)
        
        return JsonResponse({
            "data": {
                "username": user.username,
                "display_name": user.display_name,
                "country": user.country,
                "keyboard": user.keyboard,
                "description": user.description
            }
        })

    except ObjectDoesNotExist:
        return JsonResponse({"error": "user_not_found", "message": f"Username {username} not found."}, status=400)

    except Exception as e:
        return JsonResponse({"error": "server_error", "message": str(e)}, status=500)




@csrf_exempt
def user_history(request):
    try:
        username = request.GET.get('username')  # Get the username from the query string parameter
        if not username:
            return JsonResponse({"error": "missing_param", "message": "Missing query parameter 'username'"}, status=400)
        limit = int(request.GET.get('limit', 10))  # Default to 10 records if limit parameter is not provided
        
        # Check if the user exists
        user_exists = GameUser.objects.filter(username=username).exists()
        if not user_exists:
            return JsonResponse({"error": "user_not_found", "message": f"User with username '{username}' not found."}, status=404)
        
        # Query the Game objects for the user's history, limit by limit
        user_games = Game.objects.filter(username=username).order_by('-timestamp')[:limit]
        
        # Create a list containing the user's game history data
        user_history = []
        for game in user_games:
            user_history.append({
                'timestamp': game.timestamp,
                'wpm': game.wpm
            })
        
        return JsonResponse({"data": user_history})
    
    except Exception as e:
        return JsonResponse({"error": "server_error", "message": str(e)}, status=500)



@csrf_exempt
def user_update(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                user = request.user
                data = json.loads(request.body)
                
                for key, value in data.items():
                    if key == 'username':
                        return JsonResponse({"error": "username_entered", "message": "Cannot change username."}, status=400)
                    if key == 'password':
                        user.set_password(value)
                    elif key in ['display_name', 'country', 'keyboard', 'description']:
                        setattr(user, key, value)
                    else:
                        return JsonResponse({"error": "unknown_key", "message": "Unknown keys sent."}, status=400)
                
                user.save()
                return JsonResponse({"success": "User info updated successfully."})
            
            except KeyError:
                return JsonResponse({"error": "missing_key", "message": "Missing JSON key."}, status=400)

            except json.JSONDecodeError:
                return JsonResponse({"error": "invalid_json", "message": "Invalid JSON data."}, status=400)

            except Exception as e:
                return JsonResponse({"error": "server_error", "message": str(e)}, status=500)
            
        else:
            return JsonResponse({"error": "not_authenticated", "message":"You are not logged in."}, status=401)
    else:
        return JsonResponse({"error": "post_required", "message": "Method must be POST"}, status=405)


@csrf_exempt
def check_logged_in(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated": True, "username": request.user.username})
    else:
        return JsonResponse({"authenticated": False})



