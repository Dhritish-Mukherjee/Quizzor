# 🚀 Quizzor.ai – Backend API & AI Engine

`Quizzor.ai Backend` powers the intelligent quiz generation, user management, real-time leaderboards, and analytics for the Quizzor platform.  
Built with **Node.js**, **Express**, **MongoDB**, **Redis**, and **Google Gemini AI**, it provides a scalable, high-performance API for quiz operations.

---

## ✨ Key Features

### 🤖 AI Quiz Generation Engine
- **Three Generation Modes**:
  - **Turbo Mode** – Fast text extraction from PDF/PPTX/DOCX/XLSX → AI generation (3-5x faster)
  - **Slow Mode** – Direct file upload with image support for multimodal questions
  - **No-File Mode** – Topic-based instant quiz generation
- **Gemini 2.0 Flash Integration** via `@google/generative-ai`
- **File Processing**: PDF, PPTX, DOCX, XLSX parsing with `pdf-parse`, `mammoth`, `xlsx`, `officeparser`
- **Difficulty-based generation** (Easy/Medium/Hard)
- **API Key Rotation** – Load balancing across multiple Gemini free-tier keys

### 🔐 Authentication & Security
- **JWT-based authentication** with `bcrypt` password hashing
- **Redis token blocklisting** for secure logout
- **Cookie-based session management**
- **Input validation** with `validator` library
- **CORS protection** configured for frontend origin

### 🏆 Leaderboard & Analytics
- **Redis Sorted Sets** for O(log N) leaderboard operations
- **Real-time ranking updates** (<10ms access time)
- **Quiz-specific & global leaderboards**
- **User performance tracking** (accuracy, scores, history)
- **MongoDB aggregation pipelines** for advanced analytics

### 📊 Database Architecture
**MongoDB Collections**:
- `users` – Authentication, profiles, quiz history
- `quizzes` – Generated quiz metadata, questions, answers
- `submissions` – User responses, scores, timestamps

**Redis Data Stores**:
- `leaderboard` – Sorted sets for rankings
- `logout` – Token blocklist for invalidated JWTs

---

## 🏛 Folder Structure
```
src/backend/src
│── controllers/     # Business logic (auth, quiz, leaderboard)
│── models/          # MongoDB schemas (User, Quiz, Submission)
│── routes/          # API endpoints
│── middleware/      # Auth, validation, error handling
│── utils/           # File parsers, AI helpers
│── config/          # Database, Redis, Gemini setup
│── server.js        # Entry point
```

---

## 🧰 Tech Stack

- **Node.js** – Runtime
- **Express.js** – Web framework
- **MongoDB** – Primary database
- **Redis** – In-memory cache for leaderboards & sessions
- **Google Gemini AI** – Quiz generation
- **JWT** – Authentication tokens
- **Multer** – File upload handling
- **Bcrypt** – Password hashing

---

## ⚙️ Installation & Setup

Clone the project:
```bash
git clone https://github.com/Dhritish-Mukherjee/Quizzor.git
cd src/backend/src
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

---


## 📡 API Endpoints Overview

### Authentication
- `POST /api/auth/register` – User signup
- `POST /api/auth/login` – User login
- `POST /api/auth/logout` – Logout (Redis blocklist)
- `GET /api/auth/me` – Get current user

### Quiz Generation
- `POST /api/quiz/generate/turbo` – Fast text-based generation
- `POST /api/quiz/generate/slow` – File upload with images
- `POST /api/quiz/generate/nofile` – Topic-based generation
- `GET /api/quiz/:id` – Get quiz details

### Quiz Submission
- `POST /api/quiz/:id/submit` – Submit answers & calculate score
- `GET /api/quiz/:id/results` – Get submission results

### Leaderboard
- `GET /api/leaderboard/global` – Global rankings (Redis)
- `GET /api/leaderboard/quiz/:id` – Quiz-specific rankings
- `GET /api/leaderboard/user/:id` – User rank & stats

### Analytics
- `GET /api/user/dashboard` – User stats & history
- `GET /api/user/submissions` – All user submissions
- `GET /api/analytics/insights` – Performance analytics

---

## 🤖 AI Generation Flow

**Turbo Mode Process**:
```
File Upload → Multer → Format Detection → Text Extraction
    → (pdf-parse/mammoth/xlsx/officeparser)
    → Gemini API (text-only prompt)
    → Quiz JSON Response → MongoDB Storage
```

**Slow Mode Process**:
```
File Upload → GoogleAIFileManager → Gemini Multimodal
    → Quiz with Image-Based Questions
    → MongoDB Storage
```

**Key Rotation Logic**:
```javascript
const apiKeys = [KEY_1, KEY_2, KEY_3];
let currentIndex = 0;

function getNextKey() {
  const key = apiKeys[currentIndex];
  currentIndex = (currentIndex + 1) % apiKeys.length;
  return key;
}
```

---

## 🛡️ Security Measures

- **Password hashing** with bcrypt (10 salt rounds)
- **JWT expiration** (7 days default)
- **Redis token invalidation** on logout
- **CORS whitelist** for allowed origins
- **Input sanitization** with validator
- **Rate limiting** (planned: express-rate-limit)
- **File size limits** on uploads (10MB max)

---

## 🧩 Key Challenges Solved

✅ **AI Latency** – Turbo mode with local extraction (3-5x faster)  
✅ **Leaderboard Performance** – Redis O(log N) operations  
✅ **Rate Limits** – API key rotation for free-tier scaling  
✅ **Multi-Format Parsing** – Unified extraction pipeline  
✅ **Real-Time Sync** – Redis + MongoDB hybrid architecture  

---

## 🔮 Future Improvements

- **Socket.io** integration for live multiplayer quizzes
- **Server-Sent Events (SSE)** for progressive quiz streaming
- **Pinecone + LangChain** for personalized recommendations
- **Kubernetes** deployment with auto-scaling
- **Prometheus + Grafana** monitoring
- **Blockchain certificates** via Web3.js

---

## 📦 Dependencies

```json
{
  "@google/genai": "^1.30.0",
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

---

## 🏆 Team Members

- **Backend, Blockchain, AI** – Dhritish Mukherjee  
- **Frontend, Design, AI** – Pabitra Maity  
- **Design & Testing** – Rupam Saha  

---

## 📄 License

MIT License © 2025 – Quizzor.ai

---

## ⭐ Support the Project

If you like Quizzor.ai, please consider giving it a ⭐ on GitHub!

**Live Demo**: [\[Render Deployment\]  ](https://quizzor.onrender.com/)
**Frontend Repo**: [\[GitHub Link\]](https://quizzor.onrender.com/)