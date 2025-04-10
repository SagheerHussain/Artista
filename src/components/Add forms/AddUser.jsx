import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import { registerAccount } from "../../../services/authService";
import { ClipLoader } from "react-spinners";

const AddUser = ({ setSelectedPage }) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerAccount(formData);

      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        Swal.fire({
          icon: "error",
          text: "All Fields are required",
          timer: 1500,
        });
        setLoading(false);
        return;
      }

      if (response.success) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "Successfully Register Account",
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/users");
        }, 2500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Failed to Register Account",
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#121212", p: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleFileChange}
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
        </Grid>

        <Box
          mt={2}
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSelectedPage("/reports/salaries")}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Add User"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUser;
