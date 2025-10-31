// src/pages/UserTable.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaAward, FaGem, FaCrown, FaStar, FaMedal } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserTable = () => {

  const [users, setUsers] = useState([]);

 useEffect(() => {
  const saved = localStorage.getItem("users");
  if (saved) {
    setUsers(JSON.parse(saved));
  }

  fetch(`${BASE_URL}/api/users/all-users`)
    .then((res) => res.json())
    .then((data) => {
      const usersArray = Array.isArray(data) ? data : data.users || [];
      const formatted = usersArray.map((u) => ({
        ...u,
        wallet: u.coin ?? 0,
        dob: u.dob ? new Date(u.dob).toISOString().split("T")[0] : "-",
        createdAt: u.created_at
          ? new Date(u.created_at).toISOString().split("T")[0]
          : "-",
        pause_start: u.pause_start || null,
        block_date: u.block_date || null,
        tempStatus: u.status || "ok",
        trust: Boolean(u.trust),
        editingWallet: false,
      }));

      setUsers(formatted);
      localStorage.setItem("users", JSON.stringify(formatted)); // ✅ update cache
    })
    .catch((err) => console.error("Error fetching users:", err));
}, []);

 
const isPauseExpired = (pauseStartDate) => {
  const pauseStart = new Date(pauseStartDate);
  const now = new Date();
  const diffTime = Math.abs(now - pauseStart);
  const diffMinutes = Math.floor(diffTime / (1000 * 60)); // difference in minutes
  return diffMinutes >= 5; // expire after 5 min
};


  // Auto-update expired pause to "ok"
 const autoUpdatePauseToAllOk = (id) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "ok" }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success && data.user) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id ? { ...u, ...data.user, tempStatus: "ok" } : u
          )
        );
      }
    })
    .catch((err) => console.error("Error auto-updating status:", err));
};

// Temporary trust state (similar to tempStatus)
const handleTempTrustChange = (id, newValue) => {
  setUsers((prev) =>
    prev.map((u) =>
      u.id === id ? { ...u, tempTrust: newValue } : u
    )
  );
};

const confirmTrustChange = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return;

  // Use tempTrust if set, otherwise keep current trust
  const newTrust = user.tempTrust !== undefined ? user.tempTrust : user.trust;

  // fetch(`${BASE_URL}/api/admin/users/${id}/trust`, {
    fetch(`${BASE_URL}/api/users/${id}/trust`, {

    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trust: newTrust }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id ? { ...u, trust: newTrust, tempTrust: undefined } : u
          )
        );
        alert(`Trust status updated: ${newTrust ? "✅ True" : "❌ False"}`);
      } else {
        alert("Failed to update trust status");
      }
    })
    .catch((err) => {
      console.error("Error updating trust:", err);
      alert("Error updating trust status");
    });
};


