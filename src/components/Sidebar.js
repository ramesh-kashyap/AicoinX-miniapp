import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-[#0d1b18] p-6 min-h-screen">
      <ul className="space-y-4">
        <li><Link className="block p-3 bg-gray-700 rounded" to="/">Home</Link></li>
        <li><Link className="block p-3 bg-gray-700 rounded" to="/wallet">Wallet</Link></li>
        <li><Link className="block p-3 bg-gray-700 rounded" to="/send">Send</Link></li>
        <li><Link className="block p-3 bg-gray-700 rounded" to="/receive">Receive</Link></li>
        <li><Link className="block p-3 bg-gray-700 rounded" to="/history">History</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
