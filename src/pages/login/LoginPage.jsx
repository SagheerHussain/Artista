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
  Login as LoginIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { loginAccount } from "../../../services/authService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAccount(formData);
      console.log(response);
      if (response.success) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "Successfully Login",
          timer: 1500,
        });
        // Stored token in localStorage
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("user",  JSON.stringify(response.user));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
    }
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
          Login Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
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
              sx: { color: "#90caf9" },
            }}
            sx={{
              sx: { color: "#90caf9" },
              "& label": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
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
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={!loading && <LoginIcon />}
            sx={{
              mt: 2,
              p: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            disabled={loading}
          >
            {loading ? <HashLoader color="#fff" size={22} /> : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, color: "#90caf9" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#64b5f6" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
