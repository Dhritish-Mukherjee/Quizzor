# Authentication Routes Done

## Sign Up
**Endpoint:** `POST /api/auth/signup`

**Description:** Register a new user account

**Request Body:**
```json
{
  "username": "Dhritish504",
  "email": "haha1@gm.com",
  "password": "xxxx"
}
```

---

## Log In
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate an existing user

**Request Body:**
```json
{
  "username": "Dhritish504",
  "email": "haha1@gm.com",
  "password": "xxxx"
}
```

---

## Log Out
**Endpoint:** `POST /api/auth/logout`

**Description:** Log out the current user

**Authentication:** Required (token via cookies)

**Request Body:** None

---

## Get User Details
**Endpoint:** `GET /api/auth/me`

**Description:** Retrieve the currently authenticated user's information

**Authentication:** Required (token via cookies)

**Request Body:** None

**Note:** This endpoint does not return the ObjectIds of quizzes the user has taken. Use `_` for that information.

---

## Refresh Token
**Endpoint:** `POST /api/auth/refresh`

**Description:** Refresh the authentication token

**Request Body:** None