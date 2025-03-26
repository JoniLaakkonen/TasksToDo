import { Button, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./../authservice";
import "./login.css";

export default function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await loginUser(formData.username, formData.password);
      if (result === "success") {
        console.log("Login successful!");
        setIsAuthenticated(true);
        localStorage.setItem("auth", "true");
        navigate("/dashboard");
      } else {
        setError(result.message);
        console.log("Something went wrong:" + result.status);
      }
    } catch (error) {
      setError(error.message);
    }finally {
      setIsLoading(false);
    }
  };

return (
  <div className="login-form">
    <h2>Birthday event login</h2>
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
      <OutlinedInput
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <OutlinedInput
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <Button variant="contained" color="secondary" type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  </div>
);
}