import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
    const data = await axios.get(`${logoutRoute}/${id}`); // Api Call from Backend
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <button onClick={handleClick} className="flex justify-center items-center p-2 rounded bg-purple-600 text-white focus:outline-none hover:bg-purple-700">
      <BiPowerOff className="text-white text-lg" />
    </button>
  );
}
