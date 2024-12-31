import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/modules");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedInUser = await login({ email, password });
    if (loggedInUser) {
      navigate("/modules");
    } else {
      console.error("Login failed");
      alert("Login failed. Please check your credentials.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div id="loginForm">
        <ul>
          <li>
            <h2>&nbsp;&nbsp;Sign In</h2>
          </li>
          <li>
            <TextField
              required
              id="email-input"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            &nbsp;&nbsp;
            <Button type="submit" variant="contained">
              &nbsp;&nbsp;Sign In&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => navigate("/registerpage")}
              variant="contained"
            >
              Register
            </Button>
          </li>
        </ul>
      </div>
    </Box>
  );
}
