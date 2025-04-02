import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";

const ExpenseForm = ({ onSubmit, setSelectedPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const getExpenseCategories = async () => {
    try {
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <Typography variant="h6" gutterBottom>
        Add Expense
      </Typography>

      <div className="sm:flex gap-4">
        <div className="mb-4 w-full">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
      </div>

      <div className="sm:flex sm:gap-4">
        <div className="mb-4 w-full">
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
          >
            {["Bills", "Net Payment", "Others"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="sm:w-1/2 w-full mb-4">
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
      </div>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setSelectedPage("/reports/expenses")}
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
