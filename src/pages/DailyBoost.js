import React, { useEffect, useState } from "react";
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom";
import Api from '../Api/botService';


  
  const DailyBoost = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dailyBoost");
  const [faqOpen, setFaqOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [dailyRewards, setDailyRewards] = useState([]);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [lastClaimedDay, setLastClaimedDay] = useState(null);
  const [firstClaimedDate, setFirstClaimedDate] = useState(null);
  const [eligibleRewardId, setEligibleRewardId] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [connect, setConnected] = useState(false);
//    useEffect =()=>{
//    setIsModalOpen(true);
// }
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    { question: "What are $AiCoinX Points?", answer: "$AiCoinX Points are earned through mining and completing tasks. They can be converted into $AiCoinX tokens at the TGE." },
    { question: "What Are Tap Points?", answer: "Tap Points are earned by engaging with the platform and can be used to boost your earnings." },
    { question: "When Will AiCoinX Airdrop Happen?", answer: "The AiCoinX airdrop will take place at the Token Generation Event (TGE)." },
    { question: "Are There Other Ways I Can Earn?", answer: "Yes! You can earn through referrals, completing tasks, and participating in promotions." },
    { question: "What is $AiCoinX Mining?", answer: "$AiCoinX Mining allows users to earn $AiCoinX Points over time by engaging with the ecosystem." },
    { question: "How Can I Start Mining Points?", answer: "Simply connect your AiCoinX account and start participating in mining activities." },
    { question: "What Are Daily Multipliers?", answer: "Daily multipliers help boost your earnings based on your engagement level." },
    { question: "Will Airdrop Rewards Have Vesting?", answer: "Yes, some airdrop rewards may be subject to a vesting schedule." },
    { question: "How Will I Claim Airdrop Rewards?", answer: "Airdrop rewards can be claimed through the AiCoinX wallet once the TGE occurs." },
    { question: "Is AiCoinX Available in All Countries?", answer: "AiCoinX is available in most countries, but some regions may have restrictions." }
  ];
  useEffect(() => {
    fetchRewards();
    Claimed();
  }, []);
  
  

  const fetchRewards = async () => {
    try {
        const response = await Api.post('auth/baycoin', { Coins: "newBalance" });
        // console.log("API Response:", response);
        if(response?.data){
          setDailyRewards(response.data.data);
        }
        else {
          throw new Error('Failed to fetch ');
        }      
        if(response.data.telegram_id){
          setConnected(true);
        }
        else{
          setConnected(false);
        }
    } catch (error) {
        console.error("❌ Fetching rewards failed:", error);
    }
  };
  const Claimed = async () => {
    try {
      const response = await Api.post('auth/claim-day');
      // console.log(response.data); 
  
      if (response.data.lastClaimed) {
        const lastClaimedTimestamp = new Date(response.data.lastClaimed).getTime();
        const nowTimestamp = new Date().getTime();
  
        // Convert to day numbers
        const lastClaimedDay = Math.floor(lastClaimedTimestamp / (1000 * 60 * 60 * 24));
        const nowDay = Math.floor(nowTimestamp / (1000 * 60 * 60 * 24));
  
        // Calculate days missed
        const daysMissed = nowDay - lastClaimedDay;
  
        // Check if user skipped 2+ days
        if (daysMissed >= 2) {
          setEligibleRewardId(response.data.userClaimsCount + daysMissed);
        } else {
          // Check if 24 hours have passed since last claim
          const hoursPassed = (nowTimestamp - lastClaimedTimestamp) / (1000 * 60 * 60); 
          if (hoursPassed >= 24) {
            setEligibleRewardId(response.data.userClaimsCount + 1);
          } else {
            setEligibleRewardId(null); // Block claiming before 24 hours
          }
        }
  
        setLastClaimedDay(response.data.userClaimsCount);
      } else {
        setEligibleRewardId(1);
        setLastClaimedDay(0);
      }
    } catch (error) {
      console.log(response.data);
      console.error(error, '❌ Failed to fetch claim data');
    }
  };
  
  
  const handleClaim = async (reward) => {
    if (reward.id !== eligibleRewardId) {
      setModalMessage("❌ You must wait 24 hours before claiming the next reward!");
      setIsModalOpen(true);
      return;
    }
  
    try {
      const response = await Api.post('auth/claim-reward', { rewardId: reward.id });      
      if (response?.data?.success) {
        setClaimedRewards([...claimedRewards, reward.id]);
        setIsModalOpen(true);
        setModalMessage("🎉 Reward claimed successfully!");
        // alert("🎉 Reward claimed successfully!");
        setIsModalOpen(true);
        Claimed(); // Refresh claim status
      } else {
        throw new Error(response.data.message || "Claim failed");
      }
    } catch (error) {
      // console.error("❌ Claiming reward failed:", error);
      setModalMessage(error.response?.data?.message || "❌ An error occurred while claiming the reward.");
      setIsModalOpen(true);
    }
  };
  
  




  return (
    <>
      <div
        className="bg-[#0d0d0d] text-gray-200 min-h-screen p-4 font-sans flex flex-col items-center relative"
        style={{
          background: "linear-gradient(180deg, rgba(27, 20, 55, 1) 0%, rgba(14, 10, 32, 1) 100%)",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-md flex justify-between bg-gray-900 rounded-full p-2 text-lg font-semibold">
          <button
            className={`w-1/2 text-center  rounded-full ${
              activeTab === "mining" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setActiveTab("mining")} style={{paddingTop:1}}
          >
            Mining
          </button>
          <button
            className={`w-1/2 text-center  rounded-full ${
              activeTab === "dailyBoost" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setActiveTab("dailyBoost")}
          >
            Daily Boost
          </button>
        </div>

        {/* Daily Boost Section */}
        {activeTab === "dailyBoost" && (
          <>
            <div className="text-center mt-6 font-semibold">
              <p className="text-gray-300 mt-2">Check in daily to claim points and boost your mining rewards!</p>
            </div>
            {!connect && (
            <div className="w-full max-w-md bg-gray-800 rounded-lg p-3 flex justify-between items-center mt-6 border border-yellow-500 shadow-lg">
              <div className="flex items-center gap-2">
                <img src="../assets/img/oksharp.png" alt="klink" className="w-9 h-10" />
                <span className="text-gray-300">Connect your AiCoinX Account</span>
              </div>
              <button className="bg-yellow-500 text-black px-6  rounded-lg shadow-md" onClick={()=>navigate('/signup')}>CONNECT</button>
            </div>
             )}
            <div className="grid grid-cols-4 gap-4 mt-8">
            {dailyRewards.map((reward) => (
  <div
    key={reward.id}
    className={`bg-gray-900 p-4 rounded-lg text-center border relative flex flex-col items-center justify-center shadow-md border-yellow-500 cursor-pointer transition-opacity ${
      reward.id === eligibleRewardId ? "opacity-100" : "opacity-50 pointer-events-none"
    }`}
    style={{ backgroundColor: "rgba(0, 0, 0, 0.22)" }}
    onClick={() => reward.id === eligibleRewardId && handleClaim(reward)}
  >
    <p className="text-sm text-gray-300 font-semibold" style={{fontWeight:200, fontSize:10}}>Day {reward.id}</p>
    <img src="../assets/img/oksharp.png" alt="klink" className="w-6 h-6 my-2" />
    <p className="text-yellow-500 font-semibold text-lg" style={{lineHeight:1}}>{reward.coins}</p>
  </div>
))}


</div>

          </>
        )}

        {/* Mining Section */}
        {activeTab === "mining" && (
          <div>
            <div className="max-w-md bg-gray-800 rounded-lg mt-4 flex justify-between">
            <img src="../assets/click23.svg" alt="tasks" className="w-5 h-5 m-2" />
              <span className="text-gray-300 m-2" style={{fontSize:'10px'}}>1/25 Tasks Complete</span>
              <span><span className="bg-yellow-500 px-2  rounded text-black"  style={{fontSize:'10px'}}>X1.00</span> <span style={{fontSize:'10px'}}>Multiplier</span></span>
              <img src="../assets/klink4.svg" alt="tasks" className="w-5 h-5 m-2" />
              <span  className="text-gray-300 m-2" style={{fontSize:'10px'}}>Disconnected</span>
            </div>

            {/* <div className="text-center mt-6">
              <p className="text-lg"style={{fontSize:'15px'}}>Today $AiCoinX Airdrop Points</p>
              <h1 className="text-5xl font-bold flex items-center justify-center gap-2" style={{fontSize:'20px'}}>
                <img src="../assets/img/oksharp.png" alt="klink" className="w-8 h-8" />
                11,621
              </h1>
            </div> */}

            {!connect && (
            <div className="w-full max-w-md bg-gray-800 rounded-lg p-3 flex justify-between items-center mt-6 border border-yellow-500 shadow-lg">
              <div className="flex items-center gap-2">
                <img src="../assets/img/oksharp.png" alt="klink" className="w-9 h-10" />
                <span className="text-gray-300">Connect your AiCoinX Account</span>
              </div>
              <button className="bg-yellow-500 text-black px-6  rounded-lg shadow-md" onClick={()=>navigate('/signup')}>CONNECT</button>
            </div>
             )}

            <div className="w-full max-w-md bg-gray-900 rounded-lg p-3 mt-6 flex justify-between items-center border border-yellow-500">
              <span className="bg-yellow-500 px-2 py-1 rounded text-black">X1.00</span>
              <span className="flex items-center gap-1">
                <img src="../assets/img/oksharp.png" alt="klink" className="w-6 h-6" />
                +3,600 points/hour
              </span>
            </div>

            <div className="w-full max-w-md mt-8">
              <h2 className="text-xl font-bold">FAQ</h2>
              

              <div className="mt-2">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className={`${openIndex ===index ?'bg-gray-800':'bg-gray-900'} p-4 rounded-lg mt-2 cursor-pointer text-white`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">{item.question}</span>
                      {openIndex === index ? "−" : "+"}
                    </div>
                    {openIndex === index && (
                      <p className="text-gray-300 mt-2">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
          {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center relative">
              <button className="absolute top-4 right-4 text-gray-400 text-xl" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
              <div className="flex justify-center mb-4">
                <img src="../assets/img/oksharp.png" alt="Account Connected" className="w-24 h-24" />
              </div>
              <h2 className="text-2xl font-bold">Daily Reward</h2>
              <p className="text-gray-400 mt-2">{modalMessage}</p>
              <button
                className="w-full bg-purple-600 text-white text-lg font-bold py-3 rounded-lg mt-6 shadow-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Claim
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default DailyBoost;
