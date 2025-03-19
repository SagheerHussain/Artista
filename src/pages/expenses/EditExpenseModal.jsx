import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const expenseCategories = [
  "Office Supplies",
  "Travel",
  "Utilities",
  "Salary",
  "Miscellaneous",
];

const EditExpenseModal = ({ open, onClose, initialData, onSubmit }) => {
  const [expenseData, setExpenseData] = useState(initialData || {});

  // Update state when initialData changes
  useEffect(() => {
    setExpenseData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(expenseData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          label="Expense Name"
          name="expenseName"
          fullWidth
          margin="dense"
          value={expenseData.expenseName || ""}
          onChange={handleChange}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          fullWidth
          margin="dense"
          value={expenseData.amount || ""}
          onChange={handleChange}
        />
        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          value={expenseData.category || ""}
          onChange={handleChange}
        >
          {expenseCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          name="date"
          type="date"
          fullWidth
          margin="dense"
          value={expenseData.date || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={expenseData.description || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseModal;
