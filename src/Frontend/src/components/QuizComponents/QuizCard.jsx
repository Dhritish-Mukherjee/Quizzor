import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({item}) => {

  return (
      <Link to={`/dashboard/quiz/quizes/${item._id}`}><div className="quiz-item px-8 py-3 flex flex-col gap-2 bg-zinc-800 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300">
        <h3 className="text-xl text-blue-500">Topic : {item.title}</h3>
        <p className="text-zinc-500">No of questions : {item.NoOfQuestions}</p>
        <p
          className={`px-3 py-1 ${
            item.difficulty === "easy" ? "bg-zinc-700 text-green-500" : ""
          } ${
            item.difficulty === "medium" ? "bg-zinc-700 text-yellow-500" : ""
          } ${
            item.difficulty === "difficult" ? "bg-zinc-700 text-red-500" : ""
          } rounded-md`}
        >
          {item.difficulty}
        </p>
      </div>
      </Link>
  );
};

export default QuizCard;
