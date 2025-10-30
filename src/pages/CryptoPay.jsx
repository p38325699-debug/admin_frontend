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
  FaDollarSign,
  FaLink,
  FaEthereum
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CryptoPaymentsPage() {
  const navigate = useNavigate();
  const [paymentsData, setPaymentsData] = useState([]);
  const [allPaymentsData, setAllPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    search: "",
    from: "", 
    to: "", 
    status: "all",
    currency: "all",
    network: "all"
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    failed: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      console.log("Fetching payments from:", `${API_BASE_URL}/api/admin/all-payments`);
      
      // const res = await axios.get(`${API_BASE_URL}/api/admin/all-payments`);
      const res = await axios.get(`${API_BASE_URL}/api/admin/all-payments`);
      console.log("API Response:", res.data);
      
      if (res.data.success) {
        // Use res.data.payments instead of res.data.data
        const payments = res.data.payments || [];
        setAllPaymentsData(payments);
        setPaymentsData(payments);
        calculateStats(payments);
      } else {
        console.error("API returned success: false");
        setAllPaymentsData([]);
        setPaymentsData([]);
      }
    } catch (err) {
      console.error("Error fetching payments data:", err);
      Swal.fire("Error", "Unable to load payments data", "error");
      setAllPaymentsData([]);
      setPaymentsData([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data passed to calculateStats:", data);
      setStats({ total: 0, pending: 0, confirmed: 0, failed: 0, totalAmount: 0 });
      return;
    }

    const total = data.length;
    const pending = data.filter(item => item.payment_status === 'pending').length;
    const confirmed = data.filter(item => item.payment_status === 'confirmed').length;
    const failed = data.filter(item => item.payment_status === 'failed').length;
    const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    setStats({ total, pending, confirmed, failed, totalAmount });
  };

  const applyFilters = () => {
    let filtered = [...allPaymentsData];
    
    // Search filter
    if (filters.search) {
      filtered = filtered.filter(item => 
        item.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.order_id?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.tx_hash?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Date filters
    if (filters.from) {
      const fromDate = new Date(filters.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(item => {
        const paymentDate = new Date(item.created_at);
        paymentDate.setHours(0, 0, 0, 0);
        return paymentDate >= fromDate;
      });
    }
    
    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(item => new Date(item.created_at) <= toDate);
    }
    
    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(item => item.payment_status === filters.status);
    }

    // Currency filter
    if (filters.currency !== "all") {
      filtered = filtered.filter(item => item.currency === filters.currency);
    }

    // Network filter
    if (filters.network !== "all") {
      filtered = filtered.filter(item => item.network === filters.network);
    }
    
    setPaymentsData(filtered);
    calculateStats(filtered);
  };

  const clearFilters = () => {
    setFilters({ search: "", from: "", to: "", status: "all", currency: "all", network: "all" });
    setPaymentsData(allPaymentsData);
    calculateStats(allPaymentsData);
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    try {
      // const res = await axios.put(`${API_BASE_URL}/api/admin/payments/${id}/status`, {
      //   payment_status: newStatus
      // });

      const update = await axios.put(`${API_BASE_URL}/api/admin/payments/${id}/status`, { 
        payment_status: newStatus
       });

      if (res.data.success) {
        Swal.fire("Updated!", "Payment status updated successfully.", "success");
        const updatedData = paymentsData.map(item =>
          item.id === id ? { ...item, payment_status: newStatus } : item
        );
        const updatedAllData = allPaymentsData.map(item =>
          item.id === id ? { ...item, payment_status: newStatus } : item
        );
        
        setPaymentsData(updatedData);
        setAllPaymentsData(updatedAllData);
        calculateStats(updatedAllData);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Error", "Failed to update payment status", "error");
    }
  };

  const handleViewPaymentUrl = (url) => {
    if (url) {
      Swal.fire({
        title: "Payment URL",
        html: `<a href="${url}" target="_blank" class="text-blue-400 underline">${url}</a>`,
        width: 600,
        showCloseButton: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: 'white'
      });
    } else {
      Swal.fire("Info", "No payment URL available", "info");
    }
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      text: "Text copied to clipboard",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: '#1f2937',
      color: 'white'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-green-400 text-xs" />;
      case "pending":
        return <FaClock className="text-yellow-400 text-xs" />;
      case "failed":
        return <FaTimesCircle className="text-red-400 text-xs" />;
      default:
        return <FaClock className="text-gray-400 text-xs" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getNetworkColor = (network) => {
    switch (network) {
      case "TRON":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "BSC":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "POLYGON":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "ETH":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "AVALANCHE":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCurrencyColor = (currency) => {
    switch (currency) {
      case "USDT":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "ETH":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "BTC":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 shadow-xl flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
          <p className="text-gray-400 mt-2 text-sm">Loading payments data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 max-w-[62em] border border-gray-800 shadow-xl">
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
                💎 Crypto Payments
              </h2>
              <p className="text-gray-400 text-xs">
                Manage cryptocurrency payment transactions
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
          onClick={fetchPaymentsData}
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
                <FaDollarSign className="text-violet-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Amount</p>
                <p className="text-white font-bold text-sm">${stats.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-yellow-500/20 rounded">
                <FaClock className="text-yellow-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Pending</p>
                <p className="text-white font-bold text-sm">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-500/20 rounded">
                <FaCheck className="text-green-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Confirmed</p>
                <p className="text-white font-bold text-sm">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-500/20 rounded">
                <FaTimes className="text-red-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Failed</p>
                <p className="text-white font-bold text-sm">{stats.failed}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-500/20 rounded">
                <FaEthereum className="text-blue-400 text-sm" />
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
              placeholder="Name, email, Order ID, TX Hash..."
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
          <label className="text-gray-300 text-xs mb-1 block">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 text-xs mb-1 block">Network</label>
          <select
            value={filters.network}
            onChange={(e) => setFilters({ ...filters, network: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-violet-500 text-sm"
          >
            <option value="all">All Networks</option>
            <option value="TRON">TRON</option>
            <option value="BSC">BSC</option>
            <option value="POLYGON">POLYGON</option>
            <option value="ETH">ETH</option>
            <option value="AVALANCHE">AVALANCHE</option>
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
      
      {(filters.search || filters.from || filters.to || filters.status !== "all" || filters.network !== "all") && (
        <div className="mb-3 text-xs text-gray-400">
          Showing {paymentsData.length} of {allPaymentsData.length} transactions
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
                  <th className="px-4 py-2 text-left font-semibold">Currency</th>
                  <th className="px-4 py-2 text-left font-semibold">Network</th>
                  <th className="px-4 py-2 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-2 text-left font-semibold">TX Hash</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentsData.length > 0 ? (
                  paymentsData.map((item, index) => (
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
                          <FaDollarSign className="text-green-400 text-xs" />
                          <span className="font-bold text-white text-sm">
                            {parseFloat(item.amount).toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getCurrencyColor(item.currency)}`}>
                          <span className="font-medium text-xs">{item.currency}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getNetworkColor(item.network)}`}>
                          <span className="font-medium text-xs">{item.network}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div 
                          className="font-mono text-gray-400 text-xs cursor-pointer hover:text-blue-400 transition"
                          onClick={() => copyToClipboard(item.order_id)}
                          title="Click to copy"
                        >
                          {item.order_id?.substring(0, 8)}...
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {item.tx_hash ? (
                          <div 
                            className="font-mono text-gray-400 text-xs cursor-pointer hover:text-blue-400 transition"
                            onClick={() => copyToClipboard(item.tx_hash)}
                            title="Click to copy"
                          >
                            {item.tx_hash.substring(0, 10)}...
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">-</span>
                        )}
                      </td>
                     <td className="px-4 py-2">
  <span
    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
      item.payment_status === "confirmed"
        ? "bg-green-500/10 text-green-400 border border-green-500/50"
        : item.payment_status === "pending"
        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/50"
        : "bg-red-500/10 text-red-400 border border-red-500/50"
    }`}
  >
    {item.payment_status.charAt(0).toUpperCase() + item.payment_status.slice(1)}
  </span>
</td>

                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaCalendar className="text-xs" />
                          <span className="text-xs">
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleViewPaymentUrl(item.payment_url)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition"
                            title="View Payment URL"
                          >
                            <FaLink size={10} />
                          </button>
                          <button
                            onClick={() => copyToClipboard(item.tx_hash || item.order_id)}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition"
                            title="Copy TX Hash/Order ID"
                          >
                            <FaEye size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <FaEthereum className="text-2xl mb-2 opacity-50" />
                        <p className="text-sm font-medium">No crypto payments found</p>
                        <p className="text-xs mt-0.5">
                          {(filters.search || filters.from || filters.to || filters.status !== "all" || filters.network !== "all") 
                            ? "Try changing your filter criteria" 
                            : "No crypto payments yet"}
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