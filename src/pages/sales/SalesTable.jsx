import * as React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditSalesModal from "./EditSalesModal";
import { useState } from "react";

const salesData = [
  {
    clientName: "John Doe",
    upfrontAmount: "$200",
    receivedAmount: "$500",
    totalAmount: "$700",
    paymentMethod: "Zelle",
    status: "Pending",
    currency: "USD",
    saleDate: "2025-03-12",
  },
  {
    clientName: "Jane Smith",
    upfrontAmount: "$100",
    receivedAmount: "$400",
    totalAmount: "$500",
    paymentMethod: "PayPal",
    status: "Completed",
    currency: "EUR",
    saleDate: "2025-03-10",
  },
  {
    clientName: "Ali Khan",
    upfrontAmount: "$300",
    receivedAmount: "$600",
    totalAmount: "$900",
    paymentMethod: "Cashapp",
    status: "Pending",
    currency: "USD",
    saleDate: "2025-03-08",
  },
];

const SalesTable = ({ setSelectedPage }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setEditModalOpen(true);
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
          onClick={() => setSelectedPage("/addSales")}
        >
          Add Sales
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Client Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Upfront Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Received Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Total Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Payment Method</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Currency</TableCell>
              <TableCell sx={{ color: "#fff" }}>Sale Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((sale, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(even)": { backgroundColor: "#2a2a2a" } }}
              >
                <TableCell sx={{ color: "#fff" }}>{sale.clientName}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {sale.upfrontAmount}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {sale.receivedAmount}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.totalAmount}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {sale.paymentMethod}
                </TableCell>
                <TableCell>
                  <Chip
                    label={sale.status}
                    sx={{
                      backgroundColor:
                        sale.status === "Pending" ? "#FFCA28" : "#66BB6A",
                      color: "#000",
                      borderRadius: 2,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.currency}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.saleDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditSale(sale)}
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

      {/* Edit Sales Modal */}
      {selectedSale && (
        <EditSalesModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={selectedSale}
          onSubmit={(updatedSale) => {
            console.log("Updated Sale:", updatedSale);
            setEditModalOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default SalesTable;
