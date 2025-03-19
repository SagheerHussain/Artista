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

const salaryStatuses = ["Paid", "Pending"];

const EditSalaryModal = ({ open, onClose, initialData, onSubmit }) => {
  const [salaryData, setSalaryData] = useState(initialData || {});

  useEffect(() => {
    setSalaryData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setSalaryData({ ...salaryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(salaryData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Salary</DialogTitle>
      <DialogContent>
        <TextField
          label="Employee Name"
          name="employeeName"
          fullWidth
          margin="dense"
          value={salaryData.employeeName || ""}
          onChange={handleChange}
        />
        <TextField
          label="Salary Amount"
          name="salaryAmount"
          type="number"
          fullWidth
          margin="dense"
          value={salaryData.salaryAmount || ""}
          onChange={handleChange}
        />
        <TextField
          label="Dollar Rate"
          name="dollarRate"
          type="number"
          fullWidth
          margin="dense"
          value={salaryData.dollarRate || ""}
          onChange={handleChange}
        />
        <TextField
          label="Commission"
          name="commission"
          type="number"
          fullWidth
          margin="dense"
          value={salaryData.commission || ""}
          onChange={handleChange}
        />
        <TextField
          label="Total Salary"
          name="totalSalary"
          type="number"
          fullWidth
          margin="dense"
          value={salaryData.totalSalary || ""}
          onChange={handleChange}
        />
        <TextField
          label="Payment Date"
          name="paymentDate"
          type="date"
          fullWidth
          margin="dense"
          value={salaryData.paymentDate || ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          margin="dense"
          value={salaryData.status || ""}
          onChange={handleChange}
        >
          {salaryStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
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

export default EditSalaryModal;
