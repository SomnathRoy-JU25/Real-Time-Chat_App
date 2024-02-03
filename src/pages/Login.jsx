import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Email and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-purple-950">
        <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col gap-8 bg-black bg-opacity-60 rounded-xl p-12">
        <div className="brand flex items-center gap-4 justify-center">
          <img src={Logo} alt="logo" className="h-20" />
          <h1 className="text-white text-3xl font-bold tracking-wider">Rapid-Chat</h1>
        </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full"
            minLength="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full"
          />
          <button type="submit" className="bg-purple-600 text-white py-4 px-8 font-bold uppercase rounded-lg cursor-pointer hover:bg-purple-700">
            Log In
          </button>
          <span className="text-white uppercase">
            Don't have an account ? <Link to="/register" className="font-bold text-purple-600">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
