import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setMessage("Compte créé avec succès ! Redirection...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Erreur lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* ICON */}
        <div className="icon-container">
          <span role="img" aria-label="lock" style={{ fontSize: "40px" }}>
            🔐
          </span>
        </div>

        <h2>Create Account</h2>

        
        {message && (
          <p style={{ color: "green", fontSize: "14px" }}>
            {message}
          </p>
        )}

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        
        <form onSubmit={handleSubmit} className="register-form">

          <div>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </div>

          <div>
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        
        <div className="register-footer">
          <p>
            Déjà un compte ?{" "}
            <Link to="/login">Se connecter</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;