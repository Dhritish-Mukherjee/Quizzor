import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../../assets/data.js";


const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[0]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1,option2,option3,option4]

  const checkAns = (e, ans) => {
    if (lock == false) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans-1].current.classList.add("correct")
      }
    }
  };

  const next = () => {
    if(lock == true) {

      if(index == data.length -1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index])
      setLock(false);
      option_array.map((option,index) => {
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null;
      })
    }
  }
  

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }


  return (
    <div className="container w-[400px]  p-5 bg-zinc-800 flex flex-col gap-3 rounded-lg ">
      <h1 className="text-2xl">Quiz Title</h1>
      <hr  className="border-none h-[0.5px] bg-[#707070]"/>
      {result ? <></> : <>
      <h2 className="text-xl">
        {index + 1}. {question.question}
      </h2>
      <ul className="flex flex-col gap-2">
        <li className="text-zinc-600 text-lg flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer" ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
        <li className="text-zinc-600 text-lg flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer" ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
        <li className="text-zinc-600 text-lg flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer" ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
        <li className="text-zinc-600 text-lg flex items-center pl-3 py-2 border border-zinc-500 rounded-lg cursor-pointer" ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
      </ul>

      <button onClick={next} className="px-8 py-2 bg-blue-500 rounded-lg cursor-pointer font-semibold text-lg hover:scale-102 transition-all duration-300 hover:bg-blue-400">Next</button>

      <div className="index text-md text-white text-center">{index + 1} of {data.length} Questions</div></>}

        {result ? <><h2>You Scored : {score} of {data.length}</h2>
      <button onClick={reset} className="px-8 py-2 bg-blue-500 rounded-lg cursor-pointer font-semibold text-lg hover:scale-102 transition-all duration-300 hover:bg-blue-400 ">Reset</button></> : <></>}
      
      
    </div>
  );
};

export default Quiz;
