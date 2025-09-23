// src/pages/UserTable.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserTable = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/admin/all-users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const formatted = data.map((u) => ({
  //         ...u,
  //         dob: u.dob ? new Date(u.dob).toISOString().split("T")[0] : "-",
  //         createdAt: u.created_at
  //           ? new Date(u.created_at).toISOString().split("T")[0]
  //           : "-",
  //         tempStatus: u.status || "all ok",
  //         tempWallet: u.wallet ?? 0,
  //         editingWallet: false,
  //       }));
  //       setUsers(formatted);
  //     })
  //     .catch((err) => console.error("Error fetching users:", err));
  // }, []);

useEffect(() => {
  fetch(`${BASE_URL}/api/admin/all-users`)
    .then((res) => res.json())
    .then((data) => {
      // Backend sends an array, not { success, users }
      const usersArray = Array.isArray(data) ? data : data.users || [];

      const formatted = usersArray.map((u) => ({
        ...u,
        wallet: u.coin ?? 0,
        dob: u.dob ? new Date(u.dob).toISOString().split("T")[0] : "-",
        createdAt: u.created_at
          ? new Date(u.created_at).toISOString().split("T")[0]
          : "-",
        tempStatus: u.status || "all ok",
        editingWallet: false,
      }));

      setUsers(formatted);
    })
    .catch((err) => console.error("Error fetching users:", err));
}, []);





  // Confirm status change
const confirmStatusChange = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) return;

  // fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: user.tempStatus }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success && data.user) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id ? { ...u, ...data.user, tempStatus: data.user.status } : u
          )
        );
      }
    })
    .catch((err) => console.error("Error updating status:", err));
};



  // Temp status change
  const handleTempStatusChange = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, tempStatus: newStatus } : u))
    );
  };

  

  // Delete user
  const handleDelete = (id) => {
    if (
      !window.confirm("Are you sure you want to delete this user permanently?")
    ) {
      return;
    }

    // fetch(`http://localhost:5000/api/admin/users/${id}`, {
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
          -ms-overflow-style: none;  /* IE/Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }
      `}
    </style>

      {/* Scrollable Table */}
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
              <th className="px-6 py-3 text-left">VIP</th>
              <th className="px-6 py-3 text-left">Wallet</th>
              <th className="px-6 py-3 text-left">Business</th>
              <th className="px-6 py-3 text-left">Ref Code</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Pause/Block Date</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="16"
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
                  <td className="px-6 py-4">{u.vip ? `VIP ${u.vip}` : "None"}</td>
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
        // fetch(`http://localhost:5000/api/admin/users/${u.id}/wallet`, {
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
                  <td className="px-6 py-4">{u.reference_code}</td>
                  <td className="px-6 py-4 text-nowrap">{u.createdAt}</td>

                  {/* Status with dropdown + ✅ */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={u.tempStatus}
                        onChange={(e) =>
                          handleTempStatusChange(u.id, e.target.value)
                        }
                        className="bg-[#1f1f1f] text-white p-1 rounded"
                      >
                        <option value="all ok">All Ok</option>
                        <option value="pause">Pause</option>
                        <option value="block">Block</option>
                      </select>
                      <button
                        onClick={() => confirmStatusChange(u.id)}
                        className="text-green-400 cursor-pointer hover:text-green-600"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </td>

                  {/* Pause / Block date */}
                  <td className="px-6 py-4">
                   {u.tempStatus === "pause"
  ? u.pause_start
    ? new Date(u.pause_start).toLocaleDateString()
    : "-"
  : u.tempStatus === "block"
  ? u.block_date
    ? new Date(u.block_date).toLocaleDateString()
    : "-"
  : "-"}

                  </td>

                  {/* Delete button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
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
