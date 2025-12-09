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
import MenuComponent from "./components/MenuComponent";
import GlobalLeaderboard from "./components/LeaderbaordComponents/GlobalLeaderboard";
import SpecificRank from "./components/LeaderbaordComponents/SpecificRank";
import SpecificLeaderboard from "./components/LeaderbaordComponents/SpecificLeaderboard";
import AiQuizLanding from "./components/QuizComponents/AiQuizLanding";
import SlowMode from "./components/QuizComponents/SlowMode";
import TurboMode from "./components/QuizComponents/TurboMode";
import NoFile from "./components/QuizComponents/NoFile";



const App = () => {

  const { showLogin, showMenu, setShowMenu } = useContext(AppConetxt);
  return (
    <div className="w-full min-h-screen  bg-zinc-900 text-white  ">
     <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      limit={5}
      />

      {showLogin && <Login /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/admin" element={<AdminProfile />} />
            <Route path="/dashboard/quiz" element={<Quiz />}/>
                  
            <Route path="/dashboard/quiz/quizes" element={<Quizes />} />
            <Route path="/dashboard/quiz/live" element={<LiveQuizes />} />
            <Route path="/dashboard/quiz/ai" element={<AiQuizLanding />} />
            <Route path="/dashboard/quiz/ai/slow" element={<SlowMode />} />
            <Route path="/dashboard/quiz/ai/turbo" element={<TurboMode />} />
            <Route path="/dashboard/quiz/ai/nofileUpload" element={<NoFile />} />

            <Route path="/dashboard/quiz/quizes/:_id" element={<SingleQuiz />} />
            
            <Route path="/dashboard/analytics" element={<Analytics/>} />

            <Route path="/dashboard/leaderboard" element={<LeaderBoard />} />
            <Route path="/dashboard/leaderboard/global" element={<GlobalLeaderboard />} />
            <Route path="/dashboard/leaderboard/specific-rank" element={<SpecificRank />} />
            <Route path="/dashboard/leaderboard/specific-leaderbaord" element={<SpecificLeaderboard />} />
        </Route>
       
      </Routes>

      {showMenu ? <MenuComponent /> : <></>}

      
      
    </div>
  );
};

export default App;
