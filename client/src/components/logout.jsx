import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";

import { useSetRecoilState } from "recoil";
export const Logout = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({
      isLoading: false,
      userEmail: null,
      token: null,
      role: null,
    });
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
