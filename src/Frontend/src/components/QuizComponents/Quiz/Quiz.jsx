import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";
import api from "../../../api/axios.js";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const Quiz = ({ quiz_id, data }) => {
  // console.log(data);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(null);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [submitQuizTracker, setSubmitQuizTracker] = useState(false);
  const [showResult, setShowResult] = useState({});
  const [yourRank, setYourRank] = useState({});
  const [showRank, setShowRank] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const safeIndex = Math.min(Math.max(0, index), data.length - 1);
      setQuestion(data[safeIndex]);
    } else {
      setQuestion(null);
    }

    option_array.forEach((opt) => {
      if (opt && opt.current) {
        opt.current.classList.remove("wrong");
        opt.current.classList.remove("correct");
      }
    });
  }, [data, index]);

  const checkAns = (e, ans) => {
    if (!question || lock) return;

    if (question.ans == ans) {
      e.target.classList.add("correct");
      setLock(true);
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      setLock(true);
      if (
        option_array[question.ans - 1] &&
        option_array[question.ans - 1].current
      ) {
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }

    const selected0Based = ans - 1;
    const qId =
      question && (question._id || question.id || question.questionId);

    if (qId) {
      setAnswers((prev) => {
        const filtered = prev.filter((item) => item.questionId !== qId);
        return [
          ...filtered,
          { questionId: qId, selectedAnswer: selected0Based },
        ];
      });
    } else {
      setAnswers((prev) => {
        const filtered = prev.filter((item) => item.questionIndex !== index);
        return [
          ...filtered,
          { questionIndex: index, selectedAnswer: selected0Based },
        ];
      });
    }
  };

  const next = () => {
    if (lock == true) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex((prev) => prev + 1);
      setLock(false);

      option_array.forEach((option) => {
        if (option && option.current) {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        }
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(Array.isArray(data) && data.length > 0 ? data[0] : null); // FIX 5
    setScore(0);
    setLock(false);
    setResult(false);
    setSubmitQuizTracker(false);
    // setShowResult()
    setShowRank(false);
  };

  const submitQuiz = async () => {
    const quizId = quiz_id || null;
    console.log(quizId);

    const payload = {
      _id: quizId,
      answers: answers,
      timeTaken: Math.floor(Math.random() * 5000),
    };

    try {
      console.log(payload);
      console.log("axios baseURL =", api?.defaults?.baseURL);

      const res = await api.post(`/quiz/${quizId}/submit`, payload);
      // console.log("res : ", res)
      // console.log("res data : ", res.data);
      setSubmitQuizTracker(true);

      if (res) {
        toast.success("Quiz submitted sucessfully");
        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 },
        });

        console.log("res data's data : ", res.data.data);
        setShowResult(res.data.data);
      } else {
        toast.error("Failed to submit quiz");
        console.log(res.error);
      }
    } catch (error) {
      console.log("Submission error : ", error);
      toast.error("Failed to submit quiz");
    }
  };
  

  const seeYourRankHandler = async () => {
    const quizId = quiz_id || null;

    try {
     const res = await api.get(`/leaderboard/myrank/quiz/${quizId}`)
    //  console.log("response : ", res);

     setYourRank(res.data.data)
     setShowRank(true);

     confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 },
        });

    } catch (error) {
      console.log("catch Error : ",error);
      toast.error("Can not get rank,try later!")
    }
  }

  return (
    <div className="container w-[300px] p-4 bg-zinc-800 flex flex-col gap-2 rounded-lg mx-auto ">
      <h1 className="text-xl">{data?.title || "Quiz"}</h1>

      <hr className="border-none h-[0.5px] bg-[#707070]" />

      {result ? (
        <></>
      ) : (
        <>
          <h2 className="text-lg">
            {index + 1}. {question ? question.question : ""}
          </h2>

          <ul className="flex flex-col gap-2">
            <li
              className="text-zinc-600 text-sm flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer"
              ref={option1}
              onClick={(e) => checkAns(e, 1)}
            >
              {question ? question.option1 : ""}
            </li>

            <li
              className="text-zinc-600 text-sm flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer"
              ref={option2}
              onClick={(e) => checkAns(e, 2)}
            >
              {question ? question.option2 : ""}
            </li>

            <li
              className="text-zinc-600 text-sm flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer"
              ref={option3}
              onClick={(e) => checkAns(e, 3)}
            >
              {question ? question.option3 : ""}
            </li>

            <li
              className="text-zinc-600 text-sm flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer"
              ref={option4}
              onClick={(e) => checkAns(e, 4)}
            >
              {question ? question.option4 : ""}
            </li>
          </ul>

          <button
            onClick={next}
            className="px-8 py-2 bg-blue-500 rounded-lg cursor-pointer font-semibold text-md hover:scale-102 transition-all duration-300 hover:bg-blue-400"
          >
            Next
          </button>

          <div className="index text-sm text-white text-center">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}

      {result ? (
        <>
          <h2>
            You corrected {score} of {data.length} questions
          </h2>
          <button
            onClick={reset}
            className="px-8 py-2 bg-blue-500 rounded-lg cursor-pointer font-semibold text-md hover:scale-102 transition-all duration-300 hover:bg-blue-400 "
          >
            Reset
          </button>

          {submitQuizTracker === false && (
            <button
              onClick={submitQuiz}
              className="px-8 py-2 bg-zinc-700 rounded-lg cursor-pointer font-semibold text-md hover:scale-102 transition-all duration-300 hover:bg-zinc-600"
            >
              Submit quiz
            </button>
          )}

          {submitQuizTracker && showResult &&  (
            <div className="flex flex-col gap-2 bg-blue-500/10 p-3 border border-blue-500 rounded-lg ">
              <p>
                Correct ansers : {showResult.correctAnswers}/
                {showResult.totalQuestions}
              </p>

              <p>Score : {showResult.score} </p>
              <p>Accuracy : {showResult.accuracy}%</p>
              {showRank === false && <button onClick={seeYourRankHandler} className="px-8 py-2 bg-yellow-600 rounded-lg cursor-pointer font-semibold text-md hover:scale-102 transition-all duration-300 hover:bg-yellow-500" >See rank in this Quiz</button> }

              {showRank &&
               <div className="flex flex-col gap-2 ">
                <p>
                  ✨Your rank : {yourRank.rank} ✨
              </p>
              <p className="text-yellow-500 ">Excellent try, next time more💪</p>
               </div>
               }
              
            </div>
            
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
