import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
function Login() {
  const navigate = useNavigate();

  const { loginUser: saveUser } =
    useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const userData =
        await loginUser(
          formData
        );

      saveUser(userData);

      alert(
        "Login Successful!"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="auth-logo">
  Shop<span>Sphere</span>
</div>
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;