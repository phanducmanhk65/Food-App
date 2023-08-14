import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import SearchPage from "./SearchPage";
import Main from "./Main/Main";
import Cart from "./Cart/Cart";
import UserProfile from "./UserProfile";
import axios from "axios";

export { Navbar, Login, Register, SearchPage, Main, Cart, UserProfile };
let API_URL = "http://localhost:3000";

export default function callAPIDish(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    withCredentials: true,
  }).catch((err) => {
    console.log(err);
  });
}
