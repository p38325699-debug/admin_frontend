import React, { useState, useEffect } from "react";
import { FaUpload, FaTrash, FaImage, FaHistory, FaCheck } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomeData = () => {
  const [banners, setBanners] = useState([]);
  const [history, setHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/home-data`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleBannerUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Add these validation checks
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (5MB limit from backend)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setBanners([{ file, preview: previewUrl }]);
  }
};

  const handleBannerDelete = (index) => {
    setBanners((prev) => prev.filter((_, i) => i !== index));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (banners.length === 0) {
    alert("Please upload at least one banner.");
    return;
  }

  const formData = new FormData();
  formData.append("banner", banners[0].file);

  try {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/api/home-data`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setSuccessMessage("Banner updated successfully!");
      setBanners([]);
      fetchHistory();
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      // Handle backend error response
      alert(data.message || "Upload failed");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed. Please try again."); // Add user feedback
  } finally {
    setLoading(false);
  }
};

const handleDeleteFromHistory = async (id) => {
  if (!window.confirm("Are you sure you want to delete this banner?")) return;

  try {
    const res = await fetch(`${BASE_URL}/api/home-data/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      fetchHistory();
    } else {
      alert(data.message || "Delete failed"); // Add user feedback
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Delete failed. Please try again."); // Add user feedback
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">🎨 Banner Management</h2>
            <p className="text-gray-400 text-sm">Upload and manage homepage banners</p>
          </div>
          
          {/* Stats */}
          <div className="bg-[#1f1f1f] rounded-xl p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <FaImage className="text-violet-400" size={14} />
              <div>
                <div className="text-lg font-bold text-white">Total Banners: {history.length}</div>
               
              </div>
            </div>
          </div> 
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <FaCheck size={12} />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Minimal Upload Section */}
          <div className="bg-[#1f1f1f] rounded-xl p-4 border border-gray-700 mb-6">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2 text-sm">
              <FaUpload className="text-violet-400" size={12} />
              Upload New Banner
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Compact File Upload */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-all"
                >
                  <FaImage size={12} />
                  <span>Choose File</span>
                </label>
                
                <button
                  type="submit"
                  disabled={banners.length === 0 || loading}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>

              {/* Minimal Preview */}
              {banners.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <img
                    src={banners[0].preview}
                    alt="Banner preview"
                    className="w-16 h-12 object-cover rounded border border-gray-600"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{banners[0].file.name}</p>
                    <p className="text-gray-400 text-xs">
                      {(banners[0].file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBannerDelete(0)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* History Section */}
          <div className="bg-[#1f1f1f] rounded-xl p-4 mb-20 border border-gray-700">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2 text-sm">
              <FaHistory className="text-blue-400" size={12} />
              Upload History
            </h3>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#2a2a2a] text-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Preview</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Uploaded At</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="w-20 h-12 rounded overflow-hidden border border-gray-600">
                            <img
                              src={item.banner_url}
                              alt="banner"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-white text-xs">
                            {new Date(item.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {new Date(item.created_at).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteFromHistory(item.id)}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all"
                            title="Delete Banner"
                          >
                            <FaTrash size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {history.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-3xl mb-2">🖼️</div>
                    <p className="text-sm font-medium">No banners uploaded yet</p>
                    <p className="text-xs mt-1">Upload your first banner to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeData;