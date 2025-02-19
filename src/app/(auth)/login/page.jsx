"use client";
import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/store/auth/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, setError, logIn, loading } = useAuth();
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");

    const loginUser = {
      userName: email,
      password: password,
    };
    await logIn(loginUser);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Log in to Exclusive
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Enter your details below
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <form onSubmit={handleLogIn}>
          <TextField
            label="user name"
            variant="outlined"
            required
            fullWidth
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: "red",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: "red",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ textAlign: "center", mt: 1, mb: 2 }}>
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
            <Link href="#" color="error" variant="body2" underline="hover">
              Forgot Password?
            </Link>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "error.main", height: 48 }}
            type="submit"
            disabled={loading}
          >
            Log In
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center",}}>
          <Typography variant="body2" color="textSecondary">
            Already have account? 
            <Link href="/registration" style={{marginLeft:"10px"}} color="error" underline="hover">
               registration
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
