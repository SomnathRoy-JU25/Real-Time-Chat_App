import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/ChatLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      // API CALL from BACK-END
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
      <div
        className="h-screen w-screen flex flex-col justify-center items-center gap-4
       bg-gray-800 "
      >
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" flex flex-col gap-8 bg-black bg-opacity-60 rounded-3xl pb-3 pt-3 p-12"
        >
          <div className="brand flex items-center gap-4 justify-center">
            <img src={Logo} alt="logo" className="h-12" />
            <h1 className="text-white text-3xl font-bold tracking-wider">
              Rapid-Chat
            </h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full focus:outline-none focus:border-blue-700"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full focus:outline-none focus:border-blue-700"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full focus:outline-none focus:border-blue-700"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full focus:outline-none focus:border-blue-700"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-4 px-8 font-bold uppercase rounded-lg cursor-pointer hover:bg-purple-700"
          >
            Create User
          </button>
          <span className="text-white uppercase">
            Already have an account ?{" "}
            <Link to="/login" className="font-bold text-purple-600">
              Login.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
