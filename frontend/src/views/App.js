/* eslint-disable no-unreachable */
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Home/HomePage";
// import { Provider } from "react-redux";
// import store from "../store/stores";

import AdminPanel from "./administration/AdminPanel"
import ShipperPage from "./shipper/ShipperPage"

function App() {
  return (
    <ShipperPage />
  );
}
export default App;
