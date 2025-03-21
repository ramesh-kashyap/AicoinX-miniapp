import React, { useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import {useNavigate} from "react-router-dom";
import Footer from '../components/Footer';
const ReferralList = () => {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState("direct");
  const [activeTab, setActiveTab] = useState("community");
  const tasks = [
    { id: 1, name: "Register AiCoinX Account", reward: "500,000", icon: "/images/klink.png" },
    { id: 2, name: "Learn More About AiCoinX", reward: "10,000", icon: "/images/youtube.png" },
  ];

  const communityTasks = [
    { id: 3, name: "Join TG Community", reward: "10,000", icon: "/images/telegram.png" },
    { id: 4, name: "Join AiCoinX TG Chat", reward: "10,000", icon: "/images/telegram-blue.png" },
    { id: 5, name: "Join AiCoinX on X", reward: "10,000", icon: "/images/x.png" },
    { id: 6, name: "Complete AiCoinX tasks on Zealy", reward: "10,000", icon: "/images/zealy.png" },
    { id: 7, name: "Join AiCoinX on Discord", reward: "10,000", icon: "/images/discord.png" },
  ];
  return (
    <div 
      className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative"
      style={{
        background: "linear-gradient(144deg,#9c78ed -2.15%,rgba(156,120,237,0) 93.61%)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Register AiCoinX Account</h1>
        <div className="relative">
          <Bell className="text-white w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></span>
        </div>
      </div>
      
      <div className="w-full max-w-md space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-[#1C1A3A] p-4 rounded-xl flex items-center justify-between border border-gray-700">
            <div className="flex items-center gap-3">
              <img src={task.icon} alt={task.name} className="w-12 h-12" />
              <div>
                <p className="text-white font-bold">{task.name}</p>
                <p className="text-gray-400 text-sm">{task.reward}</p>
              </div>
            </div>
            <button className="bg-[#3A2F50] text-gray-300 px-4 py-2 rounded-lg">Start</button>
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-md flex justify-between mt-6 border-b border-gray-700 pb-2 text-gray-400">
        <button className={`relative text-white font-bold pb-2 ${activeTab === "community" ? "border-b-2 border-purple-400" : ""}`} onClick={() => setActiveTab("community")}>Join Community <span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">9</span></button>
        <button className="text-gray-500">Social Tasks <span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">12</span></button>
        <button className="text-gray-500">Partners <span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">2</span></button>
      </div>
      
      {activeTab === "community" && (
        <div className="w-full max-w-md space-y-4 mt-4">
          {communityTasks.map(task => (
            <div key={task.id} className="bg-[#1C1A3A] p-4 rounded-xl flex items-center justify-between border border-gray-700">
              <div className="flex items-center gap-3">
                <img src={task.icon} alt={task.name} className="w-12 h-12" />
                <div>
                  <p className="text-white font-bold">{task.name}</p>
                  <p className="text-gray-400 text-sm">{task.reward}</p>
                </div>
              </div>
              <button className="bg-[#3A2F50] text-gray-300 px-4 py-2 rounded-lg">Start</button>
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ReferralList;
