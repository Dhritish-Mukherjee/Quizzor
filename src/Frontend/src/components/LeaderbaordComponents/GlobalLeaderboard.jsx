import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { toast } from "react-toastify";

const GlobalLeaderboard = () => {
  const navigate = useNavigate();

  const [leaderBoard, setLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGlobalLeaderBoard = async () => {

      setLoading(true);
      try {
        const res = await api.get("/leaderboard/global");
        console.log(res);

        if (res) {
          const leaderBoardArray = res.data.data
            ? res.data.data.leaderboard
            : [];


          const finalData = filterArray(leaderBoardArray);
          setLeaderBoard(finalData);

          toast.success("Leaderboard loaded sucessfully");

        } else {
          toast.error("Something went wrong, try later");
        }
      } catch (error) {
        console.log("leaderboard error : ", error.message);

        toast.error("Something went wrong, try later")

      }finally {
        setLoading(false);
      }
    };

    fetchGlobalLeaderBoard();

  }, []);

  const filterArray = (arr) => {
    return arr.sort((a,b) => a.rank - b.rank)
  }
  return (
    <div className=" outer-div flex flex-col gap-5 p-0">
      <Link to="/dashboard/leaderboard">
        <p className="flex justify-center items-center gap-2 w-fit px-3 py-1 bg-zinc-800 rounded-full cursor-pointer ">
          <FaArrowLeftLong /> back
        </p>
      </Link>
      <div className="flex flex-col gap-8 px-2 ">
        <h3 className=" text-lg sm:text-2xl  flex items-center justify-center gap-2 text-neutral-100 sm:px-5 py-2 rounded-full  bg-yellow-800 border-2 border-yellow-500 font-mono text-center">
          🏆Global Leaderboard🏆
        </h3>

        <div className="leaderboard  py-3 flex flex-col gap-3 ">
          {loading ? <p>Loading...</p> : (

            <div className="overflow-x-auto w-full">
              <table  className="w-full text-sm border border-yellow-500 rounded-lg overflow-hidden">
              <thead className="bg-zinc-800 text-yellow-400">
                <tr>
                  <th className="px-3 py-2 text-left">Username</th>
                  <th className="px-3 py-2 text-left">Rank</th>
                  <th className="px-3 py-2 text-left">Quizes</th>
                  <th className="px-3 py-2 text-left">Score</th>
                  <th className="px-3 py-2 text-left">Avg. Accuracy</th>
                </tr>

              </thead>

              <tbody>
                {leaderBoard.map((item, index) => (

                    <tr key={index}  className="bg-zinc-900 border-b border-zinc-700 hover:bg-zinc-800 transition">
                      <td className="px-3 py-2">{item.username}</td>
                      <td className="px-3 py-2">{item.rank === 1 || item.rank === 2 || item.rank === 3
                          ? item.rank + "👑"
                          : item.rank}</td>
                      <td className="px-3 py-2">{item.totalQuizzes}</td>    
                      <td className="px-3 py-2">{item.totalScore}</td>    
                      <td className="px-3 py-2">{item.averageAccuracy}%</td>    

                    </tr>
                ))}

              </tbody>
            </table>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
