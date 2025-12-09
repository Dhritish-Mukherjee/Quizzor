import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PiHourglassLowFill } from "react-icons/pi";
import { SiTurbosquid } from "react-icons/si";
import { AiFillFileUnknown } from "react-icons/ai";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const AiQuizLanding = () => {

    const navigate = useNavigate();

    const modesTable = [
        {
            mode : "Slow Mode",
            logo : <PiHourglassLowFill />,
            desc : "Generate AI-powered quizzes from uploaded documents (supports PDFs, images, and other document formats). The AI analyzes the document content and creates quiz questions based on the material.",
            shortTitle : "Slow Processing",
            navigateTo : "/dashboard/quiz/ai/slow",

        },
        {
            mode : "Turbo Mode",
            logo : <SiTurbosquid />,
            desc : "Generate AI-powered quizzes from uploaded documents (faster processing, supports PDFs, DOCX, PPTX, TXT, DOC, XLSX - no image files). The AI analyzes the document content and creates quiz questions based on the material.",
            shortTitle : "Fast Processing",
            navigateTo : "/dashboard/quiz/ai/turbo",

        },
        {
            mode : "No File Upload",
            logo : <AiFillFileUnknown />,
            desc : "Generate AI-powered quizzes based on a topic without uploading any files. The AI creates quiz questions from its knowledge base on the specified topic.",
            shortTitle : "Fast Processing",
            navigateTo : "/dashboard/quiz/ai/nofileUpload",

        },
    ]

    const goforNavigate = (path) => {
        navigate(path);
    }

  return (
    <div className="p-0 flex flex-col gap-3">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/quiz")}
      >
        <FaArrowLeft size={10} /> Back
      </p>
      <h3 className="text-center text-blue-500 font-semibold text-xl ">
        " Generate Quizes With AI 🤖 "
      </h3>

      <div className="select-modes py-5 flex flex-col gap-5 ">
        {modesTable.map((item, index) => (
            <div onClick={() => goforNavigate(item.navigateTo)} key={index} className="modeCard flex flex-col gap-2 p-3 bg-blue-500/10 border border-blue-500  rounded-lg cursor-pointer hover:scale-102 transition-all duration-300  ">
                <div className="flex justify-between items-center ">
                    <h3 className=" text-lg font-semibold text-blue-500  ">{item.mode}</h3>
                    <p className="text-2xl  ">{item.logo}</p>
                </div>
                <p className="text-md text-zinc-500 ">{item.desc}</p>
                <p className="text-sm px-3 py-1  bg-blue-500 w-fit  rounded-full">{item.shortTitle}</p>
                <p className="flex justify-center items-center gap-2 w-fit text-sm text-neutral-300 ">try now<BsArrowUpRightCircleFill size={20} /></p>

            </div>
        ))}
        

      </div>



    </div>
  );
};

export default AiQuizLanding;
