// quiz_form.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const QuizForm = () => {
  const [taskType, setTaskType] = useState("quiz"); // quiz | videos
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();

  // Quiz submit
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some((opt) => !opt) || correctIndex === null) {
      alert("Please fill all quiz fields!");
      return;
    }

    const payload = {
      question,
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      correct_option: ["A", "B", "C", "D"][correctIndex],
    };

    // try {
    //   const res = await fetch("http://localhost:5000/api/quizzes", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    try {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

      if (!res.ok) throw new Error("Failed to save quiz");
      const data = await res.json();
      alert("✅ Quiz added successfully!");

      // reset
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Video submit
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || (!videoUrl && !videoFile)) {
      alert("Please provide a title and either URL or file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    if (videoFile) {
      formData.append("videoFile", videoFile); // backend must handle file upload
    } else {
      formData.append("video_url", videoUrl);
    }

    // try {
    //   const res = await fetch("http://localhost:5000/api/videos", {
    //     method: "POST",
    //     body: formData,
    //   });

    try {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/videos`, {
    method: "POST",
    body: formData,
  });


    

      if (!res.ok) throw new Error("Failed to upload video");
      const data = await res.json();
      alert("✅ Video uploaded successfully!");

      // reset
      setVideoTitle("");
      setVideoUrl("");
      setVideoFile(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-[76vw] p-6 bg-[#292828] text-amber-50 rounded shadow flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Add Task</h2>

      {/* Dropdown */}
      <div className="mb-6">
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="border rounded p-2 bg-[#292928] "
        >
          <option value="quiz">Quiz</option>
          <option value="videos">Videos</option>
        </select>
      </div>

      {/* Quiz Form */}
      {taskType === "quiz" && (
        <form onSubmit={handleQuizSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[idx] = e.target.value;
                    setOptions(newOpts);
                  }}
                  className="border p-2 flex-1 rounded"
                />
                <input
                  type="radio"
                  id={`correct-${idx}`}
                  name="correctOption"
                  checked={correctIndex === idx}
                  onChange={() => setCorrectIndex(idx)}
                />
                <label htmlFor={`correct-${idx}`} className="text-sm">
                  Correct
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 cursor-pointer hover:bg-[#670383] font-semibold text-white rounded"
          >
            Add Quiz
          </button>
        </form>
      )}

      {/* Video Form */}
      {taskType === "videos" && (
        <form onSubmit={handleVideoSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Video Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Video URL (YouTube/Vimeo/MP4)"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              if (e.target.value) setVideoFile(null);
            }}
            className="border p-2 w-full rounded"
            disabled={videoFile !== null}
          />
          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => {
              setVideoFile(e.target.files[0]);
              if (e.target.files[0]) setVideoUrl("");
            }}
            className="border p-2 w-full rounded"
            disabled={videoUrl.length > 0}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 hover:bg-[#670383] font-semibold cursor-pointer text-white rounded"
          >
            Add Video
          </button>
        </form>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate("/task-data")}
        className="mt-4 px-4 py-2 text-amber-50 rounded cursor-pointer"
      >
        ⬅ Back
      </button>
    </div>
  );
};

export default QuizForm;
