import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quiz/Quiz.jsx";
import { FaArrowLeft } from "react-icons/fa6";

const SingleQuiz = () => {

    const navigate = useNavigate();

  const [singleQuiz, setSingleQuiz] = useState({
    title: "Sample Single Quiz",
    difficulty: "easy",
    no_of_questions: 10,
    _id: 3,
  });

  const params = useParams();

  useEffect(() => {
    const getSingleQuiz = async () => {
      try {
        const res = await api.get(`/dashboard/quizes/quiz/${params._id}`);

        console.log(res.data);
        setSingleQuiz(res.data);
        toast.success("Quize loaded successfully", {
          position: "top-right",
        });
      } catch (error) {
        console.log(error);

        toast.error(error?.response?.data?.message || "Failed to load quizes", {
          position: "top-right",
        });
      }
    };
  }, []);

  return <div className=" flex flex-col gap-5 ">
    <p className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full " onClick={() => navigate('/dashboard/quiz/quizes')}><FaArrowLeft size={10} />Back</p>
    
    <div className="flex flex-col gap-5 justify-center items-center">
        <h3 className="text-3xl text-center bg-blue-500/30 border border-blue-500  w-fit px-5 py-1 rounded-full ">Your Quiz🥳</h3>
        <Quiz />
    </div>
  </div>;
};

export default SingleQuiz;
