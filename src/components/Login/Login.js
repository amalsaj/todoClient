import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar instead
import "./signin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Call the hook to get enqueueSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to sign in
      const response = await axios.post(
        "https://todoserver-0wug.onrender.com/api/users/signin",
        { email, password }
      );

      if (response.status === 200) {
        // Store email in local storage (or other tokens as needed)
        localStorage.setItem("email", email);

        // Display success message
        enqueueSnackbar("Login Successful 🎉", { variant: "success" });

        // Navigate to the dashboard or home page after a brief delay
        setTimeout(() => {
          navigate("/todo");
        }, 1000);
      }
    } catch (err) {
      // Capture error and display a snackbar notification
      setError(err.response?.data?.error || "Failed to sign in");
      enqueueSnackbar("Failed to sign in. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="checkmark">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>USER LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <div className="signup-redirect">
          <p>
            Already have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
