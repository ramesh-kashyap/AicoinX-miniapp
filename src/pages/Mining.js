import React, { useState, useEffect } from "react";
import { ToggleLeft, Gem, Heart } from "lucide-react";
import Footer from '../components/Footer';
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Api from '../Api/botService';
import { Toaster, toast } from 'react-hot-toast';
const Mining = () => {
  const [coins, setCoins] = useState([]); // Array for floating coins
  const [balance, setBalance] = useState(0); // User balance
  const navigate = useNavigate();
  const [gemCount, setGemCount] = useState(38);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dots, setDots] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const handleTap = () => {
    setGemCount(gemCount + 1);
  };

  const addCoin = (event) => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 50);
    
    const parent = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const newCoin = { id: Date.now(), x: clientX - parent.left,y: clientY - parent.top,}; // Unique ID & random position
    setCoins((prev) => [...prev, newCoin]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id)); // Remove after 1s
    }, 1000);

    // Update balance
    const newBalance = balance + 1;
    // setProBalance(newBalance);
    setBalance(newBalance);
    updateBalance(newBalance);   
    

    setIsClicking(true);  // Mark that the user is clicking
        setpBalance(prev => Math.max(prev - 1, 0));  // Decrease but not below 0
  };

  const updateBalance = async (newBalance) => {
    // console.log(newBalance);
    try {
      const response = await Api.post("auth/updateBalance", { balance: newBalance });
      // console.log(response.data);
      if(response.data.balance){
        setBalance(response.data.balance);
      }      
    } catch (err) {
      console.error("Error updating balance:", err,{ duration: 1000 });
    }
  };

   const fatchBalance = async () =>{
    try{
      const response = await Api.post("auth/fatchBalance");
      // console.log(response.data);
      if(response.data.balance){
        setBalance(response.data.balance);
      }
    }
    catch (err) {
     console.error("Error updating balance:", err,{ duration: 1000 });
    }
   }

  const [activeTab, setActiveTab] = useState("tap");

const tap = () => setActiveTab("tap");
const node = () => setActiveTab("node");

const maxBalance = 500;
const [pbalance, setpBalance] = useState(maxBalance);
const [isClicking, setIsClicking] = useState(false);

// Calculate progress percentage
const progressPercentage = (pbalance) / 5;
useEffect(() => {
  fatchBalance();
      const interval = setInterval(() => {
          setpBalance(prev => (prev < maxBalance ? prev + 1 : maxBalance)); // Increase but not above 500
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval
 
}, []);  // Run when isClicking changes

// Detect when user stops clicking
useEffect(() => {
  let timeout;
  if (isClicking) {
      timeout = setTimeout(() => setIsClicking(false), 1000); // 1 sec delay after last click
  }
  return () => clearTimeout(timeout); // Cleanup timeout
}, [isClicking]);
useEffect(() => {
  const otpSuccess = sessionStorage.getItem("otpSuccess");
  const message = sessionStorage.getItem("popupMessage");
        if (otpSuccess && message) {
          setIsModalOpen(true);
          sessionStorage.removeItem("otpSuccess");
          sessionStorage.removeItem("popupMessage") // Remove after showing
        }
    }, []);

    const fatchpoints = async () =>{
      try{
         const response = await Api.post('auth/fatchPoint');
        //  console.log("Api response", response);
         if(response.data){
          // settotalBalance(response.data.coin_balance);
          // setcoinBalance(response.data.coin);
          // settotalAllCoins(response.data.totalallCoin);
          if(!response.data.telegram_id){
           toast.error("❌ AiCoinX account is not connected",{ duration: 1000 });
            // setIsModalOpen(true);
          }
          else{
           toast.success("AiCoinX Connected",{ duration: 1000 });
            // setIsModalOpen(true);
          }
         }
      }
      catch(error){
           toast.success("Somthing is wrong", error,{ duration: 1000 });
      }
    }

  return (
    <div
      className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative">
        <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full flex justify-between items-center text-white text-sm">
        <div className="flex gap-2 items-center bg-gray-800/50 px-4 py-3 rounded-lg">
          <img src="../assets/img/oksharp.png" alt="coin" className="w-5 h-5" />
          <span>{balance}</span>
        </div>        
        <div className="flex gap-2 items-center bg-gray-800/50 px-4 py-3 rounded-lg" onClick={() => navigate("/tapairdrop")}>
        {/* <img src="../assets/img/oksharp.png" alt="coin" className="w-5 h-5" onClick={() => navigate("/tapairdrop")}/> */}
          <span className="text-yellow-300">Bronze</span>
        </div>
        <div className="flex gap-2 items-center bg-gray-800/50 px-4 py-3 rounded-lg">
          <img src="../assets/click20.svg" alt="tasks" className="w-5 h-5" />
          <span>0</span>
        </div>
        <div className="flex gap-2 items-center bg-gray-800/50 px-4 py-3 rounded-lg">
          <img src="../assets/klink21.svg" alt="heart" className="w-5 h-5" />
          <span>0</span>
        </div>
        <div className="flex items-center">
          <img src="../assets/klink4.svg" alt="profile" className="w-8 h-8 rounded-full border border-purple-400"  onClick={()=>fatchpoints()}/>         
        </div>
      </div>
      <div className="text-center text-white mt-10">
        <p className="text-lg" styele={{fontSize:7}}>Tap Points</p>
        <h1 className="text-5xl font-bold flex items-center justify-center gap-2" style={{marginTop:10}}>
          <img src="../assets/img/oksharp.png" alt="coin" className="h-7"/>
          {balance} 
        </h1>
      </div>      
      <div className="relative flex justify-center" style={{marginTop:40}}>
        <img src="../assets/img/oksharp.png" alt="tap" className={`cursor-pointer ${isBlinking ? "animate-ping" : ""}`} onClick={addCoin} style={{width:250, height:250}}/>
        <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-yellow-400 text-xl font-bold"
            style={{
              left: `${coin.x}px`, // Exact X position
              top: `${coin.y}px`,  // Exact Y position
              transform: "translate(-50%, -50%)", // Center it properly
              position: "absolute"
            }}
          >
            +1🪙
          </motion.div>
        ))}
      </AnimatePresence>
      </div>
      <div className="w-full max-w-md flex flex-col items-center text-white" style={{marginTop:100}}>
        <div className="flex justify-between w-full px-2">
          <p className="text-sm flex items-center gap-1">
            <img src="../assets/img/oksharp.png" alt="coin" className="w-5 h-5" /> {pbalance} / 500
          </p>
          <button className="flex items-center px-3 py-1 rounded-lg text-black text-sm gap-2 items-center" style={{backgroundColor: '#1F293780'}}>
            <img src="../assets/klink13.svg" alt="booster" className="w-5 h-5 mr-1" /> Boosters
          </button>
        </div>
        <div className="w-full rounded-lg" style={{padding:5, backgroundColor:'#000',border: '2px solid gold'}}>
          <div className="bg-yellow-400 h-3 rounded-lg "style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center relative">
            <button className="absolute top-4 right-4 text-gray-400 text-xl" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
            <div className="flex justify-center mb-4">
              <img src="../assets/img/oksharp.png" alt="Account Connected" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold">Account Connected</h2>
            <p className="text-gray-400 mt-2">{popupMessage}</p>
            <button
              className="w-full bg-purple-600 text-white text-lg font-bold py-3 rounded-lg mt-6 shadow-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Mining;
