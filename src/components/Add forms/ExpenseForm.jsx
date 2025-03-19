import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";

const ExpenseForm = ({ onSubmit, setSelectedPage }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6" gutterBottom>
        Add Expense
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          required
        />
      </Box>

      <TextField
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={handleChange}
        fullWidth
        required
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setSelectedPage("/reports/sales")}
          color="secondary"
        >
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ExpenseForm;
