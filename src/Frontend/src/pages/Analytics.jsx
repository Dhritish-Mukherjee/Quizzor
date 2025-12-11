import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const Analytics = () => {
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true);
      try {
        const res = await api.get("/quiz/history");
        // console.log(res);

        if (res) {
          // console.log(res.data.data)
          setUserAnalytics(res.data.data);
          console.log(res.data.data);

          toast.info("Your analytics loaded sucessfully🎉");
        } else {
          console.log("errror ->", error.message);
          toast.error("Something went wrong, try later!");
        }
      } catch (error) {
        console.log("api erro -> ", error.message);
        toast.error("Something went wrong, try later!");
      }finally{
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h2 className="text-2xl font-mono text-blue-500 bg-blue-500/10 px-5 py-2 rounded-full border border-blue-500  ">
        {" "}
        Your Analytics🧩{" "}
      </h2>

      {loading ? <p>Loading...</p> : (
        <div className="details flex flex-col justify-center items-center  gap-5 py-5  ">
        {userAnalytics.map((item, index) => (
          
          <div key={index} className="quizHistoryCard  border border-zinc-700 w-full sm:w-[1000px] p-5 flex flex-col gap-3 rounded-lg ">
            <p className=" text-xl text-blue-500 font-bold bg-blue-500/10 p-3 border border-e-blue-500 w-10 h-10 flex justify-center items-center rounded-full">{index + 1}</p>
            <div className="quizDetails border p-3 bg-blue-500/10 border-blue-500 rounded-lg flex flex-col gap-2 ">
              <p className="text-center text-blue-500 text-lg px-3 py-1 bg-black/50 w-fit rounded-lg  ">Quiz Details</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Title - {item.quiz.title}</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Category - {item.quiz.category}</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Difficulty - <span className={`px-3.5 py-0.5  border ${item.quiz.difficulty === 'easy' ? 'bg-green-500/10  border-green-500 text-green-500 ' : ''} ${item.quiz.difficulty === 'medium' ? 'bg-yellow-500/10  border-yellow-500 text-yellow-500' : ''} ${item.quiz.difficulty === 'hard' ? 'bg-red-500/10  border-red-500 text-red-500 ' : ''} rounded-lg `}>{item.quiz.difficulty}</span></p>
            </div>

            <div className="submissionDetails border p-3 bg-blue-500/10 border-blue-500 rounded-lg flex flex-col gap-2 ">
              <p className="text-center text-blue-500 text-lg px-3 py-1 bg-black/50 w-fit rounded-lg  ">Submission Details</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Total Questions - {item.totalQuestions}</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">You corrcted - {item.correctAnswers}</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Your Score - {item.score}</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">Accuracy- {item.accuracy}%</p>
              <p className="px-3 py-1 border border-blue-500 w-fit rounded-lg">
                Completed at - {new Date(item.completedAt).toLocaleString()}
              </p>
            </div>

            <div className="answerDetails border p-3 bg-yellow-500/10 border-yellow-500 rounded-lg flex flex-col gap-3 ">
              <p className="text-lg font-semibold text-center  ">✨See Your Questionwise Analysis✨</p>
              {item.answers.map((question, index) => (
                <div key={index} className="questionCard border p-3 sm:flex sm:justify-between rounded-lg  ">
                  <p>Question No - {index + 1}</p>
                  <p>you selected option - {question.selectedAnswer + 1}</p>
                  <p>
                    Your choice - {question.isCorrect === true ? "✅" : "❌"}
                  </p>
                  <p>Collected points - {question.points}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Analytics;
