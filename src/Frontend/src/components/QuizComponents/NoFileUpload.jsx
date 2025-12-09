import React, { useState } from "react";
import { FaArrowLeft, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import Quiz from "./Quiz/Quiz";
import { SiQuizlet } from "react-icons/si";

const NoFileUpload = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    numberOfQuestions: 5,
    difficulty: "easy",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiQuizData, setAiQuizData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getAnswerFromCorrectAnswer = (q) => {
    const correct = q.correctAnswer;
    if (typeof correct === "number" && correct >= 0 && correct <= 3) {
      return correct + 1;
    }
    return 1;
  };

  const transformBackendQuizData = (res) => {
    if (!res || !res.data || !res.data.data || !Array.isArray(res.data.data.questions)) return [];

    const arr = res.data.data.questions.map((q) => {
      const ans = getAnswerFromCorrectAnswer(q);

      return {
        question: q.questionText || q.question || "",
        option1: (q.options && q.options[0]) || "",
        option2: (q.options && q.options[1]) || "",
        option3: (q.options && q.options[2]) || "",
        option4: (q.options && q.options[3]) || "",
        ans: ans,
        _id: q._id || q.id || null,
      };
    });

    arr.title = res.data.data.title || "Untitled Quiz";
    return arr;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        numberOfQuestions: Number(formValues.numberOfQuestions),
        difficulty: formValues.difficulty,
      };

      const res = await api.post("/quiz/ai/nofile", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res) {
        const finalArrayData = transformBackendQuizData(res);
        setAiQuizData(finalArrayData);

        toast.success("Quiz Generated successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Something went wrong, try later", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Error generating quiz. Try again");

      toast.error("Error generating quiz. Try again", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-0 flex flex-col gap-3">
      <p
        className="flex items-center gap-2 px-4 cursor-pointer py-1 bg-zinc-800 w-fit rounded-full "
        onClick={() => navigate("/dashboard/quiz/ai")}
      >
        <FaArrowLeft size={10} /> Back
      </p>

      <h3 className="flex items-center gap-2 text-zinc-400 ">
        Generate Quizzes With AI <FaArrowRightLong />
      </h3>

      {aiQuizData ? (
        <Quiz data={aiQuizData} />
      ) : (
        <div className="flex justify-center items-center ">
          <div className="quiz-form p-3 bg-zinc-800 rounded-lg flex flex-col gap-2">
            <h3 className="text-lg text-center flex items-center justify-center gap-2">
              <SiQuizlet size={15} /> Generate Quiz
            </h3>
            <hr className="text-zinc-500" />

            <form onSubmit={submitHandler} className="py-2 flex flex-col gap-2 w-[300px] sm:w-[300px]">
              <div className="input flex flex-col gap-1">
                <label htmlFor="title" className="text-lg">
                  Title
                </label>
                <input
                  className="px-3 py-1 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500 placeholder:text-sm"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., Programming Quiz"
                  required
                />
              </div>

              <div className="input flex flex-col gap-1">
                <label htmlFor="description" className="text-lg">
                  Description
                </label>
                <textarea
                  className="px-3 py-1 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500 text-sm"
                  name="description"
                  rows={3}
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Describe the quiz topic..."
                  required
                ></textarea>
              </div>

              <div className="input flex flex-col gap-1">
                <label htmlFor="numberOfQuestions" className="text-lg">
                  Number of Questions
                </label>
                <input
                  className="px-3 py-1 outline-0 bg-zinc-700 rounded-lg focus:border focus:border-blue-500"
                  name="numberOfQuestions"
                  value={formValues.numberOfQuestions}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>

              <div className="input flex flex-col gap-1 ">
                <label htmlFor="difficulty" className="text-lg">
                  Choose difficulty
                </label>
                <select
                  name="difficulty"
                  value={formValues.difficulty}
                  onChange={handleChange}
                  className="w-full text-ellipsis border-none focus:border focus:border-blue-500 bg-zinc-700 rounded-lg px-3 py-1 text-zinc-300 cursor-pointer"
                  required
                >
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                  <option value="god level hard">god level hard</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-3 py-1 bg-blue-500 text-md rounded-lg cursor-pointer hover:scale-102 transition-all duration-300 hover:bg-blue-400 font-semibold"
              >
                {loading ? "Generating...⌛" : "Generate ✨"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoFileUpload;
