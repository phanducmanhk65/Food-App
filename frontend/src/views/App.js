/* eslint-disable no-unreachable */
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home/HomePage";
import { Provider } from "react-redux";
import store from "../store/stores";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
export default App;
