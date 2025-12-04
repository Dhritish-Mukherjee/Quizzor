import React, { useState } from "react";
import { FaArrowLeft, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiPaperclip } from "react-icons/fi";

const AiQuiz = () => {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiQuizData, setAiQuizData] = useState(null);

  const submitHandler = async (e) => {
      e.preventDefault();
      
      
  }


  return (
    <div className="p-5 flex flex-col gap-5">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/quiz")}
      >
        <FaArrowLeft size={10} /> Back
      </p>
      <h3 className="flex items-center gap-2 text-zinc-400 ">
        Generate Quizes With AI <FaArrowRightLong />
      </h3>


      <div className="flex justify-center items-center ">
        <div className="quiz-form p-5 bg-zinc-800 rounded-lg flex flex-col gap-2">
        <h3 className="text-2xl text-center">Generate Quiz </h3>
        <hr className="text-zinc-500"/>

        <form 
        onClick={submitHandler}
        className="py-3 flex flex-col gap-2">
          <div className="input  flex flex-col gap-1">
            <label htmlFor="topic" className="text-xl">Give a title</label>
            <input className="px-5 py-2 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500" name="topic" type="text" placeholder=" e.g. , Programming quiz " required />
          </div>

          <div className="input  flex flex-col gap-1">
            <label htmlFor="topic" className="text-xl">Enter a topic</label>
            <input className="px-5 py-2 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500" name="topic" type="text" placeholder=" e.g. , linear algebra, programming " required />
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="topic" className="text-xl">Enter no of questions</label>
            <input className="px-5 py-2 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500" name="noOfQuestions" type="number" placeholder=" e.g. , 5 or 10.. " required />
          </div>
          <div className="input flex flex-col gap-1 ">
            <label htmlFor="difficulty" className="text-xl">Choose difficulty</label>
            <select name="difficulty" id="difficulty" className="border-none focus:border focus:border-blue-500 bg-zinc-700 rounded-lg px-5 py-2 text-zinc-300 cursor-pointer" required>
              <option value="" className="cursor-pointer">select difficulty</option>
              <option value="easy" className="cursor-pointer">easy</option>
              <option value="medium" className="cursor-pointer">medium</option>
              <option value="hard" className="cursor-pointer">hard</option>
            </select>
            
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="file" className="text-xl flex items-center  gap-2">Upload file (optional)<FiPaperclip size={20}/></label>
            <input type="file" className="text-zinc-300 bg-zinc-700 w-fit rounded-lg px-5 py-2 flex gap-5 cursor-pointer" />
          </div>

          <button className="px-5 py-2 bg-blue-500 text-lg rounded-lg cursor-pointer hover:scale-102 transition-all duration-300 hover:bg-blue-400 font-semibold">Generate ✨</button>

        </form>
      </div>
      </div>
    </div>
  );
};

export default AiQuiz;
