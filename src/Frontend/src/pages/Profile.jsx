import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { RxDragHandleDots2 } from "react-icons/rx";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const ref = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get("/auth/me");
        // console.log("res --> " , res)

        if (res) {
          // console.log(res.data.data)
          setUserData(res.data.data);
          // console.log(res.data.data);
          toast.info("Your Details loaded sucessfully");
        } else {
          console.log("errror ->", error.message);
          toast.error("Something went wrong, try later.");
        }
      } catch (error) {
        console.log("api error -> ", error.message);
        toast.error("Something went wrong, try later.");
      }finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h2 className="text-2xl font-mono text-blue-500 bg-blue-500/10 px-5 py-2 rounded-full border border-blue-500  ">
        {" "}
        Your Profile🎉{" "}
      </h2>

      {loading ? <p>Loading...</p> : (
        <div className="details flex flex-col justify-center items-center  gap-5 py-5  ">
        <div className="upper flex flex-col justify-center items-center gap-3  ">
          <FaUserCircle
            size={150}
            className="text-zinc-600 border rounded-full border-blue-500 "
          />
          <div className="border px-5 py-5  w-full flex flex-col gap-3  border-zinc-700 rounded-xl ">
            <h3 className="text-blue-500 text-xl text-center ">
              Account Details
            </h3>
            <p className="px-5 py-2 bg-blue-500/10 border border-blue-500 rounded-xl text-neutral-300">
              User name - {userData.username}
            </p>
            <p className="px-5 py-2 bg-blue-500/10 border border-blue-500 rounded-xl text-neutral-300 ">
              User email - {userData.email}
            </p>
            <p className="px-5 py-2 bg-blue-500/10 border border-blue-500 rounded-xl text-neutral-300">
              Role - {userData.role}
            </p>
            <p className="px-5 py-2 bg-blue-500/10 border border-blue-500 rounded-xl text-neutral-300">
              Account created at -{" "}
              {new Date(userData.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div
          ref={ref}
          className="lower  p-5 justify-center  border w-full sm:w-[800px] border-zinc-700 rounded-xl flex flex-col gap-3 relative"
        >
          <div className="flex justify-center items-center ">
            <h3 className="text-blue-500 text-xl text-center bg-black/50 w-fit  px-3 py-1 rounded-lg">Quiz Details</h3>
          </div>

          <motion.div
            drag
            dragConstraints={ref}
            whileDrag={{ scale: 1.1 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
            className=" flex flex-col gap-2 p-5 bg-blue-500/10 w-fit rounded-xl border border-blue-500 cursor-pointer  "
          >
            <div className="flex justify-between items-center gap-3">
              <div></div>
              <p className="text-blue-500 ">Total Quizes ✨</p>
              <RxDragHandleDots2 />
            </div>
            <p className="text-center">{userData.totalQuizzes}</p>
          </motion.div>

          <motion.div
            drag
            dragConstraints={ref}
            whileDrag={{ scale: 1.1 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
            className=" flex flex-col gap-2 p-5 bg-blue-500/10 w-fit rounded-xl border border-blue-500 cursor-pointer  "
          >
            <div className="flex justify-between items-center gap-3">
              <div></div>
              <p className="text-blue-500 ">Total Score 🎉</p>
              <RxDragHandleDots2 />
            </div>
            
            <p className="text-center">{userData.totalScore}</p>
          </motion.div>

          <motion.div
            drag
            dragConstraints={ref}
            whileDrag={{ scale: 1.1 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
            className=" flex flex-col gap-2 p-5 bg-blue-500/10 w-fit rounded-xl border border-blue-500 cursor-pointer  "
          >
            <div className="flex justify-between items-center gap-3" >
              <div></div>
              <p className="text-blue-500 ">Average Accuracy 💪</p>
              <RxDragHandleDots2 />
            </div>
            <p className="text-center">
              {userData.averageAccuracy != null
                ? userData.averageAccuracy.toFixed(2) + " %"
                : "—"}
            </p>
          </motion.div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Profile;
