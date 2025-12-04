import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard.jsx";

const Quizes = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [quizes, setQuizes] = useState([
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
  //   const fetchAllQuizes = async () => {
  //       setLoading(true);
  //     try {
  //       const res = await api.get("/dashboard/quiz/quizes");

  //       console.log(res.data)
  //       setQuizes(res.data.quizes);
  //           setLoading(false);
  //       toast.success("Quizes loaded successfully", {
  //         position: "top-right",
  //       });
  //     } catch (error) {
  //       console.log(error);

  //       toast.error(error.message , {
  //         position: "top-right",
  //       });
  //     }finally {
  //        setLoading(false);
  //     }
  //   };

  //   fetchAllQuizes();
  // }, []);

  return (
    <div className="p-5 flex flex-col gap-5 ">

      <p className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full " onClick={() => navigate('/dashboard/quiz')}><FaArrowLeft size={10} /> Back</p>
      <h3 className="flex items-center gap-2 text-zinc-400 ">
        All Previous Quizes <FaArrowRightLong />
      </h3>

      {loading ? <div>Loading...</div> : 
      <div className="quizes-display flex gap-3 py-3 ">
        {quizes.length === 0 ? <p className="text-zinc-500">No quizes found</p> : (
          quizes.map((item, index) => (
            <QuizCard  key={item._id  || item._quizid || index} item={item}  />

          ) )
        )}
      </div>
      }

    </div>
  );
};

export default Quizes;
