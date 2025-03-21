import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // Track the current route

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
    <br></br>
      <div className="fixed bottom-0 w-full max-w-md bg-[#1C1A3A] p-2 flex justify-around border-t border-gray-700 mt-6 rounded-t-xl">
        <Link
          to="/friends"
          className={`flex flex-col px-2 items-center ${
            isActive("/friends") ? "border border-gray-500 shadow-lg rounded-lg bg-[#7660FF30]" : ""
          }`}
        >
          <img src="../assets/click20.svg" alt="Ref" className="w-7 h-6" style={{height:30}}/>
          <p className="text-xs">Ref</p>
        </Link>
        <Link
          to="/"
          className={`flex flex-col items-center ${
            isActive("/") ? "border border-gray-500 shadow-lg rounded-lg bg-[#7660FF30]" : ""
          }`}
        >
          <img src="../assets/click23.svg" alt="Task" className="w-7 h-6" style={{height:30}}/>
          <p className="text-xs">Task</p>
        </Link>
        <Link
          to="/mining"
          className={`flex flex-col px-2 items-center ${
            isActive("/mining") ? "border border-gray-500 shadow-lg rounded-lg bg-[#7660FF30]" : ""
          }`}
        >
          <img src="../assets/klink24.svg" alt="Tap" className="w-7 h-6" style={{height:30}}/>
          <p className="text-xs">Tap</p>
        </Link>
        <Link
          to="/dailyboost"
          className={`flex flex-col px-2 items-center ${
            isActive("/dailyboost") ? "border border-gray-500 shadow-lg rounded-lg bg-[#7660FF30]" : ""
          }`}
        >
          <img src="../assets/klink21.svg" alt="Airdrop" className="w-7 h-6" style={{height:30}}/>
          <p className="text-xs">Airdrop</p>
        </Link>
        <Link
          to="/activity"
          className={`flex flex-col px-2 items-center ${
            isActive("/activity") ? "border border-gray-500 shadow-lg rounded-lg bg-[#7660FF30]" : ""
          }`}
        >
          <img src="../assets/klink22.svg" alt="Stats" className="w-7 h-6" style={{height:30}}/>
          <p className="text-xs">Stats</p>
        </Link>
      </div>
    </>
  );
};

export default Footer;
