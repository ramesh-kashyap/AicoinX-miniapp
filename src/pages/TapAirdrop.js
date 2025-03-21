import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
const leagues = [
  { name: "Bronze League", progress: 11621, total: 500000, image: "../assets/img/oksharp.png" },
  { name: "Silver League", progress: 25000, total: 500000, image: "../assets/img/oksharp.png" },
  { name: "Gold League", progress: 75000, total: 500000, image: "../assets/img/oksharp.png" }
];

const TapAirdrop = () => {
    const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? leagues.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === leagues.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div
      className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative"
      style={{
        background:
          "radial-gradient(circle at center, rgba(124, 77, 255, 0.6), rgba(17, 10, 29, 1))",
        backgroundSize: "cover",
      }}
    >
      
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">{leagues[currentIndex].name}</h1>
        <p className="text-gray-300 mt-2">
          Your number of shares determines the league you enter
        </p>
      </div>

      <div className="relative flex items-center justify-center mt-10">
        <button onClick={handlePrev} className="absolute left-0 p-3">
          <ChevronLeft className="text-white w-8 h-8" />
        </button>
        <img
          src={leagues[currentIndex].image}
          alt="league"
          className="w-60 h-60 animate-pulse"
        />
        <button onClick={handleNext} className="absolute right-0 p-3">
          <ChevronRight className="text-white w-8 h-8" />
        </button>
      </div>

      <div className="w-full max-w-md flex flex-col items-center text-white mt-6 mb-10">
        <p className="text-lg font-bold">{leagues[currentIndex].progress.toLocaleString()} / {leagues[currentIndex].total.toLocaleString()}</p>
        <div className="w-full bg-gray-700 h-4 rounded-full mt-2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-purple-500 shadow-lg h-full rounded-full"
            style={{ width: `${(leagues[currentIndex].progress / leagues[currentIndex].total) * 100}%` }}
          ></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TapAirdrop;
