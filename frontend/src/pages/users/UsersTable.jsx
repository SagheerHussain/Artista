import React from "react";
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
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const usersData = [
  {
    name: "Muslim",
    email: "muslim@artistadigitals.com",
    totalClients: 15,
    totalSales: "$750",
  },
  {
    name: "Hasnain",
    email: "hasnain@artistadigitals.com",
    totalClients: 20,
    totalSales: "$510",
  },
];

const UsersTable = ({ setSelectedPage }) => {
  return (
    <Box sx={{ padding: 3, backgroundColor: "#121212" }}>
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
          onClick={() => setSelectedPage("/addUser")}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Email", "Total Clients", "Total Sales", "Actions"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((row, index) => (
              <TableRow key={index} sx={{ borderBottom: "2px solid #333" }}>
                <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.email}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {row.totalClients}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{row.totalSales}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
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
    </Box>
  );
};

export default UsersTable;
