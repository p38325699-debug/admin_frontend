import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaQuestionCircle, FaVideo, FaUpload, FaCheck } from "react-icons/fa";

const QuizForm = () => {
  const [taskType, setTaskType] = useState("quiz");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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

    try {
      setIsSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save quiz");
      await res.json();
      alert("✅ Quiz added successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || (!videoUrl && !videoFile)) {
      alert("Please provide a title and either URL or file!");
      return;
    }

    try {
      setIsSubmitting(true);
      let res;

      if (videoFile) {
        const formData = new FormData();
        formData.append("title", videoTitle);
        formData.append("videoFile", videoFile);
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/videos`, {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/videos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: videoTitle, video_url: videoUrl }),
        });
      }

      if (!res.ok) throw new Error("Failed to upload video");
      await res.json();
      alert("✅ Video uploaded successfully!");
      setVideoTitle("");
      setVideoUrl("");
      setVideoFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="max-w-6xl ml-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
        {/* Header with Tabs on Right */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/task-data")}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-xl transition-all duration-200"
            >
              <FaArrowLeft className="text-violet-400" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white">Create Task</h2>
              <p className="text-gray-400 text-sm">{taskType === "quiz" ? "Add quiz questions" : "Upload video content"}</p>
            </div>
          </div>

          {/* Task Type Toggle - Moved to Right */}
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
              <span className="text-sm">Video</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 pb-20 max-h-[60vh] overflow-y-auto">
          {/* Quiz Form */}
          {taskType === "quiz" && (
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm font-medium">Question</label>
                <textarea
                  placeholder="Enter your question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-violet-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm font-medium">Options</label>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm w-6">{["A", "B", "C", "D"][idx]}</span>
                      <input
                        type="text"
                        placeholder={`Option ${["A", "B", "C", "D"][idx]}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...options];
                          newOpts[idx] = e.target.value;
                          setOptions(newOpts);
                        }}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:ring-1 focus:ring-violet-400 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setCorrectIndex(idx)}
                        className={`p-2 rounded-lg border transition-all ${
                          correctIndex === idx
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : "bg-gray-600 border-gray-500 text-gray-400 hover:border-green-500"
                        }`}
                      >
                        <FaCheck size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>Add Quiz</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuestion("");
                    setOptions(["", "", "", ""]);
                    setCorrectIndex(null);
                  }}
                  className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-all"
                >
                  Clear
                </button>
              </div>
            </form>
          )}

          {/* Video Form */}
          {taskType === "videos" && (
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm font-medium">Video Title</label>
                <input
                  type="text"
                  placeholder="Enter video title..."
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="grid gap-3">
                <div>
                  <label className="block text-white mb-2 text-sm font-medium">Video URL</label>
                  <input
                    type="text"
                    placeholder="YouTube/Vimeo/MP4 URL"
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      if (e.target.value) setVideoFile(null);
                    }}
                    disabled={videoFile !== null}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm font-medium">Or Upload File</label>
                  <input
                    type="file"
                    accept="video/mp4,video/*"
                    onChange={(e) => {
                      setVideoFile(e.target.files[0]);
                      if (e.target.files[0]) setVideoUrl("");
                    }}
                    disabled={videoUrl.length > 0}
                    className="w-full text-gray-400 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-500/20 file:text-blue-300"
                  />
                </div>
              </div>

              {(videoUrl || videoFile) && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <FaCheck size={12} />
                    <span>
                      {videoUrl 
                        ? "URL ready for upload" 
                        : `File selected: ${videoFile?.name}`}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>Add Video</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVideoTitle("");
                    setVideoUrl("");
                    setVideoFile(null);
                  }}
                  className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-all"
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizForm;