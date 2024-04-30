```backend urls and api formats:
get /api/leaderboard: (get list of top games)
response:
{ 
    "data":
        [
            { "rank": 1, "username": "Bob", "wpm": 85, "country": "USA", "keyboardLayout": "US" },
            { "rank": 2, "username": "Alice", "wpm": 80, "country": "UK", "keyboardLayout": "US" },
            { "rank": 3, "username": "John", "wpm": 75, "country": "Canada", "keyboardLayout": "Dvorak" },
            { "rank": 4, "username": "Eve", "wpm": 70, "country": "Australia", "keyboardLayout": "US" },
            { "rank": 5, "username": "Charlie", "wpm": 65, "country": "Germany", "keyboardLayout": "US" }
        ]
}
{"error": "server_error", "message": "error message"}


post /api/finishedgame: (insert a game when user finishes, user must be logged in)
{"wpm": 85}
response:
{"success": "Game inserted."}
{"error": "missing_key", "message": "Missing JSON key."}
{"error": "invalid_json", "message": "Invalid JSON data."}
{"error": "server_error", "message": "error message"}
{"error": "not_authenticated", "message":"You are not logged in."}
{"error": "post_required", "message": "Method must be POST"}


post /api/register: (register a user)
{
    "username": "bob",
    "password": "coolpassword123",
    "country": "US",
    "keyboard": "US"
}
response:
{'success': 'User created successfully'}
{"error": "missing_key", "message": "Missing JSON key."}
{"error": "invalid_json", "message": "Invalid JSON data."}
{"error": "server_error", "message": "error message"}
{"error": "post_required", "message": "Method must be POST"}



post /api/login: (login a user)
{"username": "bob", "password": "coolpassword123"}
response:
{"success": "User logged in successfully."}
{"error": "invalid_credentials", "message": "Invalid credentials"}
{"error": "missing_key", "message": "Missing JSON key."}
{"error": "invalid_json", "message": "Invalid JSON data."}
{"error": "server_error", "message": "error message"}
{"error": "post_required", "message": "Method must be POST"}



post /api/logout: (logout a user)
response:
{"success": "User logged out successfully."}
{"error": "server_error", "message": "error message"}


get /api/userinfo: (get the info for a user, dont have to be logged in)
http://127.0.0.1:8000/api/userinfo?username=bob
response:
{
    "data": {
        "username": user.username,
        "display_name": user.display_name,
        "country": user.country,
        "keyboard": user.keyboard,
        "description": user.description
    }
}
{"error": "missing_param", "message": "Missing query parameter 'username'"}
{"error": "user_not_found", "message": f"User with {username} not found."}
{"error": "server_error", "message": "error message"}


get /api/userhistory   (get history of users games)
http://127.0.0.1:8000/api/userhistory?username=bob&limit=10
limit is optional, defaults to 10
response:
{
    "data":
        [
            {"timestamp": "2024-04-19T19:59:39.758Z", 'wpm': 25},
            {"timestamp": "2024-04-19T19:59:39.758Z", 'wpm': 25},
            {"timestamp": "2024-04-19T19:59:39.758Z", 'wpm': 25}
        ]
}
{"error": "missing_param", "message": "Missing query parameter 'username'"}
{"error": "user_not_found", "message": f"User with {username} not found."}
{"error": "server_error", "message": "error message"}




post /api/userupdate: (update user info)
{"display_name":"bobasdf", "password":"nwepass123", "country":"CAN", "keyboard":"dvorak", "description":"new description"}
only need to include ones you want to update
response:
{"success": "User info updated successfully."}
{"error": "username_entered", "message": "Cannot change username."}
{"error": "unknown_key", "message": "Unknown keys sent."}
{"error": "missing_key", "message": "Missing JSON key."}
{"error": "invalid_json", "message": "Invalid JSON data."}
{"error": "server_error", "message": "error message"}
{"error": "not_authenticated", "message":"You are not logged in."}
{"error": "post_required", "message": "Method must be POST"}



get /api/checkloggedin: (check if user is logged in or not)
if logged in:
{"authenticated": True, "username": "bob"}
if not:
{"authenticated": False}
 
```