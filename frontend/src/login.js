import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";

const Login = () => {
  const [localUsername, setLocalUsername] = useState("");
  const { setUsername } = useContext(DataContext);
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    setUsername(localUsername);
    localStorage.setItem("username", localUsername);

    navigate("/");
  };
    
  return (
    <main className="Login">
      
      
      <form onSubmit={handleContinue}>
        <input
          type="text"
          placeholder="Enter Username"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
          required
        />

        <button type="submit">Continue</button>
      </form>
    </main>
  );
};

export default Login;