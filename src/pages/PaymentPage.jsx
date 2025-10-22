import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { 
  FaEye, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaSync, 
  FaFilter, 
  FaUser, 
  FaEnvelope, 
  FaCalendar,
  FaSearch,
  FaArrowLeft,
  FaMoneyBillWave,
  FaCheck,
  FaTimes,
  FaRupeeSign
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PaymentPage() {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState([]);
  const [allWalletData, setAllWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    search: "",
    from: "", 
    to: "", 
    status: "all",
    method: "all",
    due: "all"
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    totalAmount: 0,
    due: 0
  });

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/wallet/all`);
      if (res.data.success) {
        setAllWalletData(res.data.data);
        setWalletData(res.data.data);
        calculateStats(res.data.data);
      } else {
        setAllWalletData([]);
        setWalletData([]);
      }
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      Swal.fire("Error", "Unable to load wallet data", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(item => item.status === 'pending').length;
    const completed = data.filter(item => item.status === 'completed').length;
    const due = data.filter(item => item.due).length;
    const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    setStats({ total, pending, completed, totalAmount, due });
  };

  const applyFilters = () => {
    let filtered = [...allWalletData];
    
    // Search filter
    if (filters.search) {
      filtered = filtered.filter(item => 
        item.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.utr_number?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Date filters
    if (filters.from) {
      const fromDate = new Date(filters.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(item => {
        const paymentDate = new Date(item.payment_date);
        paymentDate.setHours(0, 0, 0, 0);
        return paymentDate >= fromDate;
      });
    }
    
    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(item => new Date(item.payment_date) <= toDate);
    }
    
    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Method filter
    if (filters.method !== "all") {
      filtered = filtered.filter(item => item.method === filters.method);
    }

    // Due filter
    if (filters.due !== "all") {
      filtered = filtered.filter(item => 
        (filters.due === 'true' && item.due) || 
        (filters.due === 'false' && !item.due)
      );
    }
    
    setWalletData(filtered);
    calculateStats(filtered);
  };

  const clearFilters = () => {
    setFilters({ search: "", from: "", to: "", status: "all", method: "all", due: "all" });
    setWalletData(allWalletData);
    calculateStats(allWalletData);
  };

  const handleDueChange = async (id, newDue) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newDue ? 'Due' : 'Not Due'}?`)) return;

    try {
      const res = await axios.put(`${API_BASE_URL}/api/wallet-due/${id}`, {
        due: newDue
      });

      if (res.data.success) {
        Swal.fire("Updated!", "Due status updated successfully.", "success");
        const updatedData = walletData.map(item =>
          item.id === id ? { ...item, due: newDue } : item
        );
        const updatedAllData = allWalletData.map(item =>
          item.id === id ? { ...item, due: newDue } : item
        );
        
        setWalletData(updatedData);
        setAllWalletData(updatedAllData);
        calculateStats(updatedAllData);
      }
    } catch (err) {
      console.error("Error updating due:", err);
      Swal.fire("Error", "Failed to update due status", "error");
    }
  };

  const handleViewScreenshot = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/wallet/${id}/screenshot`, {
        responseType: "arraybuffer",
      });
      const base64 = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageUrl = `data:image/png;base64,${base64}`;
      Swal.fire({
        title: "Payment Screenshot",
        imageUrl,
        imageAlt: "Screenshot",
        width: 500,
        showCloseButton: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: 'white'
      });
    } catch (err) {
      console.error("Error fetching screenshot:", err);
      Swal.fire("Error", "Screenshot not available", "error");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-400 text-xs" />;
      case "pending":
        return <FaClock className="text-yellow-400 text-xs" />;
      default:
        return <FaTimesCircle className="text-red-400 text-xs" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-red-500/20 text-red-400 border-red-500/30";
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "UPI":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "SCANNER":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "CRYPTO":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
                💰 Wallet Transactions
              </h2>
              <p className="text-gray-400 text-xs">
                Manage user wallet top-up requests
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
          onClick={fetchWalletData}
          className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-sm"
        >
          <FaSync size={12} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-violet-500/20 rounded">
                <FaMoneyBillWave className="text-violet-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Amount</p>
                <p className="text-white font-bold text-sm">₹{stats.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

         

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-500/20 rounded">
                <FaCheck className="text-green-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Completed</p>
                <p className="text-white font-bold text-sm">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-500/20 rounded">
                <FaTimes className="text-red-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Due</p>
                <p className="text-white font-bold text-sm">{stats.due}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-500/20 rounded">
                <FaMoneyBillWave className="text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total</p>
                <p className="text-white font-bold text-sm">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end mb-3">
        <div>
          <label className="text-gray-300 text-xs mb-1 block">Search</label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
            <input
              type="text"
              placeholder="Name, email, UTR..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-gray-600 text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
            />
          </div>
        </div>
        
        <div>
          <label className="text-gray-300 text-xs mb-1 block">From Date</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>
        
        <div>
          <label className="text-gray-300 text-xs mb-1 block">To Date</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>
        
<div>
  <label className="text-gray-300 text-xs mb-1 block">Due</label>
  <select
    value={filters.due}
    onChange={(e) => setFilters({ ...filters, due: e.target.value })}
    className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
  >
    <option value="all">All Due</option>
    <option value="true">Not Due</option>
    <option value="false">Due</option>
  </select>
</div>

        <div>
          <label className="text-gray-300 text-xs mb-1 block">Method</label>
          <select
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
          >
            <option value="all">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="SCANNER">QR Scanner</option>
            <option value="CRYPTO">Crypto</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1 justify-center text-sm"
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
      
      {(filters.search || filters.from || filters.to || filters.status !== "all" || filters.method !== "all") && (
        <div className="mb-3 text-xs text-gray-400">
          Showing {walletData.length} of {allWalletData.length} transactions
        </div>
      )}

      {/* Table Container */}
      {!loading && (
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
            <table className="min-w-full text-xs border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">User Info</th>
                  <th className="px-4 py-2 text-left font-semibold">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold">Method</th>
                  <th className="px-4 py-2 text-left font-semibold">UTR</th>
                  <th className="px-4 py-2 text-left font-semibold">Due</th>
                  {/* <th className="px-4 py-2 text-left font-semibold">Status</th> */}
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                  <th className="px-4 py-2 text-left font-semibold">Proof</th>
                </tr>
              </thead>
              <tbody>
                {walletData.length > 0 ? (
                  walletData.map((item, index) => (
                    <tr key={item.id} className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200">
                      <td className="px-4 py-2 font-mono text-violet-400 text-xs">{index + 1}</td>
                      <td className="px-4 py-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <FaUser className="text-blue-400 text-xs" />
                            <span className="text-xs">{item.full_name || `User ${item.user_id}`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-green-400 text-xs" />
                            <span className="text-xs text-gray-400">{item.email}</span>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            ID: {item.user_id}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <FaRupeeSign className="text-green-400 text-xs" />
                          <span className="font-bold text-white text-sm">
                            {parseFloat(item.amount).toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getMethodColor(item.method)}`}>
                          <span className="font-medium capitalize text-xs">{item.method}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="font-mono text-gray-400 text-xs" title={item.utr_number}>
                          {item.utr_number || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={item.due ? "true" : "false"}
                          onChange={(e) => handleDueChange(item.id, e.target.value === "true")}
                          className={`bg-[#2a2a2a] border rounded px-2 py-1 text-xs w-full ${
                            item.due 
                              ? "border-green-500 text-green-400"
                              : "border-red-500 text-red-400" 
                          }`}
                        >
                          <option value="false" className="bg-[#1f1f1f]"> Due</option>
                          <option value="true" className="bg-[#1f1f1f]">Not Due</option>
                        </select>
                      </td>
                      {/* <td className="px-4 py-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="font-medium capitalize text-xs">{item.status}</span>
                        </div>
                      </td> */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaCalendar className="text-xs" />
                          <span className="text-xs">
                            {new Date(item.payment_date).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleViewScreenshot(item.id)}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition"
                        >
                          <FaEye size={10} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <FaMoneyBillWave className="text-2xl mb-2 opacity-50" />
                        <p className="text-sm font-medium">No wallet transactions found</p>
                        <p className="text-xs mt-0.5">
                          {(filters.search || filters.from || filters.to || filters.status !== "all" || filters.method !== "all") 
                            ? "Try changing your filter criteria" 
                            : "No wallet transactions yet"}
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
}