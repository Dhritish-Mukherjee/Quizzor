import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SpecificLeaderboard = () => {

  const navigate = useNavigate();


  return (
    <div className="p-0 flex flex-col gap-3">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/leaderboard")}
      >
        <FaArrowLeft size={10} /> Back
      </p>

      <div className="liveLeaderboard">
        <p className="text-zinc-500 text-center ">No quiz is live now!</p>

      </div>
    </div>
  );
};

export default SpecificLeaderboard;
