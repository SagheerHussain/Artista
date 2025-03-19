import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const AddSalaryForm = ({ setSelectedPage }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    salary: "",
    dollarRate: "220", // Example default value
    commission: "",
    totalSalary: "",
    status: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      if (name === "salary" || name === "commission") {
        updatedData.totalSalary =
          parseFloat(updatedData.salary || 0) +
          parseFloat(updatedData.dollarRate || 0) *
            parseFloat(updatedData.commission || 0);
      }
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salary Data:", formData);
  };

  return (
    <Box sx={{ backgroundColor: "#121212", p: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Current Dollar Rate"
              name="dollarRate"
              type="number"
              value={formData.dollarRate}
              disabled
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Commission in Dollar"
              name="commission"
              type="number"
              value={formData.commission}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Total Salary"
              name="totalSalary"
              type="number"
              value={formData.totalSalary}
              disabled
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            >
              {["Paid", "Pending"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
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
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddSalaryForm;
