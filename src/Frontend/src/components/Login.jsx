import React, { useContext, useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AppConetxt } from "../context/AppContext";
import { motion } from "framer-motion";

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin } = useContext(AppConetxt);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
           document.body.style.overflow = 'unset'; 
        }

    },[])


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-xs bg-black/30 flex justify-center items-center">

      <motion.form 
      initial={{ opacity: 0.2 , y:50 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y:0 }}
      viewport={{ once: true}}

      className="relative  bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium ">{state}</h1>
        <p className="text-sm">Welcome back ! Please sign in to continue</p>


        {state !== 'Login' ? <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ">
            <FaUserLarge />
            <input type="text"  placeholder="Full Name" className="outline-0 text-sm " required/>
        </div> : <></>}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ">
            <MdEmail />
            <input type="email"  placeholder="Email id" className="outline-0 text-sm " required/>
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ">
            <FaLock />
            <input type="password"  placeholder="Password" className="outline-0 text-sm " required/>
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot password?</p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">{state === 'Login' ? 'login' : 'create account'}</button>

        {state ==='Login' ? <p className="mt-5 text-center ">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Sign Up')}>Sign up</span></p> :

        <p className="mt-5 text-center ">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Login')} >Login</span></p>}


        <RxCross2 className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowLogin(false)} />

      </motion.form>
    </div>
  );
};

export default Login;
