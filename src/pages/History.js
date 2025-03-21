import React from "react";
import { ArrowLeft, Calendar, FileText, Check } from "lucide-react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const HistoryPage = () => {
  return (
    <div className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between py-4">
         <Link to="/wallet" className="flex flex-col items-center "> 
        <button className="bg-[#121212] p-3 rounded-lg bg-teal-500">

          <ArrowLeft className="text-teal-400 w-6 h-6" />
        </button>
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-widest text-center flex-1">HISTORY</h1>
      </div>
      
      {/* Transactions List */}
      <div className="w-full max-w-md mt-6">
      <div className="flex justify-between items-center p-4 bg-[#121212] rounded-lg border border-gray-700 mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#181818] p-3 rounded-lg">
              <Calendar className="text-teal-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-semibold">Attendance rewards</p>
              <p className="text-gray-400 text-sm">15:11 01/02/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-teal-400 font-bold">+100</p>
            <p className="text-gray-400 text-sm">GEM</p>
            <Check className="text-teal-400 w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-[#121212] rounded-lg border border-gray-700 mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#181818] p-3 rounded-lg">
              <FileText className="text-teal-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-semibold">Sign-up bonus</p>
              <p className="text-gray-400 text-sm">13:10 31/01/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-teal-400 font-bold">+5,000,000</p>
            <p className="text-gray-400 text-sm">GEM</p>
            <Check className="text-teal-400 w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
