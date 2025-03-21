import React, { useState, useEffect } from "react";
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom";
import Api from '../Api/botService';
const ActivityDashboard = () => {
  const [activeTab, setActiveTab] = useState("myActivity");
  const navigate = useNavigate();
  const [totalBalance, settotalBalance] = useState("");
  const [coinBalance, setcoinBalance] = useState("");
  const [connected, setConnected] = useState("");
  const [totalAllUser, settotalAllUser] =useState("");
  useEffect(() => {
    fatchpoints();
  }, []);
  

  const fatchpoints = async () =>{
    try{
       const response = await Api.post('auth/fatchPoint');
      //  console.log("Api response", response);
       if(response.data){
        settotalBalance(response.data.totalallCoin);
        setcoinBalance(response.data.coin_balance);
        settotalAllUser(response.data.userCount);
        if(!response.data.telegram_id){
          setConnected("❌ AiCoinX account is not connected")
        }
        else{
            setConnected("")
        }
       }
    }
    catch(error){
         console.error("error in fatching", error);
    }
  }

  return (
    <div
      className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative"
      style={{
        background:
          "linear-gradient(180deg, rgba(38, 28, 66, 1) 0%, rgba(14, 10, 32, 1) 100%)",
        backgroundSize: "cover",
      }}
    >

      <div className="w-full max-w-md flex justify-between bg-gray-900 rounded-full p-2 text-lg font-semibold">
        <button
          className={`w-1/2 text-center  rounded-full ${
            activeTab === "myActivity" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"
          }`}
          onClick={() => setActiveTab("myActivity")}
        >
          MY ACTIVITY
        </button>
        <button
          className={`w-1/2 text-center  rounded-full ${
            activeTab === "community" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"
          }`}
          onClick={() => setActiveTab("community")}
        >
          COMMUNITY
        </button>
      </div>
      {activeTab === "myActivity" &&(
        <>
       {connected && ( // Only show this div if `connected` has a message
      <div
        className="w-full max-w-md rounded-lg p-3 mt-4 flex items-center gap-3 shadow-lg border bg-red-700 text-white border-red-500 shadow-red-500/50"
      >
        <span className="text-base font-semibold tracking-wide">{connected}</span>
      </div>
    )}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-300"style={{fontSize:15}}>$AiCoinX Airdrop Points</p>
        <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
          <img src="../assets/img/ok3d.png" alt="klink" className="w-9 h-10" />
          {coinBalance}
        </h1>
      </div>

      <div className="w-full max-w-md border-t border-gray-600 mt-8 py-6 flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-gray-300 text-sm">Friends Referred</p>
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <img src="../assets/click20.svg" alt="referrals" className="w-8 h-8" />
            0
          </h2>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm">Points earned from sharing with friends</p>
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <img src="../assets/img/ok3d.png" alt="points" className="w-8 h-8" />
            0
          </h2>
        </div>
      </div>
      </>
      )}
      

      {/*  */}
      {activeTab ==="community" &&(
        <>
        <div className="text-center mt-8">
        <p className="text-lg text-gray-300"style={{fontSize:15}}>Community $KLINK Points</p>
        <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
          <img src="../assets/img/ok3d.png" alt="klink" className="w-9 h-10" />
          {totalBalance}
        </h1>
      </div>

      <div className="w-full max-w-md border-t border-gray-600 mt-8 py-6 flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-gray-300 text-sm">Total AiCoinXers</p>
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <img src="../assets/click20.svg" alt="referrals" className="w-8 h-8" />
            {totalAllUser}
          </h2>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm">Daily AiCoinXers</p>
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <img src="../assets/img/ok3d.png" alt="points" className="w-8 h-8" />
            0
          </h2>
        </div>
      </div>
        </>
      )}
      
      {/*  */}
      {connected && (
      <button className="w-full max-w-md bg-purple-600 text-white text-lg font-bold py-3 rounded-lg mt-6 shadow-xl" onClick={()=>navigate('/signup')}>
        Connect AiCoinX account
      </button>
      )}
      <Footer/>
    </div>
  );
};

export default ActivityDashboard;