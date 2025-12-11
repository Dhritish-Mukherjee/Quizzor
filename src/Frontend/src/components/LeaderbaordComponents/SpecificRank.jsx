import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const SpecificRank = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userRank, setUserRank] = useState(null);

  const showGlobalRank = async () => {
    setLoading(true);
    try {
      const res = await api.get("/leaderboard/myrank/global");
      // console.log(res);

      if (res) {
        setUserRank(res.data.data);
        // console.log(res.data.data);

        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 },
        });

      } else {
        // console.log("error -> ", error.message);
        toast.error("Something went wrong, try later!");
      }
    } catch (error) {
      // console.log("api error -> ", error.message);
      toast.error("Something went wrong, try later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-0 flex flex-col gap-3">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/leaderboard")}
      >
        <FaArrowLeft size={10} /> Back
      </p>

      <div className="flex justify-center items-center h-auto min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : !userRank ? (
          <button
            onClick={showGlobalRank}
            className="px-5 py-2 bg-blue-500 rounded-full border-2 border-white font-semibold cursor-pointer hover:scale-105 hover:bg-blue-600 transition-all duration-300 "
          >
            Your global rank🎉
          </button>
        ) : (
          <div className="rankCard p-5 bg-blue-500 border-2 border-white hover:scale-103 hover:bg-blue-600 transition-all duration-300 w-fit rounded-xl cursor-pointer ">
            <p>
              Rank : {userRank.rank}
              {userRank.rank === 1 ? "🥇" : ""}
              {userRank.rank === 2 ? "🥈" : ""}
              {userRank.rank === 3 ? "🥉" : ""}
            </p>
            <p>User name : {userRank.username}</p>
            <p>Total Quizes : {userRank.totalQuizzes}</p>
            <p>Total Score : {userRank.totalScore}</p>
            <p>Avg. Accuracy : {userRank.averageAccuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificRank;
