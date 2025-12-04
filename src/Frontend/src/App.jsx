import React, { useContext } from "react";
import Quizzor_logo from "./assets/Quizzor_logo.png";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GradientButton from "./components/Button/GradientButton";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import LeaderBoard from "./pages/LeaderBoard";
import Analytics from "./pages/Analytics";
import Quiz from "./pages/Quiz";
import Quizes from "./components/QuizComponents/Quizes";
import LiveQuizes from "./components/QuizComponents/LiveQuizes";
import AiQuiz from "./components/QuizComponents/AiQuiz";
import SingleQuiz from "./components/QuizComponents/SingleQuiz";
import { ToastContainer } from 'react-toastify';
import Login from "./components/Login";
import { AppConetxt } from "./context/AppContext";


const App = () => {

  const { showLogin } = useContext(AppConetxt);
  return (
    <div className="w-full min-h-screen  bg-zinc-900 text-white  ">
     
      {showLogin && <Login /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/admin" element={<AdminProfile />} />
            <Route path="/dashboard/quiz" element={<Quiz />}/>
                  
            <Route path="/dashboard/quiz/quizes" element={<Quizes />} />
            <Route path="/dashboard/quiz/live" element={<LiveQuizes />} />
            <Route path="/dashboard/quiz/ai" element={<AiQuiz />} />
            <Route path="/dashboard/quiz/quizes/:_id" element={<SingleQuiz />} />
            <Route path="/dashboard/analytics" element={<Analytics/>} />
            <Route path="/dashboard/leaderboard" element={<LeaderBoard />} />
        </Route>
       
      </Routes>

      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      />
      
    </div>
  );
};

export default App;
