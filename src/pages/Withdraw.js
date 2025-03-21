import React, { useState, useEffect } from "react";
import { ArrowLeft, QrCode } from "lucide-react";
import Footer from '../components/Footer';

const WithdrawPage = () => {
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState("Binance Smart Chain (BEP20)");

    const [dots, setDots] = useState([]);
    
    useEffect(() => {
      const generateDots = () => {
        const newDots = Array.from({ length: 10 }).map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }));
        setDots(newDots);
      };
      generateDots();
      const interval = setInterval(generateDots, 5000);
      return () => clearInterval(interval);
    }, []);


  return (
    <><div className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center">
          {/* Header */}
          {/* Background Blinking Dots */}
          {dots.map((dot, index) => (
              <div
                  key={index}
                  className="absolute w-2 h-2 bg-white opacity-50 animate-blink"
                  style={{ left: dot.left, top: dot.top, animationDelay: dot.animationDelay }}
              ></div>
          ))}



          <div className="w-full max-w-md flex items-center justify-between py-4">
              <ArrowLeft className="text-teal-400 w-6 h-6 cursor-pointer" />
              <h1 className="text-3xl font-bold text-white tracking-widest text-center flex-1">WITHDRAW </h1>
          </div>

          {/* Choose Asset */}
          <div className="w-full max-w-md mt-6">
              <p className="text-gray-400 text-sm">Choose an asset</p>
              <div className="relative mt-2">
                  <select
                      className="w-full p-4 rounded-lg border border-teal-500 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"  style={{ background: "#000" }}
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                  >
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                  </select>
              </div>
          </div>

          {/* Amount Input */}
          <div className="w-full max-w-md mt-6">
              <div className="flex justify-between">
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-gray-400 text-sm">Balance: 0</p>
              </div>
              <div className="flex items-center justify-between  p-4 rounded-lg border border-teal-500 mt-2"  style={{ background: "#000" }}>
                  <input type="number" placeholder="Amount" className="bg-transparent outline-none text-white w-full" />
                  <button className="text-teal-400 font-semibold">MAX</button>
              </div>
          </div>

          {/* Wallet Address Input */}
          <div className="w-full max-w-md mt-6">
              <p className="text-gray-400 text-sm">Wallet address</p>
              <div className="flex items-center justify-between p-4 rounded-lg border border-teal-500 mt-2"  style={{ background: "#000" }}>
                  <input type="text" placeholder="Wallet address" className="bg-transparent outline-none text-white w-full" />
                  <QrCode className="text-teal-400 w-6 h-6 cursor-pointer" />
              </div>
          </div>

          {/* Network Selection */}
          <div className="w-full max-w-md mt-6">
              <p className="text-gray-400 text-sm">Network</p>
              <div className="relative mt-2">
                  <select
                      className="w-full  p-4 rounded-lg border border-teal-500  text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"  style={{ background: "#000" }}
                      value={selectedNetwork}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                      <option value="Binance Smart Chain (BEP20)">Binance Smart Chain (BEP20)</option>
                      <option value="Ethereum (ERC20)">Ethereum (ERC20)</option>
                      <option value="Polygon (MATIC)">Polygon (MATIC)</option>
                  </select>
              </div>
          </div>

          {/* Warning Message */}
          <p className="text-red-400 text-sm mt-6 text-center px-4">
              Note: Please double-check your wallet address to ensure you receive your assets. Blockchain transactions cannot be reversed once sent.
          </p>

          {/* Fee Info */}
          <p className="text-gray-400 text-sm mt-6">Fee: <span className="text-teal-400 font-semibold">1 USDT</span></p>

          {/* Confirm Button */}
          <button className="w-full max-w-md bg-teal-500 p-4 rounded-lg text-black font-bold text-lg mt-4 shadow-md">Confirm</button>

          <br></br>
      {/* Footer Navigation */}
      <Footer />
      
      </div>
      </>
    
  );
};

export default WithdrawPage;