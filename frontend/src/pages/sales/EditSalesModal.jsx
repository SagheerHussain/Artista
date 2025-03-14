import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
  Modal,
} from "@mui/material";

const EditSalesModal = ({ open, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    upfrontAmount: "",
    receivedAmount: "",
    remainingAmount: "",
    totalAmount: "",
    paymentMethod: "",
    description: "",
    leadDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      remainingAmount:
        name === "receivedAmount" || name === "totalAmount"
          ? parseFloat(prevData.totalAmount || 0) - parseFloat(value || 0)
          : prevData.remainingAmount,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "#121212",
          p: 3,
          borderRadius: 2,
          maxWidth: 500,
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          Edit Sales
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Upfront Amount"
                name="upfrontAmount"
                type="number"
                value={formData.upfrontAmount}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Received Amount"
                name="receivedAmount"
                type="number"
                value={formData.receivedAmount}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Remaining Amount"
                name="remainingAmount"
                type="number"
                value={formData.remainingAmount}
                disabled
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Total Amount"
                name="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              >
                {["Cash", "Bank Transfer", "Credit Card"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lead Date"
                name="leadDate"
                type="date"
                value={formData.leadDate}
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
            <Button variant="contained" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditSalesModal;
