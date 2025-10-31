import React, { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaSync, 
  FaFilter, 
  FaUser, 
  FaEnvelope, 
  FaCalendar,
  FaDollarSign,
  FaShoppingCart,
  FaSearch
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PlanPurchases = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filters, setFilters] = useState({ 
    from: "", 
    to: "", 
    plan: "all" 
  });

  const [stats, setStats] = useState({
    total: 0,
    totalRevenue: 0,
    popularPlan: "N/A"
  });

  useEffect(() => {
    fetchPlanPurchases();
  }, []);

  const fetchPlanPurchases = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/admin/plan-purchases`);
      const data = await res.json();
      
      if (data && Array.isArray(data)) {
        setAllPlans(data);
        setPlans(data);
        calculateStats(data);
      } else {
        console.error("Invalid data format:", data);
        setAllPlans([]);
        setPlans([]);
      }
    } catch (err) {
      console.error("Failed to fetch plan purchases:", err);
      setAllPlans([]);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    
    // Calculate total revenue (assuming plan names contain price info)
    const totalRevenue = data.reduce((sum, item) => {
      const price = extractPriceFromPlan(item.plan);
      return sum + price;
    }, 0);

    // Find popular plan
    const planCounts = data.reduce((acc, item) => {
      acc[item.plan] = (acc[item.plan] || 0) + 1;
      return acc;
    }, {});

    const popularPlan = Object.keys(planCounts).reduce((a, b) => 
      planCounts[a] > planCounts[b] ? a : b, "N/A"
    );

    setStats({ total, totalRevenue, popularPlan });
  };

  const extractPriceFromPlan = (planName) => {
    // Extract price from plan name - adjust based on your plan naming convention
    const priceMatch = planName.match(/\$(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  const applyFilters = () => {
    let filtered = [...allPlans];
    
    // Date filters
    if (filters.from) {
      const fromDate = new Date(filters.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(item => {
        const purchaseDate = new Date(item.buy_date);
        purchaseDate.setHours(0, 0, 0, 0);
        return purchaseDate >= fromDate;
      });
    }
    
    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(item => new Date(item.buy_date) <= toDate);
    }
    
    // Plan filter
    if (filters.plan !== "all") {
      filtered = filtered.filter(item => item.plan === filters.plan);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user_id.toString().includes(searchTerm)
      );
    }
    
    setPlans(filtered);
  };

  const clearFilters = () => {
    setFilters({ from: "", to: "", plan: "all" });
    setSearchTerm("");
    setPlans(allPlans);
  };

  const getPlanOptions = () => {
    const plans = [...new Set(allPlans.map(item => item.plan))].sort();
    return plans;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 bg-[#1f1f1f] hover:bg-[#333] text-gray-300 px-3 py-2 rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 text-sm"
          >
            <FaArrowLeft className="text-purple-400 text-xs" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                🧾 Plan Purchases
              </h2>
              <p className="text-gray-400 text-xs">
                Manage and track all plan subscriptions
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
          onClick={fetchPlanPurchases}
          className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-sm"
        >
          <FaSync size={12} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-500/20 rounded">
                <FaShoppingCart className="text-purple-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Purchases</p>
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
                <p className="text-gray-400 text-xs">Total Revenue</p>
                <p className="text-white font-bold text-sm">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-500/20 rounded">
                <FaUser className="text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Popular Plan</p>
                <p className="text-white font-bold text-sm truncate">{stats.popularPlan}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end mb-3">
        <div className="md:col-span-2">
          <label className="text-gray-300 text-xs mb-1 block">Search</label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search by email, plan, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-600 text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-gray-300 text-xs mb-1 block">From Date</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>
        <div>
          <label className="text-gray-300 text-xs mb-1 block">To Date</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1 justify-center text-sm"
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

      {/* Plan Filter */}
      <div className="mb-3">
        <label className="text-gray-300 text-xs mb-1 block">Filter by Plan</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters({ ...filters, plan: "all" })}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              filters.plan === "all" 
                ? "bg-purple-600 text-white" 
                : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
            }`}
          >
            All Plans
          </button>
          {getPlanOptions().map(plan => (
            <button
              key={plan}
              onClick={() => setFilters({ ...filters, plan })}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                filters.plan === plan 
                  ? "bg-purple-600 text-white" 
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      {(filters.from || filters.to || filters.plan !== "all" || searchTerm) && (
        <div className="mb-3 text-xs text-gray-400">
          Showing {plans.length} of {allPlans.length} purchases
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
                  <th className="px-4 py-2 text-left font-semibold">Plan</th>
                  <th className="px-4 py-2 text-left font-semibold">Purchase Date</th>
                </tr>
              </thead>

              <tbody>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="bg-[#1f1f1f] hover:bg-[#333] text-gray-300 transition-all duration-200"
                    >
                      {/* ID */}
                      <td className="px-4 py-2 font-mono text-purple-400 text-xs">
                        {plan.id}
                      </td>

                      {/* User Info */}
                      <td className="px-4 py-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <FaUser className="text-blue-400 text-xs" />
                            <span className="text-xs font-mono">
                              ID: {plan.user_id}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-green-400 text-xs" />
                            <span className="text-xs text-gray-400 truncate max-w-[200px]">
                              {plan.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-2">
                        <span className="font-bold text-violet-400 text-sm">
                          {plan.plan}
                        </span>
                      </td>

                      {/* Purchase Date */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaCalendar className="text-xs" />
                          <span className="text-xs">
                            {new Date(plan.buy_date).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <FaShoppingCart className="text-2xl mb-2 opacity-50" />
                        <p className="text-sm font-medium">No plan purchases found</p>
                        <p className="text-xs mt-0.5">
                          {(filters.from || filters.to || filters.plan !== "all" || searchTerm)
                            ? "Try changing your filter criteria"
                            : "No purchase data available"}
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          <span className="ml-3 text-gray-400">Loading plan purchases...</span>
        </div>
      )}
    </div>
  );
};

export default PlanPurchases;