import {toast} from "react-hot-toast";
import { loginRoute } from "./APIRoutes";
import axios from "axios";
const login = async (username, password,navigate) => {
  const { data } = await axios.post(loginRoute, {
    username,
    password,
  });
  toast.success("Login Successful");
  if (data.status === true) {
    localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(data.user)
    );
    console.log(data.user);
    navigate("/");
  }
};

export default login;
