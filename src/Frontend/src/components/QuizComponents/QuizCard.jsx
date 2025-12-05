import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({item}) => {

  return (
      <Link to={`/dashboard/quiz/quizes/${item._id}`}><div className="quiz-item sm:w-[250px] px-5 py-3 flex flex-col gap-0.5  bg-zinc-800 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 relative">
        <img src={item.imgLink} className="w-full" alt="quiz_image" />
        <h3 className="text-lg text-blue-500">Topic : {item.title}</h3>
        <p className="text-sm">{item.description}</p>
        <p className=" text-sm px-3 py-1 rounded-full bg-zinc-700 w-fit">{item.category}</p>
        <p className="text-zinc-500">No of questions : {item.questions.length}</p>
        <p className="text-zinc-500">{item.attemptCount} people attempted</p>
        <p className="text-zinc-500">average score : {item.averageScore} </p>
        <p className={`${item.isActive ? 'text-green-500' : "textred delay-500"}`}>{item.isActive ? "active" : "Not active"}</p>
        <p
          className={`px-3 ${
            item.difficulty === "easy" ? "bg-zinc-700 text-green-500" : ""
          } ${
            item.difficulty === "medium" ? "bg-zinc-700 text-yellow-500" : ""
          } ${
            item.difficulty === "hard" ? "bg-zinc-700 text-red-500" : ""
          } rounded-full w-fit `}
        >
          {item.difficulty}
        </p>
      </div>
      </Link>
  );
};

export default QuizCard;
