import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({item}) => {

  return (
      <Link to={`/dashboard/quiz/quizes/${item._id}`}><div className={`quiz-item sm:w-[250px] px-5 py-3 flex flex-col gap-0.5 border border-zinc-800  ${item.difficulty === 'easy' ? "hover:bg-green-500/20  hover:border-green-500" : ""} ${item.difficulty === 'medium' ? "hover:bg-yellow-500/20 hover:border-yellow-500" : ""} ${item.difficulty === 'hard' ? "hover:bg-red-500/20 hover:border-red-500" : ""} rounded-lg cursor-pointer hover:scale-103 transition-all duration-300 relative`}>
        <img src={item.imgLink} className="w-full" alt="quiz_image" />
        <h3 className="text-lg text-blue-500">Topic : {item.title}</h3>
        <p className="text-sm">{item.description}</p>
        <p className=" text-sm px-3 py-1 rounded-full bg-zinc-700 w-fit">{item.category}</p>
        <p className="text-zinc-500">No of questions : {item.questions.length}</p>
        <p className="text-zinc-500">{item.attemptCount} people attempted</p>
        <p className="text-zinc-500">average score : {item.averageScore} </p>
        <div className="flex items-center gap-2 ">
          <p className={`${item.isActive ? 'text-green-500' : "text-red-500"} bg-zinc-700 px-3 rounded-full`}>{item.isActive ? "active" : "Not active"}</p>
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
      </div>
      </Link>
  );
};

export default QuizCard;
