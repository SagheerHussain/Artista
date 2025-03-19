import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditExpenseModal from "./EditExpenseModal";

const expenses = [
  {
    amount: "$200",
    description: "Office Supplies",
    date: "2025-03-12",
    status: "pending",
  },
  {
    amount: "$500",
    description: "Internet Bill",
    date: "2025-03-10",
    status: "completed",
  },
  {
    amount: "$1000",
    description: "Software Subscription",
    date: "2025-03-08",
    status: "pending",
  },
];

const ExpenseTable = ({ setSelectedPage }) => {
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#121212", borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setSelectedPage("/addExpense")}
        >
          Add Expense
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1E1E1E", color: "#fff", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Description</TableCell>
              <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>
                  {expense.description}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{expense.amount}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{expense.date}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditExpense(expense)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={selectedExpense}
        onSubmit={(updatedExpense) => {
          console.log("Updated Expense:", updatedExpense);
          setOpen(false);
        }}
      />
    </Box>
  );
};

export default ExpenseTable;
