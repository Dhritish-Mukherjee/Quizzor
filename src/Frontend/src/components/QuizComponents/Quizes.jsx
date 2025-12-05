import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard.jsx";

const Quizes = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [quizes, setQuizes] = useState([
    {
      _id : "692ff38de7fe31e72040c4ae",
      title:"Indian Polity",
      description:"A comprehensive quiz covering fundamental concepts of Indian Constitut…",
      category:"General Knowledge",
      difficulty:"medium",
      duration:20,

      questions:Array (30),
      totalPoints:60,
      createdBy:"692ff273a9249d52134a73a0",
      isActive:true,
      attemptCount:0,
      averageScore:0,
      createdAt:"2025-12-03T08:23:41.488+00:00",
      updatedAt:"2025-12-03T08:23:41.488+00:00",
      __v:0,
      imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RGI6CPwUvuOhpuNCKhyZtYliR7CqZhr2dw&s"
    },
    {
      _id : "692ff38de7fe31e72040c4ae",
      title:"Indian Polity",
      description:"A comprehensive quiz covering fundamental concepts of Indian Constitut…",
      category:"General Knowledge",
      difficulty:"easy",
      duration:20,

      questions:Array (30),
      totalPoints:60,
      createdBy:"692ff273a9249d52134a73a0",
      isActive:true,
      attemptCount:0,
      averageScore:0,
      createdAt:"2025-12-03T08:23:41.488+00:00",
      updatedAt:"2025-12-03T08:23:41.488+00:00",
      __v:0,
      imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RGI6CPwUvuOhpuNCKhyZtYliR7CqZhr2dw&s"
    },
    
  ]);

  // useEffect(() => {
  //   const fetchAllQuizes = async () => {
  //       setLoading(true);
  //     try {
  //       const res = await api.get("/quiz");

  //       setQuizes(res.data); // res.data is an array 
  //       setLoading(false);
  //       toast.success("Quizes loaded successfully", {
  //         position: "top-right",
  //       });

  //     } catch (error) {

  //       toast.error(error.message , {
  //         position: "top-right",
  //       });
  //     }finally {
  //        setLoading(false);
  //     }
  //   };

  //   fetchAllQuizes();
  // }, []);

  return (
    <div className="p-0 flex flex-col gap-3 ">

      <p className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full " onClick={() => navigate('/dashboard/quiz')}><FaArrowLeft size={10} /> Back</p>
      

      {/* Filter section  */}
      <div className="filter-section ">
        <div className="input">
            <input type="text" placeholder="Search on the topic you want " />
        </div>

        <div className="filterBtns">

        </div>
      </div>


      {loading ? <div>Loading...</div> : 
      <div className="quizes-display flex flex-col items-center sm:flex sm:flex-row sm:flex-wrap gap-3 py-3 ">
        {quizes.length === 0 ? <p className="text-zinc-500">No quiz found!</p> : (
          quizes.map((item, index) => (
            <QuizCard  key={item._id  || item._quizid || index} item={item}  />

          ) )
        )}
      </div>
      }

    </div>
  );
};

export default Quizes;
