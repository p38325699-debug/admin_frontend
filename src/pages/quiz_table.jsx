import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuizTable = () => {
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState("quiz"); // quiz | videos
  const [quizData, setQuizData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // ✅ Single useEffect to fetch both quizzes & videos
  useEffect(() => {
    // Fetch quizzes
    // fetch("http://localhost:5000/api/quizzes")
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`)
      .then((res) => res.json())
      .then((data) => setQuizData(Array.isArray(data) ? data : []))
      .catch(() => setError("Error fetching quizzes"));

  // Fetch videos
// fetch("http://localhost:5000/api/videos")
fetch(`${import.meta.env.VITE_API_BASE_URL}/api/videos`)

  .then((res) => res.json())
  .then((data) => {
    console.log("Video API Response:", data); // should be []
    setVideoData(Array.isArray(data) ? data : []); // ✅ only set array
  })
  .catch(() => setError("Error fetching videos"));
  }, []);

  // Delete handler
  const handleDelete = (id, type) => {
    setMessage(null);
    setError(null);

    // const url =
    //   type === "quiz"
    //     ? `http://localhost:5000/api/quizzes/${id}`
    //     : `http://localhost:5000/api/videos/${id}`;

    const url =
  type === "quiz"
    ? `${BASE_URL}/api/quizzes/${id}`
    : `${BASE_URL}/api/videos/${id}`;

    fetch(url, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        if (type === "quiz") {
          setQuizData((prev) => prev.filter((q) => q.id !== id));
        } else {
          setVideoData((prev) => prev.filter((v) => v.id !== id));
        }
        setMessage("Deleted successfully!");
      })
      .catch((err) => setError(err.message));
  };

  // Render video helper
  const renderVideo = (url) => {
    if (!url || typeof url !== "string") return "No video";

    // Full URL for local files
    // const fullUrl = url.startsWith("http")
    //   ? url
    //   : `http://localhost:5000${url}`;
    const fullUrl = url.startsWith("http")
  ? url
  : `${BASE_URL}${url}`;

    // YouTube
    if (fullUrl.includes("youtube.com") || fullUrl.includes("youtu.be")) {
      return (
        <iframe
          width="200"
          height="120"
          src={fullUrl.replace("watch?v=", "embed/")}
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      );
    }

    // Vimeo
    if (fullUrl.includes("vimeo.com")) {
      return (
        <iframe
          src={fullUrl.replace("vimeo.com", "player.vimeo.com/video")}
          width="200"
          height="120"
          allowFullScreen
          title="Vimeo video"
        ></iframe>
      );
    }

    // Local video
    return <video src={fullUrl} controls className="w-40" />;
  };

  return (
<div className="max-w-[78vw] h-[80vh] mx-0 bg-[#1f1f1f] rounded-xl shadow-lg p-6 overflow-y-auto scrollbar-hide">
  
      {/* Dropdown + Back button */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="border rounded px-3 py-2 bg-[#292928] text-amber-50"
        >
          <option value="quiz">Quiz</option>
          <option value="videos">Videos</option>
        </select>

        <button
          onClick={() => navigate("/task-data")}
          className=" text-white px-4 py-2 rounded cursor-pointer font-semibold"
        >
          ⬅ Back
        </button>
      </div>

      {/* Messages */}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
        <table className="min-w-full text-sm border-separate border-spacing-y-2 table-fixed">
          <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10 rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              {taskType === "quiz" ? (
                <>
                  <th className="px-6 py-3 text-left">Question</th>
                  <th className="px-6 py-3 text-left">Options</th>
                  <th className="px-6 py-3 text-left">Correct</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Video</th>
                </>
              )}
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskType === "quiz" ? (
              Array.isArray(quizData) &&
              quizData.map((q) => (
                <tr key={q.id} className="bg-[#292828] hover:bg-[#333] text-gray-300">
                  <td className="px-6 py-4">{q.id}</td>
                  <td className="px-6 py-4">{q.question}</td>
                  <td className="px-6 py-4">
                    {q.option_a}, {q.option_b}, {q.option_c}, {q.option_d}
                  </td>
                  <td className="px-6 py-4">{q.correct_option}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(q.id, "quiz")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              Array.isArray(videoData) &&
              videoData.map((v) => (
                <tr key={v.id} className="bg-[#292828] hover:bg-[#333] text-gray-200 rounded-lg">
                  <td className="px-6 py-4">{v.id}</td>
                  <td className="px-6 py-4">{v.title}</td>
                  <td className="px-6 py-4">{renderVideo(v.video_url)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(v.id, "videos")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizTable;
