# Quiz Routes Documentation Done

## 1. Get All Quizzes
**Route:** `GET /api/quiz/`

**Description:** Fetch all quizzes posted on the platform

**Authentication:** Required (cookies/token)

**Request Body:** None

**Query Parameters (Optional):**
- `category` - Filter by quiz category
- `difficulty` - Filter by difficulty level
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "6932051dc47166529a840183",
            "title": "Electronic Devices and VLSI",
            "description": "A comprehensive quiz covering fundamental concepts of semiconductor devices, integrated circuits, VLSI design, fabrication processes, logic gates, and digital electronics.",
            "category": "ECE Essentials",
            "difficulty": "easy",
            "duration": 60,
            "questions": [
                {
                    "questionText": "What is the fan-in of a logic gate?",
                    "options": [
                        "Number of outputs",
                        "Number of inputs",
                        "Power consumption",
                        "Propagation delay"
                    ],
                    "points": 1,
                    "_id": "6932051dc47166529a8401c8"
                },
                {
                    "questionText": "The propagation delay in a logic gate is the time:",
                    "options": [
                        "To turn on",
                        "Between input change and output response",
                        "To cool down",
                        "To charge capacitor"
                    ],
                    "points": 1,
                    "_id": "6932051dc47166529a8401c9"
                }
            ],
            "totalPoints": 100,
            "createdBy": {
                "_id": "6931ff69c47166529a840044",
                "username": "PureMeowTea"
            },
            "isActive": true,
            "attemptCount": 0,
            "averageScore": 0,
            "imgLink": "https://oss.smbom.com/news/fileAnnexes/2023-06-12/8ec4adb5-6d95-456d-8af0-b01f00eb9e01.png?x-oss-process=style/mobile_img",
            "tags": [
                "MegaQuiz"
            ],
            "createdAt": "2025-12-04T22:03:09.427Z",
            "updatedAt": "2025-12-04T22:03:09.427Z",
            "__v": 0
        },
        {
            "_id": "69320237c47166529a840112",
            "title": "Python Programming",
            "description": "A challenging mini quiz covering advanced Python concepts including decorators, generators, async IO, metaclasses, memory model, OOP internals, GIL, and language-specific behaviors.",
            "category": "Development Hustles",
            "difficulty": "hard",
            "duration": 30,
            "questions": [
                {
                    "questionText": "What does Python’s garbage collector primarily use to detect unreferenced objects?",
                    "options": [
                        "Reference counting + cycle detection",
                        "Mark and sweep only",
                        "Tracing GC only",
                        "Manual memory free"
                    ],
                    "points": 3,
                    "_id": "69320237c47166529a84011e"
                },
                {
                    "questionText": "Which comprehension type creates a generator instead of a list?",
                    "options": [
                        "{x for x in range(10)}",
                        "[x for x in range(10)]",
                        "(x for x in range(10))",
                        "tuple(x for x in range(10))"
                    ],
                    "points": 3,
                    "_id": "69320237c47166529a84011f"
                }
            ],
            "totalPoints": 60,
            "createdBy": {
                "_id": "6931ff69c47166529a840044",
                "username": "PureMeowTea"
            },
            "isActive": true,
            "attemptCount": 4,
            "averageScore": 50,
            "imgLink": "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "tags": [
                "MiniQuiz"
            ],
            "createdAt": "2025-12-04T21:50:47.276Z",
            "updatedAt": "2025-12-05T00:04:16.212Z",
            "__v": 0
        }
      ],
        "pagination": {
                "page": 1,
                "limit": 10,
                "total": 13,
                "pages": 2
            }

}



```

---

## 2. Get Single Quiz
**Route:** `GET /api/quiz/:id`

**Description:** Fetch a specific quiz by its ID

**Authentication:** Required (cookies/token)

**Path Parameters:**
- `id` - Quiz ID (obtained from the quiz list in route #1)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "quiz_id",
    "title": "Quiz Title",
    "category": "Category",
    "difficulty": "medium",
    "questions": [
      {
        "_id": "question_id",
        "question": "Question text?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "points": 10
      }
    ],
    "createdBy": {
      "username": "creator_name"
    }
  }
}
```

---

## 3. Get Quiz History
**Route:** `GET /api/quiz/history`

**Description:** Fetch all quiz submissions/attempts by the authenticated user

**Authentication:** Required (cookies/token)

**Request Body:** None

**Query Parameters (Optional):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "submission_id_here",
      "quiz": {
        "title": "Quiz Title",
        "category": "Category",
        "difficulty": "hard"
      },
      "score": 80,
      "totalQuestions": 10,
      "correctAnswers": 8,
      "accuracy": 80,
      "timeTaken": 1200,
      "completedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

## 4. Submit Quiz Answers
**Route:** `POST /api/quiz/:id/submit`

**Description:** Submit answers for a specific quiz

**Authentication:** Required (cookies/token)

**Path Parameters:**
- `id` - Quiz ID (the quiz you're currently attempting)

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "692ffaeae7fe31e72040c533",
      "selectedAnswer": 2
    },
    {
      "questionId": "692ffaeae7fe31e72040c534",
      "selectedAnswer": 1
    },
    {
      "questionId": "692ffaeae7fe31e72040c535",
      "selectedAnswer": 3
    },
    {
      "questionId": "692ffaeae7fe31e72040c536",
      "selectedAnswer": 0
    }
  ],
  "timeTaken": 2400
}
```

**Field Descriptions:**
- `answers` - Array of answer objects
  - `questionId` - ID of the question (from the quiz data)
  - `selectedAnswer` - Index of selected option (0-based)
- `timeTaken` - Time taken in seconds

**Response:**
```json
{
  "success": true,
  "data": {
    "submission": {
      "_id": "submission_id",
      "user": "user_id",
      "quiz": "quiz_id",
      "answers": [],
      "completedAt": "2024-01-01T12:00:00Z"
    },
    "score": 75,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "accuracy": 80,
    "timeTaken": 2400
  }
}
```

---

## 5. Get Submission Details
**Route:** `GET /api/quiz/submission/:id`

**Description:** Fetch detailed information about a specific quiz submission

**Authentication:** Required (cookies/token)

**Path Parameters:**
- `id` - Submission ID (obtained from quiz history in route #3)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "submission_id",
    "user": {
      "username": "user_name",
      "email": "user@example.com"
    },
    "quiz": {
      "title": "Quiz Title",
      "questions": []
    },
    "answers": [
      {
        "questionId": "question_id",
        "selectedAnswer": 2,
        "isCorrect": true,
        "points": 10
      }
    ],
    "score": 80,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "accuracy": 80,
    "timeTaken": 1200,
    "completedAt": "2024-01-01T12:00:00Z"
  }
}
```

---

## Flow Summary

### Taking a Quiz:
1. `GET /api/quiz/` → Get list of available quizzes
2. `GET /api/quiz/:id` → Fetch specific quiz details (questions, options)
3. User answers questions
4. `POST /api/quiz/:id/submit` → Submit answers
5. `GET /api/quiz/submission/:id` → View detailed results (optional)

### Viewing History:
1. `GET /api/quiz/history` → Get all past submissions
2. `GET /api/quiz/submission/:id` → View specific submission details

---

## Notes
- All routes require authentication via cookies/token
- Question IDs are found in the quiz object returned by route #2
- Submission IDs are found in the history response from route #3 or the submit response from route #4
- `selectedAnswer` uses 0-based indexing (0 = first option, 1 = second option, etc.)
- `timeTaken` should be in seconds
