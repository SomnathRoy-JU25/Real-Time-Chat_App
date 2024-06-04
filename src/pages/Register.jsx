import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/ChatLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbCornerDownRightDouble } from "react-icons/tb";
import login from "../utils/DemoLogin";

export default function Register() {
  const [showDemo, setShowDemo] = useState(true);
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
            <h1 className="text-white text-3xl font-extrabold font-serif tracking-wider">
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
        <div className="gap-y-4">
          {/* test login ID */}
          <div
            className={`${
              showDemo ? "" : "hidden"
            } absolute right-[10%] top-52 z-20 items-center justify-center  bg-black bg-opacity-50
        p-6 md:right-[67%] md:top-96`}
          >
            <div className="relative flex flex-col gap-2">
              <div
                onClick={() => {
                  setShowDemo(false);
                }}
                className="absolute right-[-20px] top-[-30px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-5xl text-richblack-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="20"
                  height="20"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="#888888"
                    stroke="#000000"
                    stroke-width="2"
                  />
                  <circle cx="50" cy="50" r="20" fill="#ffffff" />
                </svg>
              </div>
              <div className=" flex flex-col gap-y-2">
                <p
                className="flex items-center text-2xl font-extrabold font-sans text-gray-100
                bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text"
                >
                  Take a Demo &nbsp;{" "}
                  <BsLightningChargeFill size={25} color="yellow" />
                </p>
                <div>
                  <button
                    onClick={() => {
                      login("Albiya", "12345678", navigate);
                    }}
                    className="mb-1 mt-4 flex rounded-md px-4 py-2 font-bold font-sans text-gray-800
                    bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
                    text-[13px] sm:text-[16px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    hover:shadow-none hover:scale-95 transition-all duration-200"
                  >
                    <TbCornerDownRightDouble className="hidden text-2xl text-richblack-900 md:block" />
                    Click here for Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
