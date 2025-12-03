Route to SignUp as an User -> @POST api/auth/signup
Required JSON Body Sample -> 
```json
{
  "username": "Dhritish504",
  "email": "haha1@gm.com",
  "password": "xxxx",
}


Route to LogIn as an User -> @POST api/auth/login
Required JSON Body Sample -> 
```json
{
  "username": "Dhritish504",
  "email": "haha1@gm.com",
  "password": "xxxx"
}

Route to LogOut as an User -> @POST /api/auth/logout
No JSON body required, must have cookies(token)

Route to get User Details -> @GET /api/auth/me
No JSON body required, must have cookies(token)
Note : This doesn't returns the ObjectIds of the Quizzes the user has take. Use _ for that

Route to Refresh Token -> @POST /api/auth/refresh
