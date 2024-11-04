import React, { useState } from "react";
import axios from "axios";
import "./signup.css"; // Make sure this file includes the new styles below
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://todoserver-0wug.onrender.com/api/users/signup",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        enqueueSnackbar("Sign up Successful 🎉", { variant: "success" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data || "Failed to sign up");
      setSuccess(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />   
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Signup successful!</p>}
          
          <div className="button-container">
            <button type="submit" className="login-button">Sign Up</button>
          </div>
        </form>
        <div className="signup-redirect">
          <p>
            Already have an account?{" "}
            <a href="/" className="signin-link">
              Login
            </a>
          </p>
        </div>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={2000}
        />
      </div>
    </div>
  );
};

export default SignUp;
