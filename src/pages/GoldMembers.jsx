import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCrown, FaDollarSign, FaHistory, FaFilter, FaSync, FaUser, FaEnvelope, FaCalendar, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GoldMembers = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);
  const [allRewards, setAllRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({ 
    from: "", 
    to: "", 
    milestone: "all" 
  });
  
  const [stats, setStats] = useState({
    total: 0,
    totalRewards: 0,
    averageReward: 0,
    topMilestone: 0
  });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/gold-rewards`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setAllRewards(data);
        setRewards(data);
        calculateStats(data);
      } else {
        console.error("Invalid data format:", data);
        setAllRewards([]);
        setRewards([]);
      }
    } catch (error) {
      console.error("Error fetching gold members data:", error);
      setAllRewards([]);
      setRewards([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const totalRewards = data.reduce((sum, item) => sum + parseFloat(item.reward || 0), 0);
    const averageReward = total > 0 ? totalRewards / total : 0;
    const topMilestone = data.length > 0 ? Math.max(...data.map(item => parseInt(item.milestone) || 0)) : 0;

    setStats({ total, totalRewards, averageReward, topMilestone });
  };

  const applyFilters = () => {
    let filtered = [...allRewards];
    
    if (filters.from) {
      const fromDate = new Date(filters.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(item => {
        const rewardDate = new Date(item.rewarded_at);
        rewardDate.setHours(0, 0, 0, 0);
        return rewardDate >= fromDate;
      });
    }
    
    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(item => new Date(item.rewarded_at) <= toDate);
    }
    
    if (filters.milestone !== "all") {
      filtered = filtered.filter(item => item.milestone.toString() === filters.milestone);
    }
    
    setRewards(filtered);
  };

  const clearFilters = () => {
    setFilters({ from: "", to: "", milestone: "all" });
    setRewards(allRewards);
  };

  const getMilestoneOptions = () => {
    const milestones = [...new Set(allRewards.map(item => item.milestone))].sort((a, b) => a - b);
    return milestones;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 bg-[#1f1f1f] hover:bg-[#333] text-gray-300 px-3 py-2 rounded-lg transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 text-sm"
          >
            <FaArrowLeft className="text-yellow-400 text-xs" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🏆 Gold Members Rewards
              </h2>
              <p className="text-gray-400 text-xs">
                Manage gold member rewards and milestones
              </p>
            </div>

            {!loading && (
              <div className="flex items-center gap-1 bg-[#1f1f1f] ml-16 rounded-lg px-3 py-1 border border-gray-700">
                <div className="text-gray-400 text-xs">Total:</div>
                <div className="font-bold text-white text-sm">
                  {stats.total}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={fetchRewards}
          className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-sm"
        >
          <FaSync size={12} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-yellow-500/20 rounded">
                <FaCrown className="text-yellow-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Members</p>
                <p className="text-white font-bold text-sm">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-500/20 rounded">
                <FaDollarSign className="text-green-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Rewards</p>
                <p className="text-white font-bold text-sm">${stats.totalRewards.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-500/20 rounded">
                <FaDollarSign className="text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Average Reward</p>
                <p className="text-white font-bold text-sm">${stats.averageReward.toFixed(2)}</p>
              </div>
            </div>
          </div> */}

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-500/20 rounded">
                <FaTrophy className="text-purple-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Top Milestone</p>
                <p className="text-white font-bold text-sm">{stats.topMilestone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-3">
        <div>
          <label className="text-gray-300 text-xs mb-1 block">From Date</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
          />
        </div>
        <div>
          <label className="text-gray-300 text-xs mb-1 block">To Date</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
          />
        </div>
        <div>
          <label className="text-gray-300 text-xs mb-1 block">Milestone</label>
          <select
            value={filters.milestone}
            onChange={(e) => setFilters({ ...filters, milestone: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
          >
            <option value="all">All Milestones</option>
            {getMilestoneOptions().map(milestone => (
              <option key={milestone} value={milestone}>
                Milestone {milestone}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1 justify-center text-sm"
          >
            <FaFilter size={10} />
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-all text-sm"
          >
            Clear
          </button>
        </div>
      </div>
      
      {(filters.from || filters.to || filters.milestone !== "all") && (
        <div className="mb-3 text-xs text-gray-400">
          Showing {rewards.length} of {allRewards.length} rewards
        </div>
      )}

      {/* Table Container */}
      {!loading && (
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
            <table className="min-w-full text-xs border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 text-left font-semibold">User Info</th>
                  <th className="px-4 py-2 text-left font-semibold">Milestone</th>
                  <th className="px-4 py-2 text-left font-semibold">Reward</th>
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                </tr>
              </thead>

              <tbody>
                {rewards.length > 0 ? (
                  rewards.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200"
                    >
                      {/* ID */}
                      <td className="px-4 py-2 font-mono text-yellow-400 text-xs">
                        {item.id}
                      </td>

                      {/* User Info */}
                      <td className="px-4 py-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <FaUser className="text-blue-400 text-xs" />
                            <span className="text-xs">
                              {item.full_name || `User ${item.user_id || 'N/A'}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-green-400 text-xs" />
                            <span className="text-xs text-gray-400">{item.email}</span>
                          </div>
                          {item.user_id && (
                            <div className="text-xs text-gray-500 font-mono">
                              ID: {item.user_id}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Milestone */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <FaTrophy className="text-yellow-400 text-xs" />
                          <span className="font-bold text-white text-sm">
                            {item.milestone}
                          </span>
                        </div>
                      </td>

                      {/* Reward */}
                      <td className="px-4 py-2">
                        <span className="font-bold text-green-400 text-sm">
                          ${parseFloat(item.reward || 0).toFixed(2)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaCalendar className="text-xs" />
                          <span className="text-xs">
                            {new Date(item.rewarded_at).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <FaHistory className="text-2xl mb-2 opacity-50" />
                        <p className="text-sm font-medium">No gold member rewards found</p>
                        <p className="text-xs mt-0.5">
                          {(filters.from || filters.to || filters.milestone !== "all")
                            ? "Try changing your filter criteria"
                            : "No rewards data available"}
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="ml-3 text-gray-400">Loading gold members...</span>
        </div>
      )}
    </div>
  );
};

export default GoldMembers;