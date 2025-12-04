# Leaderboard Routes

## Get Global Rankings
**Endpoint:** `GET /api/leaderboard/global`

**Description:** Retrieve the overall rankings of all users globally

**Authentication:** Not required

**Request Body:** None

---

## Get My Global Rank
**Endpoint:** `GET /api/leaderboard/myrank/global`

**Description:** Retrieve your rank among all users globally

**Authentication:** Required (token via cookies)

**Request Body:** None

---

## Get My Rank for a Specific Quiz
**Endpoint:** `GET /api/leaderboard/myrank/quiz/:quizId`

**Description:** Retrieve your rank for a particular quiz

**Authentication:** Required (token via cookies)

**Request Body:** None

**URL Parameters:**
- `quizId` - The ID of the quiz (can be fetched from `GET /api/quiz/`)

---

## Get Quiz Leaderboard
**Endpoint:** `GET /api/leaderboard/quiz/:quizId`

**Description:** Retrieve the leaderboard for a particular quiz

**Authentication:** Not required

**Request Body:** None

**URL Parameters:**
- `quizId` - The ID of the quiz (can be fetched from `GET /api/quiz/`)