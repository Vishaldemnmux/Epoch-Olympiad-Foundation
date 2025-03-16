import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";


const LoginPage = () => {
  const [batch, setBatch] = useState("2024-25");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in with:", batch, mobile);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" /> {/* Add your logo here */}
        <h2>LOGIN</h2>

        <div className="input-group">
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="2025-26">2025-26</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Continue</button>
      </div>
    </div>
  );
};

export default LoginPage;
