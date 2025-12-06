import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quiz/Quiz.jsx";
import { FaArrowLeft, FaS } from "react-icons/fa6";

const SingleQuiz = () => {

    const navigate = useNavigate();

    const [loading , setLoading] = useState(false);

  const [singleQuiz, setSingleQuiz] = useState([
     {
        "_id": "question_id",
        "question": "Question text?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "points": 10
      },
      {
        "_id": "question_id",
        "question": "Question text?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "points": 10
      },
  ]);

  const params = useParams();

  useEffect(() => {
    const getSingleQuiz = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/quiz/${params._id}`);

        console.log(res.data); // res.data is an object 

        setSingleQuiz(res.data.questions); // it is an array 

        toast.success("Quize loaded successfully", {
          position: "top-right",
        });

      } catch (error) {
        console.log(error);

        toast.error(error.message || "Failed to load quizes", {
          position: "top-right",
        });
      }finally {
        setLoading(false);
      }
    };

    getSingleQuiz();

  }, []);

  return <div className=" flex flex-col gap-5 ">
    <p className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full " onClick={() => navigate('/dashboard/quiz/quizes')}><FaArrowLeft size={10} />Back</p>
    
    <div className="flex flex-col gap-5 justify-center items-center">
        <h3 className="text-xl text-center bg-blue-500/30 border border-blue-500  w-fit px-5 py-1 rounded-full ">Your Quiz🥳</h3>
        {loading ? <div>Quiz loading...</div> : (
          <Quiz data={singleQuiz} />
        )}
    </div>
  </div>;
};

export default SingleQuiz;
