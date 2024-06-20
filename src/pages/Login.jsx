import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/ChatLogo.png";
import { toast } from "react-hot-toast";
import { loginRoute } from "../utils/APIRoutes";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbCornerDownRightDouble } from "react-icons/tb";
import login from "../utils/DemoLogin";

export default function Login() {
  const [showDemo, setShowDemo] = useState(true);
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
      toast.success("Login Successful");
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        console.log(data.user);
        navigate("/");
      }
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen flex flex-col justify-center items-center gap-4
       bg-gray-800"
      >
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-8 bg-black bg-opacity-60 rounded-xl p-12"
        >
          <div className="brand flex items-center gap-4 justify-center">
            <img src={Logo} alt="logo" className="h-20" />
            <h1 className="text-white text-3xl tracking-widest font-extrabold font-serif">
              Rapid-Chat
            </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full focus:outline-none focus:border-blue-700"
            minLength="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="bg-transparent py-4 px-6 border border-purple-600 rounded-lg text-white w-full 
            focus:outline-none focus:border-blue-700"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-4 px-8 font-bold uppercase rounded-lg cursor-pointer hover:bg-purple-700"
          >
            Log In
          </button>
          <span className="text-white uppercase">
            Don't have an account ?{" "}
            <Link to="/register" className="font-bold text-purple-600">
              Create One.
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
                      login("Somnath", "12345678", navigate);
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
    </>
  );
}
