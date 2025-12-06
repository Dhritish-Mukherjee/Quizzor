import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quiz/Quiz.jsx";
import { FaArrowLeft, FaS } from "react-icons/fa6";
import { toast } from "react-toastify";

const SingleQuiz = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [singleQuiz, setSingleQuiz] = useState([]);

  const params = useParams();

  const getAnswerFromCorrectAnswer = (q) => {
    const correct = q.correctAnswer;
    if (typeof correct === "number" && correct >= 0 && correct <= 3) {
      return correct + 1;
    }

    // if not present correct ans
    return 1;
  };



  const transformBackendQuizData = (res) => {
    if (!res || !res.data || !res.data.data || !Array.isArray(res.data.data.questions)) return [];

    

    const arr = res.data.data.questions.map((q) => {
  const ans = getAnswerFromCorrectAnswer(q);

  return {
    question: q.questionText || q.question || "",
    option1: (q.options && q.options[0]) || "",
    option2: (q.options && q.options[1]) || "",
    option3: (q.options && q.options[2]) || "",
    option4: (q.options && q.options[3]) || "",
    ans: ans,
    _id: q._id || q.id || null,
  };
});

arr.title = res.data.data.title || "Untitled Quiz";


    return arr;
  };
  

  useEffect(() => {
    const getSingleQuiz = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/quiz/${params._id}`);

        console.log(res.data);
        
        const finalArrayData = transformBackendQuizData(res);
        // console.log(finalArrayData)

        setSingleQuiz(finalArrayData); // it is an array

        toast.success("Quize loaded successfully", {
          position: "top-right",
        });
      } catch (error) {
        // console.log(error);

        toast.error(error.message || "Failed to load quizes", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    getSingleQuiz();
  }, []);



  return (
    <div className=" flex flex-col gap-5 ">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/quiz/quizes")}
      >
        <FaArrowLeft size={10} />
        Back
      </p>

      <div className="flex flex-col gap-5 justify-center items-center">
        <h3 className="text-xl text-center bg-blue-500/30 border border-blue-500  w-fit px-5 py-1 rounded-full ">
          Your Quiz🥳
        </h3>
        {loading ? <div>Quiz loading...</div> : <Quiz quiz_id={params._id} data={singleQuiz} />}
      </div>
    </div>
  );
};

export default SingleQuiz;
