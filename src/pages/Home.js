import React, { useState, useEffect } from "react";
import { Settings, Bell, Gift, Star, Zap, Network, Flame, Trophy,BarChart,Users,Globe ,Crown,Diamond,Banknote} from "lucide-react";
import Footer from '../components/Footer';
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import Api from '../Api/botService';
import Loader from "../components/Loader"; 
import SuccessPopup from "../components/SuccessPopup";
import { CheckCircleIcon } from "@heroicons/react/solid"; // Install HeroIcons for icons


const Home = () => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const [communityTasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState({});
    // const [token, setToken] = useState(localStorage.setItem("token"));
    const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
    const [username, setUsername] = useState("Guest");
    const [name, setName] = useState("ABC");
    const [lname, setLast] = useState("XYZ");
    const [user, setUser] = useState(null);
    const [claimableTasks, setClaimableTasks] = useState({});
    // Check if the Telegram WebApp SDK is available
    const tg = window.Telegram;
    // console.log(tg);  
    // console.log("Token from localStorage:", localStorage.getItem("token"));

    useEffect(() => {
      getTaskRecord();
      setShowModal(false);

      if (!window.Telegram || !window.Telegram.WebApp) {
        console.error("❌ Telegram WebApp SDK is missing.");
        setLoading(false); // Stop loading if the SDK is missing
        return;
      }
      const tg = window.Telegram.WebApp;
      tg.expand(); // Expand the WebApp interface 
      const initDataUnsafe = tg.initDataUnsafe;
      if (initDataUnsafe && initDataUnsafe.user) {
        setUser(initDataUnsafe.user);
        setTelegramId(initDataUnsafe.user.id);
        setUsername(initDataUnsafe.user.username);
        setName(initDataUnsafe.user.first_name);
        setLast(initDataUnsafe.user.last_name);
        localStorage.setItem("telegram_id", initDataUnsafe.user.id); // Store telegram_id locally
        // if (telegram_id) {
        //         handleAuthentication(telegram_id);
        //       }
      }
      setLoading(false); // Ensure loading is stopped after initialization
    }, []);
  
  //   useEffect(() => {
  //     if (telegram_id) {
  //       handleAuthentication(telegram_id);
  //     }
  //   }, [telegram_id]);
  // console.log(user);  
  // const handleAuthentication = async (user) => {
  //   try {
  //     const response = await Api.post("/register", {
  //       id: user.id,
  //       first_name: user.first_name,
  //       username: user.username,
  //     });
  //     console.log(response);
  //     if (response.data.success) {
  //       setUserData(user);
  //       setIsLoggedIn(true);
  //     } else {
  //       alert("Authentication failed.");
  //     }
  //   } catch (error) {
  //     console.error("Error during authentication:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    
  // const handleAuthentication = async (user) => {
  //   try{
  //   const response = await Api.post("auth/telegram-login", {
  //     telegram_id: telegram_id,
  //     tname: name,
  //     tusername: username,
  //     tlastname: lname,
  //   });
  //   console.log("Response:", response);
  //   if (response.data.token) {
  //     // console.log(token);
  //     // setToken(response.data.token);  // Ensure setToken() is defined in your code
  //   } else {
  //     console.error("Failed to fetch user info:", response);
  //   }
  // }
  // catch(error){
  //   console.error("Error during authentication:", error);
  // }
  // };
  
  useEffect(() => {
        
    if (loading) {
      setUserData("ABC");
      setLoading(false); // Avoid infinite loop
    }
  }, [loading]);
const navigate = useNavigate();
const [dots, setDots] = useState([]);

  const getTaskRecord = async () => {
    try {
      const response = await Api.post("auth/getTasks", {telegram_id:telegram_id} ); // Axios automatically parses JSON
      setTasks(response.data); // Use response.data
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [activeTab, setActiveTab] = useState("community");
   const handleStart = async (taskId,taskUrl) => {
    // Change button text after 5 seconds
    window.open(taskUrl, "_blank");
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
    const response = await Api.post("auth/startTask", {telegram_id:telegram_id,task_id: taskId} ); // Axios automatically parses JSON
    setTimeout(() => {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
      setClaimableTasks((prev) => ({ ...prev, [taskId]: true }));
    }, 50000);


  };

  const fatchpoints = async () =>{
    try{
       const response = await Api.post('auth/fatchPoint');
      //  console.log("Api response", response);
       if(response.data){
        // settotalBalance(response.data.coin_balance);
        // setcoinBalance(response.data.coin);
        // settotalAllCoins(response.data.totalallCoin);
        if(!response.data.telegram_id){
          setPopupMessage("❌ AiCoinX account is not connected");
          setIsModalOpen(true);
        }
        else{
          setPopupMessage("AiCoinX Connected");
          setIsModalOpen(true);
        }
       }
    }
    catch(error){
         console.error("error in fatching", error);
    }
  }

  const handleClaim = async (taskId) => {
      try {
        // const telegram_id = "7399746452"; // Replace with actual Telegram ID
        const response = await Api.post("auth/claimTask",{ telegram_id: telegram_id, task_id: taskId }); // Axios automatically parses JSON
       
        setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
        setTimeout(() => {
          setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
          setShowModal(true);
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: "completed" } : task
            )
          );
        }, 5000);
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (error.response) {
          const errorMessage = error.response.data.message || "An error occurred";
          // console.log(error.response.data.message);
          setPopupMessage(errorMessage);
          setIsModalOpen(true);
        } else {
          setPopupMessage("Something went wrong. Please try again.");
          setIsModalOpen(true)
        }
      }
   


  };



  return (
    <div className="bg-[#0d0d0d] text-gray-200 min-h-screen p-2 font-sans flex flex-col items-center relative" >
       {/* model popup/ */}
            {showModal && (
            <SuccessPopup/>
            )}    
    <div className="w-full max-w-md flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Register AiCoinX Account</h1>
      <div className="relative">
      <img src="../assets/klink4.svg" alt="Invite Friend" className="w-8 h-8 rounded-full border border-purple-400"onClick={() => fatchpoints()}/>
        {/* <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></span> */}
      </div>
    </div>  
    <div className="w-full max-w-md space-y-4 mt-4">
          <div className="bg-[#1C1A3A] p-2 rounded-xl flex items-center justify-between border border-gray-700">
            <div className="flex items-center gap-3">
              <img src="../assets/klink10.svg" alt="tone" className="w-11 h-12" />
              <div>
                <p className="text-white font-bold">Connect to Ton Wallet</p>
                   <p className="text-gray-400 text-sm">  <img src="assets/oksharp.png" style={{width:'14px',display:'inline'}} />2,500,00</p>
              </div>
            </div>
          <span onClick={() => fatchpoints()}>&gt;</span>              
          </div>
      </div>  
    <div className="w-full max-w-md flex justify-between mt-6 border-b border-gray-700 pb-2 text-gray-400" style={{    width: "100%"}}>
      <button style={{width:'100%',margin:'auto'}} className={`relative text-white font-bold pb-2 ${activeTab === "community" ? "border-b-2 border-purple-400" : ""}`} onClick={() => setActiveTab("community")}>Join Our Social Community <span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">9</span></button>
      {/* <button className={`relative text-white font-bold pb-2 ${activeTab === "socialtask" ? "border-b-2 border-purple-400" : ""}`} onClick={() => setActiveTab("socialtask")}>Social Task<span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">12</span></button>
      <button className={`relative text-white font-bold pb-2 ${activeTab === "partners" ? "border-b-2 border-purple-400" : ""}`} onClick={() => setActiveTab("partners")}>Partners<span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">2</span></button> */}

      {/* <button className="text-gray-500">Partners <span className="ml-2 bg-gray-700 px-2 py-1 rounded-full text-sm">2</span></button> */}
    </div>
    
    {activeTab === "community" && (
      <div className="w-full max-w-md space-y-4 mt-4">        
        {communityTasks.map(task => (
          <div key={task.id} className="bg-[#1C1A3A] p-2 rounded-xl flex items-center justify-between border border-gray-700">
            <div className="flex items-center gap-3">
              <img src={task.icon} alt={task.name} className="w-11 h-12" />
              <div>
                <p className="text-white font-bold">{task.name}</p>
                   <p className="text-gray-400 text-sm">  <img src="assets/oksharp.png" style={{width:'14px',display:'inline'}} />  {task.reward}</p>
              </div>
            </div>
           
           
            {task.status === "completed" ? (
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
            ) : 
            claimableTasks[task.id] ? (
          <button  onClick={() => handleClaim(task.id)} className="bg-[#3A2F50] text-gray-300 px-4 py-2 rounded-lg" style={{background:'rgb(79 79 223)'}}>Claim</button>
        ) : (
          <button
              onClick={() => handleStart(task.id,task.link)}
              className="bg-[#3A2F50] text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
              disabled={loadingTasks[task.id]}
            >
              {loadingTasks[task.id] ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                </>
              ) : (
                "Start"
              )}
            </button>
        )}
          </div>
        ))}
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
          <h2 className="text-2xl font-bold">Connected AiCoinX Wallet</h2>
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

export default Home;
