import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import QuizCard from "./QuizCard";

const LiveQuizes = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [liveQuizes, setLiveQuizes] = useState([
    {
      title : "Sample Quiz",
      difficulty : "easy",
      NoOfQuestions: 10,
      _id : 1
    },
    {
      title : "Sample Quiz",
      difficulty : "medium",
      NoOfQuestions: 10,
      _id : 2
    }
  ]);

  // useEffect(() => {
  //   const fetchLiveQuizes = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await api.get("/dashboard/quiz/live");
  //         setLiveQuizes(res.data);
  //         toast.success("Quizes loaded successfully", {
  //           position: 'top-right'
  //         });
  //       } catch (error) {
  //         toast.error(error.message, {
  //           position:"top-right"
  //         })
  //       }finally {
  //         setLoading(false);
  //       }

  //   }

  //   fetchLiveQuizes();

  // }, [])


  return (
    <div className="p-5 flex flex-col gap-5 ">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/quiz")}
      >
        <FaArrowLeft size={10} /> Back
      </p>
      <h3 className="flex items-center gap-2 text-zinc-400 ">
        All Live Quizes <FaArrowRightLong />
      </h3>

      {loading ? <div>Loading...</div> : 
      <div className="quizes-display flex gap-3 py-3 ">
        {liveQuizes.length === 0 ? <p className="text-zinc-500">No quizes found</p> : (
          liveQuizes.map((item, index) => (
            <QuizCard  key={item._id  || item._quizid || index} item={item}  />

          ))
        )}
      </div>
      }

    </div>
  );
};

export default LiveQuizes;
