import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirm) {
      const registered = await register({ email, password });
      if (registered) {
        navigate("/loginpage");
      } else {
        console.error("Registration failed");
        alert("Registration failed.");
      }
    } else console.error("Password doesn't match!");
  };

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
            <h2>&nbsp;&nbsp;Create an Account</h2>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="confirm-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              color={confirm === password && confirm != "" ? "success" : ""}
            />
          </li>
          <li>
            <Button type="submit" variant="contained">
            &nbsp;&nbsp;Register&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={() => navigate("/loginpage")} variant="contained">
              Login Page
            </Button>
          </li>
        </ul>
      </div>
    </Box>
  );
}
