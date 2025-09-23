import React, { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ from .env

const HomeData = () => {
  const [banners, setBanners] = useState([]);
  const [history, setHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/home-data`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      const res = await fetch(`${BASE_URL}/api/home-data`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Banner updated successfully.");
        setBanners([]);
        fetchHistory();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
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
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  return (
<div className="max-w-[78vw] h-[80vh] mx-0 bg-[#1f1f1f] rounded-xl shadow-lg p-6 overflow-y-auto scrollbar-hide">

      <h2 className="text-xl font-bold mb-6 text-white">Manage Banners</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Upload Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="mb-3 text-gray-300"
          />
        </div>

        {/* Preview */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden"
            >
              <img
                src={banner.preview}
                alt={`Banner ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => handleBannerDelete(index)}
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-violet-500 cursor-pointer hover:bg-[#670383] text-white font-semibold px-6 py-2 rounded-md"
        >
          Save
        </button>
      </form>

      {/* History */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-300">
        Uploaded Banners
      </h2>

      <table className="min-w-full text-sm border-separate border-spacing-y-2 table-fixed ">
        <thead className="bg-[#2a2a2a] text-gray-300 rounded-lg">
          <tr>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Uploaded At</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr
              key={item.id}
              className="bg-[#292828] hover:bg-[#333] text-gray-200 rounded-lg"
            >
              <td className="px-6 py-4">
                <img
                  src={item.banner_url}
                  alt="banner"
                  className="h-16 object-cover"
                />
              </td>
              <td className="px-6 py-4">
                {new Date(item.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDeleteFromHistory(item.id)}
                  className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-3">
                No banners uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style>
  {`
    .scrollbar-hide::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE/Edge */
      scrollbar-width: none;     /* Firefox */
    }
  `}
</style>

    </div>
  );
};

export default HomeData;
