import React, { useState } from "react";

const Send = () => {
  const [activeTab, setActiveTab] = useState("connect");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-8 text-white relative font-sans"
      style={{
        background:
          "linear-gradient(180deg, rgba(38, 28, 66, 1) 0%, rgba(14, 10, 32, 1) 100%)",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md flex justify-between rounded-xl bg-gray-800 p-1 shadow-lg">
        <button
          className={`w-1/2 text-center py-2 rounded-xl font-bold text-lg transition-all ${
            activeTab === "signup" ? "bg-transparent text-gray-400" : "bg-gray-900 text-white"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={`w-1/2 text-center py-2 rounded-xl font-bold text-lg transition-all ${
            activeTab === "connect" ? "bg-purple-600 text-white" : "bg-transparent text-gray-400"
          }`}
          onClick={() => setActiveTab("connect")}
        >
          Connect Account
        </button>
      </div>

      <div className="text-center mt-8 px-4">
        <h1 className="text-2xl font-bold">Use the Email Linked to Your AiCoinX Account</h1>
      </div>

      <div className="mt-8">
        <img src="/images/email-connect.png" alt="Email Connect" className="w-40 h-40" />
      </div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl flex items-center px-4 py-3 mt-8 shadow-lg">
        <span className="text-purple-400 text-lg">📧</span>
        <input
          type="email"
          placeholder="Enter Your AiCoinX E-mail Here"
          className="w-full bg-transparent text-white text-lg px-3 focus:outline-none"
        />
      </div>

      <button
        className="w-full max-w-md bg-purple-600 text-white text-lg font-bold py-4 rounded-lg mt-8 shadow-xl"
        onClick={() => setIsModalOpen(true)}
      >
        Log In
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center relative">
            <button className="absolute top-4 right-4 text-gray-400 text-xl" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
            <div className="flex justify-center mb-4">
              <img src="/images/account-connected.png" alt="Account Connected" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold">Account Connected</h2>
            <p className="text-gray-400 mt-2">Click below to be redirected to your AiCoinX app</p>
            <button
              className="w-full bg-purple-600 text-white text-lg font-bold py-3 rounded-lg mt-6 shadow-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
