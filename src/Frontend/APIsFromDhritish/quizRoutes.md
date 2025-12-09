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
        "_id": "692ffaeae7fe31e72040c532",
        "title": "Digital Electronics",
        "description": "Test your knowledge of digital electronics including logic gates, Boolean algebra, number systems, combinational and sequential circuits, flip-flops, counters, and digital design concepts",
        "category": "ECE Essentials",
        "difficulty": "medium",
        "duration": 45,
        "questions": [
            ],
        "totalPoints": 60,
        "createdBy": {
            "_id": "692ff273a9249d52134a73a0",
            "username": "Dhritish504"
        },
        "isActive": true,
        "attemptCount": 4,
        "averageScore": 5,
        "createdAt": "2025-12-03T08:55:06.051Z",
        "updatedAt": "2025-12-04T13:01:17.217Z",
        "__v": 0,
        "imgLink": "https://framerusercontent.com/images/E7Mo5NTDmR1lbbwgXpnnLTW9svw.jpg?width=1000&height=750",
        "tags": [
            "Essentials"
        ]
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

## 6. Get AI Quiz (Turbo Mode)
**Route:** `POST /api/quiz/ai/upload/turbo`

**Description:** Generate AI-powered quizzes from uploaded documents (faster processing, supports PDFs, DOCX, PPTX, TXT, DOC, XLSX - **no image files**). The AI analyzes the document content and creates quiz questions based on the material.

**Authentication:** Required (cookies/token)

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
- `file` (File, **required**) - The document file to generate quiz from (PDF, DOCX, PPTX, TXT, DOC, XLSX only - no images)
- `numberOfQuestions` (String, **required**) - Number of questions to generate (e.g., "20")
- `difficulty` (String, **required**) - Difficulty level: "easy", "medium", "hard", "god level hard"

**Important Notes:**
- This is a **POST** request, not GET (file uploads require POST)
- Use `multipart/form-data` encoding (not JSON)
- Turbo mode is faster than slow mode but **does not support image files**
- Supported formats: PDF, DOCX, PPTX, TXT, DOC, XLSX

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "VHDL Concepts for Digital Design (Viva Questions)",
    "numberOfQuestions": 20,
    "difficulty": "god level hard",
    "questions": [
      {
        "id": 1,
        "question": "Consider the following VHDL code snippet:\nvhdl\nsignal s_data : std_logic;\nvariable v_temp : std_logic;\nprocess (clk)\nbegin\n  if rising_edge(clk) then\n    v_temp := '0';\n    s_data <= v_temp;\n    v_temp := '1';\n  end if;\nend process;\n\nIf `s_data` is initially 'X' and `clk` transitions from '0' to '1', what will be the value of `s_data` after the delta delay following this rising edge?",
        "options": {
          "A": "'0'",
          "B": "'1'",
          "C": "'X' (unchanged)",
          "D": "Undefined due to non-synthesizable construct."
        },
        "correctAnswer": "A",
        "explanation": "Variables (`v_temp`) are updated immediately upon assignment within a process. Signals (`s_data`) are updated after a delta delay, meaning the signal assignment `s_data <= v_temp;` uses the value of `v_temp` at the moment of assignment (`'0'`). The subsequent assignment `v_temp := '1';` updates `v_temp` immediately, but this new value is not seen by the `s_data` assignment from the current clock cycle."
      },
      {
        "id": 2,
        "question": "Which VHDL modeling style offers the highest level of abstraction for initial design conceptualization and algorithmic description but typically provides the least direct control over the specific gate-level implementation during synthesis?",
        "options": {
          "A": "Structural modeling",
          "B": "Dataflow modeling",
          "C": "Behavioral modeling",
          "D": "Mixed-signal modeling"
        },
        "correctAnswer": "C",
        "explanation": "Behavioral modeling describes functionality using algorithms and sequential statements (e.g., `if/elsif`, `case`, loops) within processes. This is the highest level of abstraction, focusing on *what* the circuit does rather than *how* it's built at the gate level. While synthesizable, the exact gate implementation is left more to the synthesis tool's interpretation, offering less explicit control than dataflow (Boolean equations) or structural (component instantiation)."
      }
      // ... 18 more questions
    ]
  },
  "fileInfo": {
    "filename": "VHDL_Viva_Questions.pdf",
    "size": 3701
  }
}
```

---

## 7. Get AI Quiz (Slow Mode)
**Route:** `POST /api/quiz/ai/upload/slow`

**Description:** Generate AI-powered quizzes from uploaded documents (supports PDFs, images, and other document formats). The AI analyzes the document content and creates quiz questions based on the material.

**Authentication:** Required (cookies/token)

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
- `file` (File, **required**) - The document file to generate quiz from (PDF, image, etc.)
- `numberOfQuestions` (String, **required**) - Number of questions to generate (e.g., "20")
- `difficulty` (String, **required**) - Difficulty level: "easy", "medium", "hard", "god level hard"

**Important Notes:**
- This is a **POST** request, not GET (file uploads require POST)
- Use `multipart/form-data` encoding (not JSON)
- This endpoint may take longer to respond due to AI processing

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "VHDL Concepts for Digital Design (Viva Questions)",
    "numberOfQuestions": 20,
    "difficulty": "god level hard",
    "questions": [
      {
        "id": 1,
        "question": "Consider the following VHDL code snippet:\nvhdl\nsignal s_data : std_logic;\nvariable v_temp : std_logic;\nprocess (clk)\nbegin\n  if rising_edge(clk) then\n    v_temp := '0';\n    s_data <= v_temp;\n    v_temp := '1';\n  end if;\nend process;\n\nIf `s_data` is initially 'X' and `clk` transitions from '0' to '1', what will be the value of `s_data` after the delta delay following this rising edge?",
        "options": {
          "A": "'0'",
          "B": "'1'",
          "C": "'X' (unchanged)",
          "D": "Undefined due to non-synthesizable construct."
        },
        "correctAnswer": "A",
        "explanation": "Variables (`v_temp`) are updated immediately upon assignment within a process. Signals (`s_data`) are updated after a delta delay, meaning the signal assignment `s_data <= v_temp;` uses the value of `v_temp` at the moment of assignment (`'0'`). The subsequent assignment `v_temp := '1';` updates `v_temp` immediately, but this new value is not seen by the `s_data` assignment from the current clock cycle."
      },
      {
        "id": 2,
        "question": "Which VHDL modeling style offers the highest level of abstraction for initial design conceptualization and algorithmic description but typically provides the least direct control over the specific gate-level implementation during synthesis?",
        "options": {
          "A": "Structural modeling",
          "B": "Dataflow modeling",
          "C": "Behavioral modeling",
          "D": "Mixed-signal modeling"
        },
        "correctAnswer": "C",
        "explanation": "Behavioral modeling describes functionality using algorithms and sequential statements (e.g., `if/elsif`, `case`, loops) within processes. This is the highest level of abstraction, focusing on *what* the circuit does rather than *how* it's built at the gate level. While synthesizable, the exact gate implementation is left more to the synthesis tool's interpretation, offering less explicit control than dataflow (Boolean equations) or structural (component instantiation)."
      }
      // ... 18 more questions
    ]
  },
  "fileInfo": {
    "filename": "VHDL_Viva_Questions.pdf",
    "size": 3701
  }
}
```

