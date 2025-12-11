# 🚀 Quizzor.ai – Smart AI Quiz & Learning Platform (Frontend)

`Quizzor.ai` is a smart quiz-learning platform where users can take **built-in quizzes** or **generate quizzes using AI**.  
The platform supports **multiple difficulty levels**, **global leaderboards**, **quiz-specific leaderboards and ranks**, **PDF/Image-based quiz creation**, and a modern, intuitive UI for fast learning.

This frontend is built using **React**, **TailwindCSS**, **Framer Motion**, and **React Router**, ensuring an interactive and responsive experience across all devices.

---

## ✨ Key Features

### 🤖 AI & Generation Features
- **AI Quiz Generation** based on text input/topic  
- **PDF Upload → Text Extraction to AI Quiz Conversion**  
- **Image Upload → AI Question Extraction**  
- **Difficulty-based quiz creation (Easy/Medium/Hard/God Level Hard)**  
- **Multiple Quiz Modes** (MCQs, Custom quizzes, etc.)  

### 📚 Built-In Quiz System
- Pre-loaded quizzes across different categories  
- MCQ solving interface with instant feedback  
- Difficulty based quizes  
- Detailed scoring and performance summary  

### 🏆 Leaderboards & Rankings
- **Global leaderboard**  
- **Quiz-specific Ranks & leaderboard**  
- Real-time ranking updates  
- Stores accuracy, score,difficulty, etc.

### 🧍 User & Dashboard Features
- User profile with stats (accuracy, attempts, total score, Ranks etc.)  
- Dashboard with clean card-based UI  
- Analytics page with all previous insights (scores & history)  
- Progress tracking  

### 🖥 UI/UX & Overall Features
- Fully **responsive UI** (mobile First) 
- Framer Motion-based **smooth animations**  
- Reusable, scalable UI components  
- Toast notifications for actions  
- Clean, modern theme with Tailwind utility classes  

---

## 🏛 Folder Structure 
src/
│── api/ # Axios API functions
│── assets/ # Icons, images, branding
│── components/ # Reusable components (Login, Navbar, Cards)
│── pages/ # Page-level screens (Dashboard, Quiz, Profile etc.)
│── context/ # Global Context API
│── App.jsx
│── main.jsx



---

## 🧰 Tech Stack

- **React.js** – Core Frontend Library   
- **TailwindCSS** – Styling  
- **Framer Motion** – Animations & transitions  
- **React Router DOM** – Routing  
- **Axios** – API communication  
- **React Icons / Custom Icons / emojis** – UI elements  

---

## ⚙️ Installation & Setup

Clone the project:

```bash
git clone https://github.com/Dhritish-Mukherjee/Quizzor.git

cd .\src\frontend 
```
## Install dependencies:
```bash
npm install 
```
## Start local development:
```bash
npm run dev
```
## 🔧 Environment Variables

Create a .env file:
```env 
VITE_API_URL="your-backend-url"
```

## 🌐 API Integration Pattern:
`src/api/axios.js`
```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
```

## Usage Example:
```js 
export const getUserProfile = () =>
  api.get("/user/profile");

export const generateAIQuiz = (payload) =>
  api.post("/quiz/ai-generate", payload);
```

## 🎨 UI/UX Principles Followed

- Mobile-first design

- Consistent spacing

- Smooth UI transitions

- Clear visual hierarchy

- Clean dashboard layouts & info cards

- Animation consistency using Framer Motion

### 🛡️ Frontend Security Measures
--- 

- Protected routes (Auth-based)

- Token handling (httpOnly/localStorage depending on backend)

- Form validation

- Sanitized user input

## 🧩 Challenges Solved

- Handling multiple quiz modes with dynamic UI

- AI-based quiz generation workflow

- File → text extraction → quiz generation

- Managing quiz state and scoring

- Real-time ranking updates

- Smooth page transitions with animations

## 🔮 Future Improvements

- Voice-based quiz generation

- Certificates via blockchain

- Live Quizes via Sockets 

- Gamification badges & XP points

- Bookmark questions & revision mode

- Mobile app (React Native)

## 🤝 Contribution Guidelines

- Fork the repository

- Create a feature branch

- Commit changes with clear messages

- Submit a pull request

## 🏆 Team Members
- `Backend,Blockchain,AI` - Dhritish Mukherjee 

- `Frontend,Design,AI` - Pabitra Maity 

- `Design and Testing` - Rupam Saha 

## 📄 License

MIT License © 2025 – Quizzor.ai

## ⭐ Support the Project

If you like Quizzor.ai, please consider giving it a ⭐ on GitHub!

---
