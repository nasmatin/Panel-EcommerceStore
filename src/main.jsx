import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import DashBoard from "./dashboard/DashboardLayout.jsx";
//import './index.css'
//import Loginuser from "./Login.jsx";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App.jsx";
//import "./css/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
