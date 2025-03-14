import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonAdd as RegisterIcon,
} from "@mui/icons-material";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#1E1E1E",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, color: "#90caf9" }}
        >
          Create an account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="outlined"
            margin="normal"
            value={formData.fullName}
            onChange={handleChange}
            required
            InputProps={{
              sx: { color: "white" },
            }}
            sx={{
              "& label": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                "& input": { color: "white" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              sx: { color: "white" },
            }}
            sx={{
              "& label": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                "& input": { color: "white" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              sx: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "#90caf9" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& label": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                "& input": { color: "white" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              sx: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{ color: "#90caf9" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& label": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                "& input": { color: "white" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<RegisterIcon />}
            sx={{
              mt: 2,
              p: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Register
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, color: "#90caf9" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#64b5f6" }}>
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
