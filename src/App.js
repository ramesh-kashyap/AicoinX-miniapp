import { useEffect, useState, useRef } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Mining from "./pages/Mining";
import Quest from "./pages/Quest";
import Friends from "./pages/Friends";
import WithdrawPage from "./pages/Withdraw";
import HistoryPage from "./pages/History";
import ReferralList from "./pages/ReferralList";
import Leaderboard from "./pages/LeaderBoard";
import Send from "./pages/Send";
import Deposit from "./pages/wallet/deposit";
import TapAirdrop from "./pages/TapAirdrop";
import DailyBoost from "./pages/DailyBoost";
import SignupPage from "./pages/Signup";
import ActivityDashboard from "./pages/Activity";
import Otp from "./pages/otp"
import Loader from "./components/Loader"; // Create a loader component
import Api from "./Api/botService";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
  const [username, setUsername] = useState("Guest");
  const [name, setName] = useState("ABC");
  const [lname, setLast] = useState("XYZ");
  const [sponsorId, setSponsorId] = useState("null");
  const requestSent = useRef(false);

  // Check if the Telegram WebApp SDK is available
  const tg = window.Telegram;
  console.log(tg); 

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
      console.error("❌ Telegram WebApp SDK is missing.");
      return;
    }
    const tg = window.Telegram.WebApp;
    tg.expand();
    const initDataUnsafe = tg.initDataUnsafe;
  
    if (initDataUnsafe?.user && !user) {
      setUser(initDataUnsafe.user);
      setTelegramId(initDataUnsafe.user.id);
      setName(initDataUnsafe.user.first_name || ""); // ✅ Prevent default values
      setUsername(initDataUnsafe.user.username || "");
      setLast(initDataUnsafe.user.last_name || "");
      localStorage.setItem("telegram_id", initDataUnsafe.user.id);
    }
  
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [telegram_id]); // Added dependency


  // useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const sponsor = urlParams.get("start");

  //     if (sponsor) {
  //       setSponsorId(sponsor);
  //       localStorage.setItem("sponsorId", sponsor);
  //       console.log(sponsor);
  //     } else {
  //       const storedSponsorId = localStorage.getItem("sponsorId");
  //       if (storedSponsorId) {
  //         setSponsorId(storedSponsorId);
  //         console.log(sponsor);
  //       }
  //     }
  // }, []);
  
  
  useEffect(() => {
    if (telegram_id && name !== "ABC" && username !== "Guest" && lname !== "XYZ" && !requestSent.current) {
      requestSent.current = true; // Mark request as sent
      fetchUserInfo();
    }
  }, [telegram_id, name, username, lname]);
  

  // Fetch user info if the user is logged in
  const fetchUserInfo = async () => {
    console.log(username);
    try {
      const response = await Api.post("auth/telegram-login", {
        telegram_id,
        tname: name,
        tusername: username,
        tlastname: lname,
        // referrerId : sponsorId,
      });
  
      // console.log("Response:", response);
      
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Failed to fetch user info:", response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  
  

  // Protected route component to ensure users are authenticated
  const ProtectedRoute = ({ element }) => {
    if (loading) {
      return <Loader />; // Show loader while loading
    }
    return token ? element : <Navigate to="/mining" />;
  };

  return (


    <Router>
      {loading ? (
        <Loader /> // Show loader while the app is initializing
      ) : (
        <Routes>
          <Route path="/mining" element={<ProtectedRoute element={<Home />}/>} />
          <Route path="/wallet" element={<ProtectedRoute element={<Wallet />} />} />
          <Route path="/" element={<Mining />} />
          <Route path="/quest" element={<ProtectedRoute element={<Quest />} />} />
          <Route path="/friends" element={<ProtectedRoute element={<Friends />} />} />
          <Route path="/withdraw" element={<ProtectedRoute element={<WithdrawPage />} />} />
          <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
          <Route path="/send" element={<ProtectedRoute element={<Send />} />} />
          <Route path="/referral-list" element={<ProtectedRoute element={<ReferralList />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/deposit" element={<ProtectedRoute element={<Deposit />} />} />
          <Route path="/tapairdrop" element={<ProtectedRoute element={<TapAirdrop />} />} />
          <Route path="/dailyboost" element={<ProtectedRoute element={<DailyBoost />} />} />
          {/* <Route path="/dailyboost" element={<DailyBoost />} /> */}
          <Route path="/signup" element={<ProtectedRoute element={<SignupPage />} />}/>
          <Route path="/activity" element={<ProtectedRoute element={<ActivityDashboard />} />} />
          <Route path="/otp-verification" element={<ProtectedRoute element={<Otp/>} />}/>
        </Routes>
      )}
    </Router>
  );
};

export default App;