// Confirm status change
const confirmStatusChange = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return;

  let finalStatus = user.tempStatus;

  const updateData = { status: finalStatus };

  if (finalStatus === "pause") {
    updateData.pause_start = new Date().toISOString();
    updateData.block_date = null;
  } else if (finalStatus === "block") {
    updateData.block_date = new Date().toISOString();
    updateData.pause_start = null;
  } else if (finalStatus === "ok") {
    updateData.pause_start = null;
    updateData.block_date = null;
  }

  console.log("Sending status update:", updateData); // Debug log

  fetch(`${BASE_URL}/api/admin/users/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Status API Response:", data); // Debug log
      if (data.success && data.user) {

        setUsers((prev) => {
  const updated = prev.map((u) =>
    u.id === id
      ? {
          ...u,
          ...data.user,
          tempStatus: data.user.status,
          pause_start: data.user.pause_start || null,
          block_date: data.user.block_date || null,
        }
      : u
  );
  localStorage.setItem("users", JSON.stringify(updated)); // ✅ persist
  return updated;
});

        alert("Status changed ✅");
      } else {
        alert("Status changed ✅");
      }
    })
    .catch((err) => {
      console.error("Error updating status:", err);
      alert("Error updating status");
    });
};



  // Temp status change
  const handleTempStatusChange = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, tempStatus: newStatus } : u))
    );
  };

 

  // Delete user
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user permanently?")) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else {
          console.error("Error deleting user");
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

const getStatusDate = (user) => {
  let pauseDate = user.pause_start ? new Date(user.pause_start).toLocaleDateString() : "-";
  let blockDate = user.block_date ? new Date(user.block_date).toLocaleDateString() : "-";

  // If status is being changed right now, show today's date
  if (user.tempStatus !== user.status) {
    if (user.tempStatus === "pause") pauseDate = new Date().toLocaleDateString();
    if (user.tempStatus === "block") blockDate = new Date().toLocaleDateString();
  }

  return { pauseDate, blockDate };
};


  return (
    <div
      className="max-w-[78vw] h-[80vh] mx-0 bg-[#1f1f1f] rounded-xl shadow-lg p-6 scrollbar-hide"
      style={{ overflow: "auto" }}
    >
      <h2 className="text-xl font-bold mb-6 text-white flex-shrink-0">
        User List
      </h2>

      <style>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .trust-icon {
          cursor: pointer;
          transition: opacity 0.3s ease;
          font-size: 16px;
        }
        .trust-icon.active {
          opacity: 1;
        }
        .trust-icon.inactive {
          opacity: 0.3;
        }
      `}
      </style>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <table className="min-w-full text-sm border-separate border-spacing-y-2 table-fixed">
          <thead className="sticky top-0 bg-[#2a2a2a] text-gray-300 z-10 rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">DOB</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Gender</th>
              <th className="px-6 py-3 text-left">Verified</th>
              <th className="px-6 py-3 text-left">Wallet</th>
              <th className="px-6 py-3 text-left">Business Plan</th>
              <th className="px-6 py-3 text-left">Gold1 Count</th> 
              {/* <th className="px-6 py-3 text-left">Payment Status</th> */}
              <th className="px-6 py-3 text-left">Day Count</th>
              <th className="px-6 py-3 text-left">Trust</th>
              <th className="px-6 py-3 text-left">Under Ref</th>
              <th className="px-6 py-3 text-left">Ref Count</th>
              <th className="px-6 py-3 text-left">Ref Code</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Pause/Block Date</th>
              {/* <th className="px-6 py-3 text-left">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="21"
                  className="p-6 text-center text-gray-400 bg-[#2a2a2a] rounded-lg"
                >
                  No data available
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="bg-[#292828] hover:bg-[#333] text-gray-200 rounded-lg"
                >
                  <td className="px-6 py-4">{u.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    {u.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 text-nowrap">{u.dob}</td>
                  <td className="px-6 py-4">{u.country_code}</td>
                  <td className="px-6 py-4">{u.phone_number}</td>
                  <td className="px-6 py-4">{u.gender || "-"}</td>
                  <td className="px-6 py-4">{u.verified ? "✅" : "❌"}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {u.editingWallet ? (
                      <input
                        type="number"
                        value={u.wallet}
                        onChange={(e) =>
                          setUsers((prev) =>
                            prev.map((user) =>
                              user.id === u.id ? { ...user, wallet: e.target.value } : user
                            )
                          )
                        }
                        onBlur={() => {
                          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${u.id}/wallet`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ coin: parseFloat(u.wallet) }),
                          })
                            .then((res) => res.json())
                            .then(() => {
                              setUsers((prev) =>
                                prev.map((user) =>
                                  user.id === u.id ? { ...user, editingWallet: false } : user
                                )
                              );
                            });
                        }}
                        className="bg-[#1f1f1f] text-white p-1 rounded w-20"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span>${u.wallet ? Number(u.wallet).toFixed(2) : "0.00"}</span>
                        <FaEdit
                          className="text-gray-400 cursor-pointer hover:text-white"
                          onClick={() =>
                            setUsers((prev) =>
                              prev.map((user) =>
                                user.id === u.id ? { ...user, editingWallet: true } : user
                              )
                            )
                          }
                        />
                      </>
                    )}
                  </td>

                  <td className="px-6 py-4">{u.business_plan || "-"}</td>
{/* <td className="p-3">{user.gold1_count}</td> */}
<td className="p-3">{u.gold1_count}</td>

                  {/* <td className="px-6 py-4">{u.payment_status ? "✅" : "❌"}</td> */}

 {/* <td className="px-6 py-4">
   {u.payment_status ? (
     <button
       className="bg-green-500 text-white px-3 py-1 rounded cursor-not-allowed"
       disabled
     >
       Approved
     </button>
   ) : (
     <button
       className="bg-blue-500 text-white px-3 cursor-pointer py-1 rounded hover:bg-blue-600"
       onClick={async () => {
         try {
           const res = await fetch(
             `${BASE_URL}/api/users/${u.id}/payment-status`,
             {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
             }
           );
           const data = await res.json();

           if (data.success) {
             setUsers((prev) =>
               prev.map((user) =>
                 user.id === u.id ? { ...user, payment_status: true } : user
               )
             );
             alert("Payment approved ✅");
           } else {
             alert(data.message || "Failed to approve payment");
           }
         } catch (err) {
           console.error("Error approving payment:", err);
           alert("Server error");
         }
       }}
     >
       Approve
     </button>
   )}
</td> */}

                  <td className="px-6 py-4">{u.day_count ?? "-"}</td>
                  
               {/* Trust Column - FIXED */}
<td className="px-6 py-4 flex items-center gap-2">
  <select
    value={u.tempTrust !== undefined ? (u.tempTrust ? "true" : "false") : (u.trust ? "true" : "false")}
    onChange={(e) => handleTempTrustChange(u.id, e.target.value === "true")}
    className="border rounded p-1"
  >
    <option className="text-black font-bold" value="true">True</option>
    <option className="text-black font-bold" value="false">False</option>
  </select>
  <button
    onClick={() => confirmTrustChange(u.id)}
    className="text-green-400 cursor-pointer hover:text-green-600"
    title="Save trust changes"
  >
    <FaCheck />
  </button>
</td>



                  <td className="px-6 py-4">{u.under_ref || "-"}</td>
                  <td className="px-6 py-4">{u.reference_count ?? 0}</td>
                  <td className="px-6 py-4">{u.reference_code || "-"}</td>
                  <td className="px-6 py-4 text-nowrap">{u.createdAt}</td>

                 {/* Status Column */}
<td className="px-6 py-4 flex items-center gap-2">
  <select
    value={u.tempStatus ?? u.status}
    onChange={(e) => handleTempStatusChange(u.id, e.target.value)}
    className="border rounded p-1 "
  >
    <option className="text-black font-bold" value="ok">Ok</option>
    <option className="text-black font-bold" value="pause">Pause</option>
    <option className="text-black font-bold" value="block">Block</option>
  </select>
  <button
    onClick={() => confirmStatusChange(u.id)}
    className="text-green-400 cursor-pointer hover:text-green-600"
    title="Save status changes"
  >
    <FaCheck />
  </button>
</td>
<td className="px-6 py-4">
  <div>
    <span className="block">Pause: {getStatusDate(u).pauseDate}</span>
    <span className="block">Block: {getStatusDate(u).blockDate}</span>

    {u.tempStatus === "pause" && u.pause_start && isPauseExpired(u.pause_start) && (
      <span className="text-yellow-400 text-xs block">(Expired)</span>
    )}
  </div>
</td>

                  {/* Delete button */}
                  {/* <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;