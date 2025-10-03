// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

// import Home from "./pages/Home";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Landing } from "./pages/Landing.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";

import { BASE_URL } from "./config.js";
import { userState } from "./store/atoms/user"; // ✅ FIX: import userState

function InitUser() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || !role) {
        setUser({ isLoading: false, userEmail: null });
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/${role}/me`, {
          headers: { Authorization: "Bearer " + token },
        });

        if (response.data.username) {
          setUser({
            isLoading: false,
            userEmail: response.data.username,
            token,
            role,
          });
        } else {
          setUser({ isLoading: false, userEmail: null });
        }
      } catch (e) {
        console.error("Token validation failed:", e.response?.status);

        // If token is expired or invalid, clear it
        if (e.response?.status === 403 || e.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }

        setUser({ isLoading: false, userEmail: null });
      }
    };

    init();
  }, [setUser]);

  return null;
}

function App() {
  return (
    <RecoilRoot>
      <InitUser /> {/* ✅ Now we actually run the init logic */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
