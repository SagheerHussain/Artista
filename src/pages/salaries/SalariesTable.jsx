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
  Typography,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSalaryModal from "./EditSalaryModal";

const salariesData = [
  {
    employeeName: "John Doe",
    salaryAmount: "30000",
    paymentDate: "2025-03-10",
    status: "Paid",
    dollarRate: "270",
    commission: "8600",
    totalSalary: "30100",
  },
  {
    employeeName: "Jane Smith",
    salaryAmount: "4500",
    paymentDate: "2025-03-12",
    status: "Pending",
    dollarRate: "270",
    commission: "2530",
    totalSalary: "4600",
  },
  {
    employeeName: "Ali Khan",
    salaryAmount: "2800",
    paymentDate: "2025-03-15",
    status: "Paid",
    dollarRate: "270",
    commission: "6950",
    totalSalary: "2900",
  },
];

const SalariesTable = ({ setSelectedPage }) => {
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (salary) => {
    setSelectedSalary(salary);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedSalary(null);
  };

  const handleSalaryUpdate = (updatedSalary) => {
    console.log("Updated Salary:", updatedSalary);
    // Shayan Update the state or call an API here
    setEditModalOpen(false);
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
          onClick={() => setSelectedPage("/addSalary")}
        >
          Add Salary
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Employee</TableCell>
              <TableCell sx={{ color: "#fff" }}>Salary</TableCell>
              <TableCell sx={{ color: "#fff" }}>Dollar Rate</TableCell>
              <TableCell sx={{ color: "#fff" }}>Commission</TableCell>
              <TableCell sx={{ color: "#fff" }}>Total Salary</TableCell>
              <TableCell sx={{ color: "#fff" }}>Payment Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salariesData.map((salary, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(even)": { backgroundColor: "#2a2a2a" } }}
              >
                <TableCell sx={{ color: "#fff" }}>
                  {salary.employeeName}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {salary.salaryAmount}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {salary.dollarRate}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {salary.commission}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {salary.totalSalary}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {salary.paymentDate}
                </TableCell>
                <TableCell>
                  <Chip
                    label={salary.status}
                    sx={{
                      backgroundColor:
                        salary.status === "Pending" ? "#FFCA28" : "#66BB6A",
                      color: "#000",
                      borderRadius: 2,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(salary)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Salary Modal */}
      <EditSalaryModal
        open={editModalOpen}
        onClose={handleModalClose}
        initialData={selectedSalary}
        onSubmit={handleSalaryUpdate}
      />
    </Box>
  );
};

export default SalariesTable;
