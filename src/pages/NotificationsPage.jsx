import React, { useState, useEffect } from "react";
import { FaBell, FaEdit, FaPlus, FaUser, FaEnvelope, FaCalendar, FaArrowLeft, FaSave, FaTimes, FaFilter, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNotification, setEditingNotification] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({ from: "", to: "" });
  const [newNotification, setNewNotification] = useState({
    user_id: "",
    message: ""
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/notifications/all`);
      const data = await res.json();
      if (data.success) {
        setAllNotifications(data.data);
        setNotifications(data.data);
      } else {
        console.error("Failed to load notifications");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyDateFilter = () => {
    let filtered = [...allNotifications];
    
    if (filters.from) {
      const fromDate = new Date(filters.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(n => {
        const notificationDate = new Date(n.created_at);
        notificationDate.setHours(0, 0, 0, 0);
        return notificationDate >= fromDate;
      });
    }
    
    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(n => new Date(n.created_at) <= toDate);
    }
    
    setNotifications(filtered);
  };

  const clearDateFilter = () => {
    setFilters({ from: "", to: "" });
    setNotifications(allNotifications);
  };

  const handleRefresh = () => {
    fetchNotifications();
    clearDateFilter();
  };

  const handleEditClick = (notification) => {
    setEditingNotification(notification);
    setEditMessage(notification.message);
  };

  const handleSaveEdit = async () => {
    if (!editMessage.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/api/notifications/${editingNotification.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: editMessage
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        const updatedNotifications = notifications.map(notif =>
          notif.id === editingNotification.id 
            ? { ...notif, message: editMessage }
            : notif
        );
        const updatedAllNotifications = allNotifications.map(notif =>
          notif.id === editingNotification.id 
            ? { ...notif, message: editMessage }
            : notif
        );
        
        setNotifications(updatedNotifications);
        setAllNotifications(updatedAllNotifications);
        setEditingNotification(null);
        setEditMessage("");
      } else {
        console.error("Failed to update notification");
      }
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  const handleAddNotification = async () => {
    if (!newNotification.user_id || !newNotification.message.trim()) {
      alert("Please enter both User ID and message.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotification),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Notification added successfully!");
        setAllNotifications([data.data, ...allNotifications]);
        setNotifications([data.data, ...notifications]);
        setNewNotification({ user_id: "", message: "" });
        setShowAddForm(false);
      } else if (data.message === "User not found") {
        alert("⚠️ That user not found!");
      } else {
        alert("User not found. Check userId");
      }
    } catch (err) {
      console.error("Error adding notification:", err);
      alert("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 bg-[#1f1f1f] hover:bg-[#333] text-gray-300 px-3 py-2 rounded-lg transition-all duration-300 border border-gray-700 hover:border-violet-500/50 text-sm"
          >
            <FaArrowLeft className="text-violet-400 text-xs" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                🔔 Notifications Management
              </h2>
              <p className="text-gray-400 text-xs">
                Manage user notifications
              </p>
            </div>

            {!loading && (
              <div className="flex items-center gap-1 bg-[#1f1f1f] ml-16 rounded-lg px-3 py-1 border border-gray-700">
                <div className="text-gray-400 text-xs">Total:</div>
                <div className="font-bold text-white text-sm">
                  {notifications.length}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-sm"
            title="Refresh Data"
          >
            <FaSync size={12} />
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 px-3 py-2 rounded-lg transition-all duration-300 border border-green-500/30 hover:border-green-500/50 text-sm"
          >
            <FaPlus size={12} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-4 p-3 bg-[#1f1f1f] rounded-lg border border-gray-700">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-gray-300 text-xs mb-1 block">From Date</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-300 text-xs mb-1 block">To Date</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={applyDateFilter}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1 text-sm"
            >
              <FaFilter size={10} />
              Apply
            </button>
            <button
              onClick={clearDateFilter}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Add Notification Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white">Add New Notification</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-300 text-xs mb-1 block">User ID</label>
                <input
                  type="number"
                  value={newNotification.user_id}
                  onChange={(e) => setNewNotification({...newNotification, user_id: e.target.value})}
                  className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 text-sm"
                  placeholder="Enter User ID"
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-xs mb-1 block">Message</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 h-24 text-sm"
                  placeholder="Enter notification message"
                />
              </div>
              
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNotification}
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white px-3 py-2 rounded-lg transition-all text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white">Edit Notification</h3>
              <button
                onClick={() => setEditingNotification(null)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-300 text-xs mb-1 block">Message</label>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 h-24 text-sm"
                  placeholder="Enter notification message"
                />
              </div>
              
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setEditingNotification(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white px-3 py-2 rounded-lg transition-all text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      {!loading && (
        <div className="overflow-hidden rounded-lg">
          <div className="overflow-x-auto max-h-[55vh]">
            <table className="min-w-full text-xs border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 text-left font-semibold">User Info</th>
                  <th className="px-4 py-2 text-left font-semibold">Message</th>
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <tr key={notification.id} className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200">
                      <td className="px-4 py-2 font-mono text-violet-400 text-xs">{notification.id}</td>
                      <td className="px-4 py-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <FaUser className="text-blue-400 text-xs" />
                            <span className="text-xs">{notification.full_name || `User ${notification.user_id}`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-green-400 text-xs" />
                            <span className="text-xs text-gray-400">{notification.email}</span>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            ID: {notification.user_id}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 max-w-[250px]">
                        <div className="leading-relaxed text-xs" title={notification.message}>
                          {notification.message}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaCalendar className="text-xs" />
                          <span className="text-xs">
                            {new Date(notification.created_at).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditClick(notification)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 p-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                          title="Edit Message"
                        >
                          <FaEdit size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <FaBell className="text-2xl mb-2 opacity-50" />
                        <p className="text-sm font-medium">No notifications found</p>
                        <p className="text-xs mt-0.5">
                          {filters.from || filters.to ? "Try changing your filter criteria" : "Add notifications to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;