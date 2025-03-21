import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  Select,
  Box,
  InputLabel,
} from "@mui/material";

const AddSalaryForm = ({ setSelectedPage }) => {
  const [formData, setFormData] = useState({
    employee: "",
    amount: 0,
    bonus: 0,
    status: "",
    paidDate: "",
  });

  const DOLLAR_RATE = 287; // Fixed dollar rate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeEmployee = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Calculate Total Salary
  const calculateTotalSalary = () => {
    const commissionPercent = Number(formData.amount) || 0;
    const bonus = Number(formData.bonus) || 0;

    const commissionInDollar = (1000 * commissionPercent) / 100;
    const commissionInPKR = commissionInDollar * 280;
    const totalSalary = commissionInPKR + bonus;

    return totalSalary.toFixed(0); // No decimal points
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSalary = calculateTotalSalary();
    console.log("Salary Data:", { ...formData, totalAmount: totalSalary });
  };

  return (
    <Box sx={{ backgroundColor: "#121212", p: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl className="w-full">
              <InputLabel>Employee</InputLabel>
              <Select
                name="employee"
                onChange={handleChangeEmployee}
                label="Employee"
              >
                {[{_id: "67d7f60e6048f2e2ca739df8", name: "Muhammad Shayan"}, {_id: "67d7f60e6048f2e2ca739df9", name: "Hassan Raza"}, {_id: "67d7f60e6048f2e2ca739dfa", name: "Sagheer Hussain"}].map(
                  (employee) => (
                    <MenuItem key={employee._id} value={employee._id}>
                      {employee.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Commission in % e.g. 20%"
              name="amount"
              type="number"
              value={formData.amount}
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
              value={280}
              disabled
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bonus in PKR (optional)"
              name="bonus"
              type="number"
              value={formData.bonus}
              onChange={handleChange}
              sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Total Amount in PKR"
              name="totalAmount"
              type="number"
              value={calculateTotalSalary()}
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
              label="Paid Date"
              name="paidDate"
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

