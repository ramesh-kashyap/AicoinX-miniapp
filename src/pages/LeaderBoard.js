import { useState } from "react";
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom";
const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState("week");
  const [activeTab, setActiveTab] = useState("tap");
  const navigate = useNavigate();
  const tap = () => setActiveTab("tap");
  const node = () => setActiveTab("node");

  return (
    <div className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative" style={{marginBottom:0}}>
      {/* Background Blinking Dots */}
      {/* <div className="absolute w-2 h-2 bg-white opacity-50 animate-ping" style={{ left: "10%", top: "20%", animationDelay: "0s" }}></div>
      <div className="absolute w-2 h-2 bg-white opacity-50 animate-ping" style={{ left: "50%", top: "40%", animationDelay: "0.5s" }}></div>
      <div className="absolute w-2 h-2 bg-white opacity-50 animate-ping" style={{ left: "80%", top: "60%", animationDelay: "1s" }}></div> */}

      {/* User Profile */}
      <div className="flex items-center justify-between w-full max-w-md p-4">
        <i className="fas fa-arrow-left text-xl"></i>
        <h1 className="text-lg font-bold flex items-center">
          ATHENE NETWORK
          <i className="fas fa-check-circle text-blue-500 ml-2"></i>
        </h1>
        <i className="fas fa-ellipsis-v text-xl"></i>
      </div>

      {/* Tabs */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">LEADERBOARD</h2>        
      </div>
      <div className="flex w-full max-w-md justify-between bg-[#121212] p-2 rounded-lg border border-gray-700">
        <div className={`px-6 py-3 rounded-lg font-bold flex-1 text-center cursor-pointer ${
    activeTab === "tap" ? "bg-teal-500 text-black" : "text-gray-400"
  }`} 
  onClick={tap}>Week</div>
        <div className={`px-6 py-3 rounded-lg font-bold flex-1 text-center cursor-pointer ${
    activeTab === "node" ? "bg-teal-500 text-black" : "text-gray-400"
  }`} 
  onClick={node}>Month</div>
      </div>


      <div className="flex justify-center mt-2">
        
        </div>
        <p className="mt-2">10/02/2025 - 10/02/2025</p>
      {/* Leaderboard */}
      <div className="flex justify-center mt-8">
          <div  className="relative mx-4">
          <img
                src="https://storage.googleapis.com/a1aa/image/2rKteeA408gUqfmkrLp0LXEysGWlDi5G9LqTI5KOvaY.jpg"
                alt="User avatar"
                className="w-12 h-12 rounded-full border-4 border-500" style={{marginLeft:20}}
              /> 
            <img
                src="../assets/top2.png"
                alt="User avatar"
              /> 
            <p className="text-center mt-2" style={{marginTop:-70}}>8723B</p>
            <p className="text-center">"sun***"</p>
          </div>
          <div  className="relative mx-4">
          <img
                src="https://storage.googleapis.com/a1aa/image/2rKteeA408gUqfmkrLp0LXEysGWlDi5G9LqTI5KOvaY.jpg"
                alt="User avatar"
                className="w-12 h-12 rounded-full border-4 border-500" style={{marginLeft:40}}
              /> 
            <img
                src="../assets/top.png"
                alt="User avatar" style={{height:328, width:710}}
              /> 
            <p className="text-center mt-2" style={{marginTop:-70}}>8723B</p>
            <p className="text-center">"sun***"</p>
          </div>
          <div  className="relative mx-4">
          <img
                src="https://storage.googleapis.com/a1aa/image/2rKteeA408gUqfmkrLp0LXEysGWlDi5G9LqTI5KOvaY.jpg"
                alt="User avatar"
                className="w-12 h-12 rounded-full border-4 border-500" style={{marginLeft:20}}
              /> 
            <img
                src="../assets/top3.png"
                alt="User avatar"
              /> 
            <p className="text-center mt-2" style={{marginTop:-70}}>8723B</p>
            <p className="text-center">"sun***"</p>
          </div>
      </div>
      

      {/* Other Rankings */}
      <div className="mt-8 w-full max-w-md">
        {["sma***", "kim***", "이영목***", "이현아***"].map((name, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg mb-2">
            <div className="flex items-center">
              <img
                src="https://storage.googleapis.com/a1aa/image/2rKteeA408gUqfmkrLp0LXEysGWlDi5G9LqTI5KOvaY.jpg"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <p className="ml-2">{name}</p>
            </div>
            <p>{(3.0 - index * 0.05).toFixed(3)}B</p>
          </div>
        ))}
      </div>
      

      {/* User Status */}
      <div className="w-full max-w-md p-4 rounded-xl flex justify-between items-center my-4 border border-teal-400" style={{background: "#000"}}>
      {/* <img className="text-gray-300 cursor-pointer" src="../assets/img/wtresure.gif" alt="setting" style={{height:'40px', width: 'auto', marginTop:'-5px'}}/> */}
        <p className="text-sm text-gray-300">You are currently outside the ranking</p>
        {/* <button className="bg-teal-500 px-6 py-2 rounded-lg text-black font-bold">Quest</button> */}
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
