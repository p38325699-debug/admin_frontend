// src/pages/quiz_table.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaCheck, FaExclamationTriangle, FaQuestionCircle, FaVideo } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuizTable = () => {
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState("quiz");
  const [quizData, setQuizData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all quizzes + videos for admin
  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/quiz-with-videos?admin=true`);
      const data = await res.json();

      if (!res.ok || !data) throw new Error("Failed to fetch data");

      setQuizData(Array.isArray(data.quizzes) ? data.quizzes : []);
      setVideoData(Array.isArray(data.videos) ? data.videos : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      setMessage(null);
      setError(null);

      const url = `${BASE_URL}/api/${type === "quiz" ? "quizzes" : "videos"}/${id}`;
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setMessage(`${type === "quiz" ? "Quiz" : "Video"} deleted successfully!`);
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete");
    }
  };

  // Render video helper
  const renderVideo = (url) => {
    if (!url) return <span className="text-gray-500 text-sm">No video</span>;
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    if (fullUrl.includes("youtube.com") || fullUrl.includes("youtu.be")) {
      const videoId = fullUrl.includes("youtube.com") 
        ? fullUrl.split('v=')[1]?.split('&')[0]
        : fullUrl.split('youtu.be/')[1];
      
      return (
        <div className="relative group">
          <iframe
            width="200"
            height="120"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg"></div>
        </div>
      );
    }

    return (
      <video 
        src={fullUrl} 
        controls 
        className="w-40 h-24 object-cover rounded-lg border border-gray-600" 
      />
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 shadow-2xl">
{/* Header */}
<div className="flex justify-between items-center mb-6">
  <div className="flex items-center gap-4">
    <button
      onClick={() => navigate("/task-data")}
      className="flex items-center gap-2 bg-[#1f1f1f] hover:bg-[#333] text-gray-300 px-4 py-3 rounded-2xl transition-all duration-300 border border-gray-700 hover:border-violet-500/50"
    >
      <FaArrowLeft className="text-violet-400" />
      <span>Back</span>
    </button>
    <div className="flex items-center gap-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
          📊 Task Management
        </h2>
        <p className="text-gray-400 text-sm">
          {taskType === "quiz" ? "Manage quiz questions" : "Manage video content"}
        </p>
      </div>

      {/* Total Box moved here */}
      {!loading && (
        <div className="flex items-center gap-2 bg-[#1f1f1f] ml-32 rounded-xl px-4 py-2 border border-gray-700">
          <div className="text-gray-400 text-sm">Total:</div>
          <div className="text-xl font-bold text-white">
            {taskType === "quiz" ? quizData.length : videoData.length}
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Task Type Selector */}
  <div className="flex bg-gray-700 rounded-xl p-1">
    <button
      onClick={() => setTaskType("quiz")}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        taskType === "quiz" 
          ? "bg-violet-500 text-white shadow-lg" 
          : "text-gray-300 hover:text-white"
      }`}
    >
      <FaQuestionCircle size={14} />
      <span className="text-sm">Quiz</span>
    </button>
    <button
      onClick={() => setTaskType("videos")}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        taskType === "videos" 
          ? "bg-blue-500 text-white shadow-lg" 
          : "text-gray-300 hover:text-white"
      }`}
    >
      <FaVideo size={14} />
      <span className="text-sm">Videos</span>
    </button>
  </div>
</div>  {/* This closes the flex justify-between */}

{/* Status Messages - This should be OUTSIDE the header div */}
{message && (
  <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
    <div className="flex items-center gap-2 text-green-400">
      <FaCheck />
      <span>{message}</span>
    </div>
  </div>
)}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center gap-2 text-red-400">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        </div>
      )}



      {/* Table Container */}
      {!loading && (
        <div className="overflow-hidden rounded-xl">
          <div className="overflow-x-auto max-h-[60vh]">
            <table className="min-w-full text-sm border-separate border-spacing-y-2">
              <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-sm">ID</th>
                  {taskType === "quiz" ? (
                    <>
                      <th className="px-6 py-4 text-left font-semibold text-sm">Question</th>
                      <th className="px-6 py-4 text-left font-semibold text-sm">Options</th>
                      <th className="px-6 py-4 text-left font-semibold text-sm">Correct Answer</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4 text-left font-semibold text-sm">Title</th>
                      <th className="px-6 py-4 text-left font-semibold text-sm">Video</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-left font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskType === "quiz"
                  ? quizData.map((q) => (
                      <tr key={q.id} className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200">
                        <td className="px-6 py-4 font-mono text-violet-400">{q.id}</td>
                        <td className="px-6 py-4 max-w-[300px] truncate" title={q.question}>
                          {q.question}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-xs">A:</span>
                              <span className="text-sm truncate max-w-[120px]" title={q.option_a}>
                                {q.option_a}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400 text-xs">B:</span>
                              <span className="text-sm truncate max-w-[120px]" title={q.option_b}>
                                {q.option_b}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400 text-xs">C:</span>
                              <span className="text-sm truncate max-w-[120px]" title={q.option_c}>
                                {q.option_c}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-red-400 text-xs">D:</span>
                              <span className="text-sm truncate max-w-[120px]" title={q.option_d}>
                                {q.option_d}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-sm font-medium">
                            {q.correct_option}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(q.id, "quiz")}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 p-3 rounded-xl transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  : videoData.map((v) => (
                      <tr key={v.id} className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200">
                        <td className="px-6 py-4 font-mono text-blue-400">{v.id}</td>
                        <td className="px-6 py-4 max-w-[250px] truncate" title={v.title}>
                          {v.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-[200px]">
                            {renderVideo(v.video_url)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(v.id, "video")}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 p-3 rounded-xl transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {/* Empty State */}
            {(taskType === "quiz" ? quizData.length === 0 : videoData.length === 0) && (
              <div className="text-center text-gray-400 py-12">
                <div className="text-5xl mb-3">
                  {taskType === "quiz" ? "📝" : "🎥"}
                </div>
                <p className="text-base font-medium">
                  No {taskType === "quiz" ? "quiz questions" : "videos"} found
                </p>
                <p className="text-sm mt-2">
                  {taskType === "quiz" 
                    ? "Add some quiz questions to get started" 
                    : "Upload some video content to get started"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    
    </div>
  );
};

export default QuizTable;