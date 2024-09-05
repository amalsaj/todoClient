import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://todoserver-0wug.onrender.com/api/users/signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("email", email);
        setSuccess(true);
        setError(null);
        enqueueSnackbar("Login Successful 🎉", { variant: "success" });
        setTimeout(() => {
          navigate("/todo");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign in");
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <div className="signin-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Sign in successful!</p>}
          
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="signup-redirect">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign Up
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

export default SignIn;
