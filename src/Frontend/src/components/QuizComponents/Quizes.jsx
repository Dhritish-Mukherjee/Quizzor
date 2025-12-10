import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard.jsx";
import { FaSearch } from "react-icons/fa";

const Quizes = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [allQuizes, setAllQuizes] = useState([]);

  const [quizes, setQuizes] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllQuizes = async () => {
        setLoading(true);
      try {
        const res = await api.get("/quiz");

        console.log(res.data);
        const arrayData = res.data ?.data || [];

        setAllQuizes(arrayData);
        setQuizes(arrayData);
        setLoading(false);
        toast.success("Quizes loaded successfully", {
          position: "top-right",
        });

      } catch (error) {

        toast.error(error.message , {
          position: "top-right",
        });
      }finally {
         setLoading(false);
      }
    };

    fetchAllQuizes();
  }, []);


  const handleDifficulty = (value) => {
    setSelectedDifficulty(value);
    let filtered = [...allQuizes];

    if(value) {
     filtered = filtered.filter(q => q.difficulty === value);
    }

    // if category is also selected 
    if(selectedCategory) {
      filtered = filtered.filter(q => q.category === selectedCategory)
    }

    // if search is also applied 
    if(search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(q => (q.title || '').toLowerCase().includes(term));
    }

    // if sorting is also selected 
    if(selectedSort) {
       filtered = filtered.sort((a,b) => selectedSort === 'ascending' ? a.attemptCount - b.attemptCount : b.attemptCount - a.attemptCount);
    }

    setQuizes(filtered);

  }



  const handleCategory = (value) => {
    setSelectedCategory(value);

    let filtered = [...allQuizes];

    if(value) {
      filtered = filtered.filter(q => q.category === value);
    }

    // if difficulty is also selected 
    if(selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // if search is also applied 
    if(search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(q => (q.title || '').toLowerCase().includes(term));
    }

    // if sorting is also selected 
    if(selectedSort) {
      filtered = filtered.sort((a,b) => selectedSort === 'ascending' ? a.attemptCount - b.attemptCount : b.attemptCount - a.attemptCount );
    }

    setQuizes(filtered);
  }


  const handleSort = (value) => {
    setSelectedSort(value);

    let filtered = [...allQuizes];

    // if difficulty is selected 
    if(selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // if category is also selected 
    if(selectedCategory) {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // if search is also applied 
    if(search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(q => (q.title || '').toLowerCase().includes(term));
    }

    // sorting logic 
    if(value) {
      filtered = filtered.sort((a,b) => value === 'ascending' ? a.attemptCount - b.attemptCount : b.attemptCount - a.attemptCount)
    }

    setQuizes(filtered);
  }

  return (
    <div className="p-0 flex flex-col gap-3 ">

      <p className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full " onClick={() => navigate('/dashboard/quiz')}><FaArrowLeft size={10} /> Back</p>
      

      {/* Filter section  */}
      <div className="filter-section flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between items-center w-full">
        <div className="input px-3 py-1 w-[300px] flex justify-center items-center gap-1 bg-zinc-800 rounded-full  ">
            <FaSearch  size={20}/>

            <input onChange={(e) => { 
              setSearch(e.target.value); 
              handleDifficulty(selectedDifficulty);
              }}
              value={search} className="px-3 py-1 outline-0  rounded-full w-full text-sm   placeholder:text-sm " type="text" placeholder="Search on the topic you want . . . " />

        </div>

        <div className="filterBtns flex flex-col  sm:flex sm:flex-row sm:justify-end gap-2  w-full ">

          <select  onChange={(e) => handleDifficulty(e.target.value)} className="bg-zinc-800 p-2 rounded-lg text-sm " name="difficulty" id="" required>
            <option   value="">difficulty</option>
            <option  value="easy" className="text-green-500">easy</option>
            <option value="medium" className="text-yellow-500">medium</option>
            <option value="hard" className="text-red-500">hard</option>
          </select>


          <select onChange={(e) => handleCategory(e.target.value)} className="bg-zinc-800 p-2 rounded-lg text-sm " name="category" id="">
            <option value="">category</option>
            <option value="General Knowledge">General Knowledge</option>
            <option value="CSE Essentials">CSE Essentials</option>
            <option value="ECE Essentials">ECE Essentials</option>
            <option value="Development Hustles">Development Hustles</option>
            <option value="Arts and design">Arts and design</option>
            <option value="Medical">Medical</option>
            <option value="Miscllaneous">Miscllaneous</option>
          </select>


          <select onChange={(e) => handleSort(e.target.value)} className="bg-zinc-800 p-2 rounded-lg text-sm " name="sort" id="">
            <option value="">sort on how many people attempted</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </select>
        </div>
      </div>


      {loading ? <div>Loading...</div> : 
      <div className="quizes-display flex flex-col items-center sm:flex sm:flex-row sm:items-start sm:flex-wrap gap-3 py-5 ">
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
