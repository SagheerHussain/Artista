import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Modal, Grid, Button } from "@mui/material";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { updateExpanceCategory } from "../../../services/expense";

const EditExpenseCategoryModal = ({ open, onClose, initialData, refetchSales }) => {
  // Get User & Token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // State Variables
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState(initialData || {});

  // Update state when initialData changes
  useEffect(() => {
    setExpenseData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { success, message } = await updateExpanceCategory(
        expenseData._id,
        expenseData,
        token
      );
      if (success) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
          timer: 1500,
        });
        refetchSales();
        onClose();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "#121212",
          p: 3,
          borderRadius: 2,
          maxWidth: 800,
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          Edit Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Expense Category Name"
                name="name"
                defaultValue={expenseData.name}
                onChange={handleChange}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <ClipLoader size={28} color="#fff" /> : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditExpenseCategoryModal;