---

## 8. Get AI Quiz (No File Upload)
**Route:** `POST /api/quiz/ai/nofile`

**Description:** Generate AI-powered quizzes based on a topic without uploading any files. The AI creates quiz questions from its knowledge base on the specified topic.

**Authentication:** Required (cookies/token)

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "VHDL Concepts for Digital Design",
  "description": "Focus on signal vs variable differences, process sensitivity, and synthesizable constructs",
  "numberOfQuestions": 20,
  "difficulty": "hard"
}
```

**Request Body Parameters:**
- `title` (String, **required**) - The topic/subject for quiz generation (e.g., "JavaScript Arrays", "World War 2", "Photosynthesis")
- `description` (String, optional) - Additional context or specific areas to focus on within the topic
- `numberOfQuestions` (Number, **required**) - Number of questions to generate (e.g., 20)
- `difficulty` (String, **required**) - Difficulty level: "easy", "medium", "hard", "god level hard"

**Important Notes:**
- This is a **POST** request with JSON body (not form-data)
- No file upload required - AI generates questions from its knowledge base
- Make sure to set `Content-Type: application/json` header
- Use `description` field to provide more specific context for better question generation

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "VHDL Concepts for Digital Design",
    "numberOfQuestions": 20,
    "difficulty": "hard",
    "questions": [
      {
        "id": 1,
        "question": "What is the primary difference between a signal and a variable in VHDL?",
        "options": {
          "A": "Signals are updated immediately, variables after delta delay",
          "B": "Variables are updated immediately, signals after delta delay",
          "C": "Both are updated at the same time",
          "D": "Variables cannot be used in processes"
        },
        "correctAnswer": "B",
        "explanation": "In VHDL, variables are updated immediately when assigned within a process, while signals are scheduled to update after a delta delay. This is a fundamental distinction that affects how sequential logic is modeled."
      },
      {
        "id": 2,
        "question": "Which VHDL construct is used to model combinational logic most effectively?",
        "options": {
          "A": "Process with sensitivity list",
          "B": "Concurrent signal assignment",
          "C": "Sequential statements only",
          "D": "Component instantiation"
        },
        "correctAnswer": "B",
        "explanation": "Concurrent signal assignments are the most direct way to model combinational logic in VHDL as they execute continuously and update whenever their inputs change, similar to how combinational circuits behave."
      }
      // ... 18 more questions
    ]
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
