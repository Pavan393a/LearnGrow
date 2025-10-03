// login code here
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";
import { ButtonWarning } from "./ButtonWarning";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);

  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  // Handle login
  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/${role}/login`, {
        username: email,
        password,
      });

      const { token, username } = response.data; // ✅ extract values

      // Save token + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Update Recoil
      setUser({
        isLoading: false,
        userEmail: username,
        token,
        role,
      });

      // Navigate
      if (role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Email */}
        <InputBox
          label="Email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Password */}
        <InputBox
          label="Password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Error */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={"Signup"}
            to={"/signup"}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
