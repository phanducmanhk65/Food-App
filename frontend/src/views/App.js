import "./App.scss";
// import AdminPanel from "./administration/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home/HomePage";
// import ShipperPage from "./shipper/ShipperPage";
// import UserList from "./Test";
// import Test from "./Test";
import ShopContextProvider from "../context/shop-context";

function App() {

  return  <ShopContextProvider><Home/></ShopContextProvider> ;
  }
export default App;
