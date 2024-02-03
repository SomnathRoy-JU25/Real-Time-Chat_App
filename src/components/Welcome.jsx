import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.username) {
          setUserName(parsedData.username);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col text-white">
      <img src={Robot} alt="" className="h-80" />
      <h1 className="text-2xl mt-4">
        Welcome, <span className="text-blue-500">{userName}!</span>
      </h1>
      <h3 className="mt-2">Please select a chat to start messaging.</h3>
    </div>
  );
}
