// client/src/pages/UPIScanner.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccountBalanceWallet as WalletIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from "@mui/icons-material";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const UPIScanner = () => {
  const [upiData, setUpiData] = useState({
    upiId: "",
    qrCode: "",
    isEditing: false,
    tempUpiId: "",
    tempQrCode: "",
  });

// 👇 move this OUTSIDE useEffect
const fetchData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/get-upi`);
    const data = await res.json();
    setUpiData({
      upiId: data.upiId || "",
      qrCode: data.qrCode || null,
      tempUpiId: data.upiId || "",
      tempQrCode: data.qrCode || null,
      isEditing: false,
    });
  } catch (err) {
    console.error("Error fetching UPI data:", err);
  }
};

// 👇 only call it here
useEffect(() => {
  fetchData();
}, []);


  const handleEdit = () =>
    setUpiData((p) => ({
      ...p,
      isEditing: true,
      tempUpiId: p.upiId,
      tempQrCode: p.qrCode,
    }));

  const handleCancel = () =>
    setUpiData((p) => ({
      ...p,
      isEditing: false,
      tempUpiId: "",
      tempQrCode: "",
    }));

 const handleSave = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/update-upi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upiId: upiData.tempUpiId,
        qrCode: upiData.tempQrCode,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ UPI details updated successfully!");
      fetchData();
    } else {
      alert("⚠️ " + data.message);
    }
  } catch (err) {
    console.error("Error saving UPI data:", err);
  }
};


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setUpiData((p) => ({ ...p, tempQrCode: reader.result }));
    reader.readAsDataURL(file);
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-y-auto">
    {/* Content wrapper */}
    <div className="flex flex-col items-center py-10 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-3xl">
        <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-lg p-6 transition-all duration-300 hover:shadow-green-500/10 hover:border-green-500/40">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <WalletIcon className="text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">UPI Payment</h2>
                <p className="text-sm text-gray-400">
                  Manage your UPI ID and QR Code
                </p>
              </div>
            </div>

            {!upiData.isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/40 text-green-400 text-sm font-medium transition-all"
              >
                <EditIcon fontSize="small" /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-all text-sm font-medium"
                >
                  <SaveIcon fontSize="small" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-sm font-medium"
                >
                  <CancelIcon fontSize="small" /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* UPI ID */}
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2 font-medium">
              UPI ID
            </label>
            {!upiData.isEditing ? (
              <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                <p
                  className={
                    upiData.upiId
                      ? "text-white font-medium"
                      : "text-gray-500 italic"
                  }
                >
                  {upiData.upiId || "No UPI ID set"}
                </p>
              </div>
            ) : (
              <input
                type="text"
                value={upiData.tempUpiId}
                onChange={(e) =>
                  setUpiData((p) => ({ ...p, tempUpiId: e.target.value }))
                }
                placeholder="e.g. user@oksbi"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
          </div>

          {/* QR Code */}
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">
              QR Code
            </label>
            {!upiData.isEditing ? (
              <div className="aspect-square max-w-xs mx-auto bg-gray-800/40 border border-gray-700 rounded-2xl flex items-center justify-center relative">
                {upiData.qrCode ? (
                  <img
                    src={upiData.qrCode}
                    alt="UPI QR"
                    className="w-full h-full object-contain rounded-xl p-4 transition-all hover:scale-105 duration-300"
                  />
                ) : (
                  <div className="text-center text-gray-500 p-6">
                    <QrCodeScannerIcon className="text-4xl opacity-50 mb-2 mx-auto" />
                    <p>No QR Code Found</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-center">
                {upiData.tempQrCode && (
                  <img
                    src={upiData.tempQrCode}
                    alt="Preview"
                    className="mx-auto w-56 rounded-xl border border-green-600/40 shadow-green-400/20 shadow-md"
                  />
                )}
                <label className="inline-flex flex-col items-center justify-center cursor-pointer w-full max-w-xs mx-auto py-6 px-4 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all">
                  <QrCodeScannerIcon className="text-3xl mb-2 text-gray-400" />
                  <span className="text-sm font-medium text-green-400">
                    Click to Upload QR
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WEBP
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                {upiData.tempQrCode && (
                  <p className="text-green-400 text-sm font-medium">
                    ✓ QR ready to save
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default UPIScanner;
