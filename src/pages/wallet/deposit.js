import React, { useState } from "react";
import Footer from '../../components/Footer';
const Deposit = () => {
  const [email] = useState("6714982104@telegram.org");
  const [amount, setAmount] = useState("");
  const [balance] = useState("0");
  const [selectedAsset] = useState("USDT");

  const handleMaxClick = () => {
    setAmount(balance);
  };

  const handleConnectWallet = () => {
    alert("Wallet Connected!");
  };

  return (
    <div className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">ATHENE</h1>
        <button className="bg-teal-500 px-6 py-2 rounded-lg text-black font-bold">
          Connect Wallet
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-semibold text-center">
          Welcome to <span className="text-violet-400">Athene Network</span>
        </h2>
        <p className="text-teal-300 text-center mt-2">
          Please connect your wallet to deposit assets into the Athene Network App.
        </p>

        {/* Deposit Form */}
        <div className="mt-6">
          <label className="text-teal-400 text-sm">Enter Athene account (your email) here</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full mt-1 p-2 border border-gray-600 rounded-md text-white" style={{ background: "#000" }}
          />

          <p className="text-yellow-400 text-sm mt-2">
            Please check and make sure the account is registered on the Athene Network app!
          </p>

          {/* Asset Selection */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-300">Asset to deposit</span>
            <button className="bg-teal-500 px-4 py-2 rounded-md flex items-center">
              <img src="../assets/img/usdt.png" alt="USDT" className="w-5 h-5 mr-2" />
              {selectedAsset} <span className="ml-2">&gt;</span>
            </button>
          </div>

          {/* Balance */}
          <p className="text-gray-400 text-sm mt-2">Available balance: {balance}</p>

          {/* Amount Input */}
          <div className="mt-2 flex items-center border border-gray-600 rounded-md overflow-hidden">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-2  text-white" style={{ background: "#000" }}
            />
            <button onClick={handleMaxClick} className="bg-teal-500 px-4 py-2 text-black font-semibold">
              MAX
            </button>
          </div>

          {/* Connect Wallet Button */}
          <button
            onClick={handleConnectWallet}
            className="w-full mt-4 bg-teal-500 text-black font-semibold py-3 rounded-md"
          >
            Connect Wallet
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Deposit;
