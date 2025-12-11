# 🎯 Quizzor.ai - Smart AI Quiz Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org)

> AI-powered quiz platform with real-time competitions, intelligent quiz generation, and global leaderboards.

**Live Demo**: [https://quizzor.onrender.com/](https://quizzor.onrender.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Setup Instructions](#-setup-instructions)
- [API Documentation](#-api-documentation)
- [Dependencies](#-dependencies)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🌟 Overview

Quizzor.ai is an interactive quiz platform that combines AI-powered content generation with competitive learning. Upload documents, generate custom quizzes, compete globally, and track your progress through comprehensive analytics.

**Key Highlights:**
- 🤖 AI quiz generation from PDFs, images, or topics
- 🏆 Real-time global and quiz-specific leaderboards
- 📊 Detailed performance analytics and history
- ⚡ Multiple difficulty levels (Easy to God Level Hard)
- 📱 Fully responsive mobile-first design

---

## ✨ Features

### 🤖 AI Quiz Generation (3 Modes)

**Turbo Mode** (3-5x faster)
- Fast text extraction from PDF, DOCX, PPTX, XLSX, TXT
- No image support
- Best for text-heavy documents

**Slow Mode** (Comprehensive)
- Supports all formats including images
- Multimodal question generation
- Best for visual content

**No-File Mode** (Instant)
- Topic-based generation
- No upload required
- Powered by Gemini AI knowledge base

### 🏆 Leaderboard System
- Global rankings across all users
- Quiz-specific leaderboards
- Real-time Redis-powered updates (O(log N))
- Personal rank tracking

### 📊 Analytics Dashboard
- Complete quiz history
- Performance metrics (accuracy, scores, time)
- Category-wise analysis
- Detailed submission reviews

### 🎮 Quiz Experience
- Live question delivery
- Instant feedback
- Timer-based challenges
- Comprehensive results

---

## 🧰 Tech Stack

### Frontend
**React.js** · **TailwindCSS** · **Framer Motion** · **React Router** · **Axios**

### Backend
**Node.js** · **Express** · **MongoDB** · **Redis** · **JWT** · **Bcrypt**

### AI & Processing
**Google Gemini AI** · **PDF-Parse** · **Mammoth** · **XLSX** · **Officeparser** · **Multer**

---

## 🏗 Architecture

### System Overview
```
React Client ←→ Express Server ←→ MongoDB
                      ↓
              ┌───────┴───────┐
              ↓               ↓
           Redis          Gemini AI
        (Leaderboard)    (Quiz Gen)
```

### Backend Structure
```
src/backend/src/
├── controllers/     # Business logic
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── middleware/      # Auth & validation
├── utils/           # File parsers, AI helpers
├── config/          # DB, Redis, Gemini setup
└── server.js        # Entry point
```

### Frontend Structure
```
src/frontend/src/
├── api/             # Axios setup
├── components/      # Reusable UI components
├── pages/           # Route components
├── context/         # Global state
├── assets/          # Static resources
└── App.jsx
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 6.0
- Redis >= 7.0
- Google Gemini API Key

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Dhritish-Mukherjee/Quizzor.git
cd Quizzor
```

**2. Backend Setup**
```bash
cd src/backend/src
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizzor
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
GEMINI_API_KEY_1=your_gemini_key
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=10485760
```

**3. Frontend Setup**
```bash
cd ../../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running Locally

**Start Backend:**
```bash
cd src/backend/src
npm run dev
```
Server runs on `http://localhost:5000`

**Start Frontend:**
```bash
cd src/frontend
npm run dev
```
App runs on `http://localhost:5173`

---

## 📡 API Documentation

### Base URL
```
Production: https://quizzor.onrender.com/api
Development: http://localhost:5000/api
```

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Log In
```http
POST /api/auth/login

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Log Out
```http
POST /api/auth/logout
Cookie: token=<jwt_token>
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=<jwt_token>
```

---

### Quiz Endpoints

#### Get All Quizzes
```http
GET /api/quiz/?category=ECE&difficulty=medium&page=1&limit=10
Cookie: token=<jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "quiz_id",
      "title": "Digital Electronics",
      "category": "ECE Essentials",
      "difficulty": "medium",
      "duration": 45,
      "totalPoints": 60,
      "attemptCount": 24,
      "averageScore": 42.5,
      "createdBy": { "username": "creator" }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

#### Get Single Quiz
```http
GET /api/quiz/:id
Cookie: token=<jwt_token>
```

#### Submit Quiz Answers
```http
POST /api/quiz/:id/submit
Cookie: token=<jwt_token>

{
  "answers": [
    { "questionId": "question_id_1", "selectedAnswer": 0 },
    { "questionId": "question_id_2", "selectedAnswer": 2 }
  ],
  "timeTaken": 1800
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 45,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "accuracy": 80,
    "timeTaken": 1800
  }
}
```

#### Get Quiz History
```http
GET /api/quiz/history?page=1&limit=10
Cookie: token=<jwt_token>
```

#### Get Submission Details
```http
GET /api/quiz/submission/:id
Cookie: token=<jwt_token>
```

---

### AI Quiz Generation

#### Turbo Mode (Fast, Text-Only)
```http
POST /api/quiz/ai/upload/turbo
Cookie: token=<jwt_token>
Content-Type: multipart/form-data

Form Data:
- file: <PDF/DOCX/PPTX/XLSX/TXT/DOC>
- numberOfQuestions: "20"
- difficulty: "hard"
```

**Supported:** PDF, DOCX, PPTX, XLSX, TXT, DOC (NO images)

#### Slow Mode (Comprehensive, All Formats)
```http
POST /api/quiz/ai/upload/slow
Cookie: token=<jwt_token>
Content-Type: multipart/form-data

Form Data:
- file: <Any document or image>
- numberOfQuestions: "15"
- difficulty: "medium"
```

**Supported:** All formats including images

#### No-File Mode (Topic-Based)
```http
POST /api/quiz/ai/nofile
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "title": "JavaScript Promises",
  "description": "Focus on async/await, error handling",
  "numberOfQuestions": 10,
  "difficulty": "easy"
}
```

**Response (All Modes):**
```json
{
  "success": true,
  "data": {
    "title": "Quiz Title",
    "numberOfQuestions": 20,
    "difficulty": "hard",
    "questions": [
      {
        "id": 1,
        "question": "What is closure in JavaScript?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "A closure is a function that has access..."
      }
    ]
  }
}
```

---

### Leaderboard Endpoints

#### Get Global Leaderboard
```http
GET /api/leaderboard/global
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "username": "topPlayer",
      "totalScore": 1250,
      "quizzesTaken": 45,
      "averageAccuracy": 92.3
    }
  ]
}
```

#### Get Quiz-Specific Leaderboard
```http
GET /api/leaderboard/quiz/:quizId
```

#### Get My Global Rank
```http
GET /api/leaderboard/myrank/global
Cookie: token=<jwt_token>
```

#### Get My Quiz Rank
```http
GET /api/leaderboard/myrank/quiz/:quizId
Cookie: token=<jwt_token>
```

---

## 📦 Dependencies

### Backend
```json
{
  "@google/generative-ai": "^0.24.1",
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "express": "^4.22.1",
  "jsonwebtoken": "^9.0.2",
  "mammoth": "^1.11.0",
  "mongoose": "^9.0.0",
  "multer": "^2.0.2",
  "officeparser": "^5.2.2",
  "pdf-parse": "^1.1.0",
  "redis": "^5.10.0",
  "validator": "^13.15.23",
  "xlsx": "^0.18.5"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0",
  "framer-motion": "^10.16.0",
  "tailwindcss": "^3.3.6"
}
```

---

## 📝 Example Usage

### Generate AI Quiz from PDF
```bash
curl -X POST http://localhost:5000/api/quiz/ai/upload/turbo \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -F "file=@document.pdf" \
  -F "numberOfQuestions=20" \
  -F "difficulty=hard"
```

### Submit Quiz Answers
```bash
curl -X POST http://localhost:5000/api/quiz/QUIZ_ID/submit \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {"questionId": "q1", "selectedAnswer": 0},
      {"questionId": "q2", "selectedAnswer": 2}
    ],
    "timeTaken": 1200
  }'
```

---

## 👥 Contributors

| Role | Name | GitHub |
|------|------|--------|
| **Backend, Blockchain, AI** | Dhritish Mukherjee | [@Dhritish-Mukherjee](https://github.com/Dhritish-Mukherjee) |
| **Frontend, Design, AI** | Pabitra Maity | [@CodeWithPabitra](https://github.com/Codewithpabitra) | |
| **Design & Testing** | Rupam Saha | - |

---

## 📄 License

MIT License © 2025 Quizzor.ai Team

---

## ⭐ Show Your Support

If you found Quizzor.ai helpful, please consider:
- ⭐ Starring the repository on GitHub
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 📢 Sharing with others who might find it useful

---

**Made with ❤️ by the Quizzor.ai Team**