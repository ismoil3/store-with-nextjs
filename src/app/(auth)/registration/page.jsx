"use client";

import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/store/auth/auth";

export default function RegistrationPage() {
  const { loading, registration, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    form: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (!acceptTerms) {
      setErrors((prev) => ({
        ...prev,
        form: "Please accept the terms and conditions",
      }));
      return;
    }

    await registration(formData);
  };

  const commonTextFieldProps = {
    variant: "outlined",
    required: true,
    fullWidth: true,
    sx: {
      "& .MuiInputLabel-root.Mui-focused": {
        color: "error.main",
      },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "error.main",
        },
        "&.Mui-focused fieldset": {
          borderColor: "error.main",
        },
      },
    },
    margin: "normal",
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
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Create an account
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 3 }}
          align="center"
        >
          Enter your details below
        </Typography>

        {errors.form && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.form}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            {...commonTextFieldProps}
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <TextField
            {...commonTextFieldProps}
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            {...commonTextFieldProps}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            {...commonTextFieldProps}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...commonTextFieldProps}
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                sx={{
                  color: "error.main",
                  "&.Mui-checked": {
                    color: "error.main",
                  },
                }}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link href="#" color="error" underline="hover">
                  Terms and Conditions
                </Link>
              </Typography>
            }
            sx={{ mt: 1 }}
          />

          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "error.main",
              height: 48,
              mt: 2,
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Link href="/login" color="error" underline="hover">
                Log in
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
