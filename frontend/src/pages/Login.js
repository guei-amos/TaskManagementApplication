import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(response.data);

   
    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
            "user",
            JSON.stringify({
                userId: response.data.userId,
                username: response.data.username,
                email: response.data.email,
                })
);

      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur lors de la connexion."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Icône cadenas */}
        <div className="icon-container">
          <div className="lock-icon">
            <span role="img" aria-label="lock">🔒</span>
          </div>
        </div>

        <h2>Sign in</h2>

        {message && <p className="error-message">{message}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            SIGN IN
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;