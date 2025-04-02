import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import GridTable from "../../components/GridTable";
// import { getEmployeeFilteredRecord, getFilteredRecord, getExpenses } from "../../../services/expenses";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ExpenseTable = ({ setSelectedPage }) => {
  // Get User & Token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // State Variables
  const [saleId, setSaleId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Filter States
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    search: "",
  });

  // Fetch All Sales Initially
  const fetchAllExpenses = async () => {
    try {
      const { expenses } = await getExpenses(token);
      setExpenses(expenses);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchAllSales();
  // }, []);

  // Fetch Filtered Sales (whenever filter changes)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchFilteredSales = async () => {
        if (filters.month || filters.year || filters.search) {
          try {
            const { success, expenses } =
              user?.role === "employee"
                ? await getEmployeeFilteredRecord(
                    token,
                    filters.month,
                    filters.year,
                    filters.search
                  )
                : await getFilteredRecord(
                    token,
                    filters.month,
                    filters.year,
                    filters.search
                  );
            if (success) {
              setExpenses(expenses);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      fetchFilteredSales();
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [filters]);

  // Format Sales Data
  useEffect(() => {
    const formattedRows = expenses.reverse().map((item, index) => ({
      id: item._id,
      No: index + 1,
      title: item.title,
      description: item.description,
      amount: item.amount,
      status: item.status,
      month: item.month,
      year: item.year,
    }));
    setRows(formattedRows);
  }, [expenses]);

  // Handle Dropdowns & Inputs
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Edit Expense Modal
  const handleEditExpense = (id) => {
    setSaleId(id);
    const expense = expenses.find((s) => id === s._id);
    setSelectedSale(expense);
    setEditModalOpen(true);
  };

  // Delete Expense
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this expense? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { success, message } = await deleteExpense(id, token);
        if (success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            timer: 1500,
          });
          setRows(rows.filter((row) => row.id !== id));
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  // Table Columns
  const columns = [
    { field: "No", headerName: "Index", flex: 1, minWidth: 150 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    { field: "amount", headerName: "Amount", flex: 1, minWidth: 150 },
    { field: "month", headerName: "Month", flex: 1, minWidth: 150 },
    { field: "year", headerName: "Year", flex: 1, minWidth: 150 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditSale(params.row.id)}>
            <FaPencilAlt size={16} className="text-[#71717a]" />
          </IconButton>

          {user?.role === "employee" && (
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <MdDelete size={18} className="text-[#bc134f]" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#121212", borderRadius: 2 }}>
      {/* Add Sales Button */}

      <Box
        sx={{ display: "flex", justifyContent: "end", marginBottom: "20px" }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setSelectedPage("/addExpense")}
        >
          Add Expense
        </Button>
      </Box>

      {/* Filters */}
      <div className="filter md:flex justify-between gap-4 mb-4">
        <div className="search md:mb-0 mb-4 w-full">
          <TextField
            fullWidth
            label="Search Records"
            variant="outlined"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        <div className="month md:mb-0 mb-4 w-full">
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={filters.month}
              label="Month"
              onChange={(e) => handleFilterChange("month", e.target.value)}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="year md:mb-0 mb-4 w-full">
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={filters.year}
              label="Year"
              onChange={(e) => handleFilterChange("year", e.target.value)}
            >
              {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Sales Table */}
      <GridTable
        selectedRows={selectedRows}
        rows={rows}
        columns={columns}
        setSelectedRows={setSelectedRows}
      />

      {/* Edit Sales Modal */}
      {selectedSale && (
        <EditSalesModal
          open={editModalOpen}
          saleId={saleId}
          refetchSales={fetchAllSales}
          onClose={() => setEditModalOpen(false)}
          initialData={selectedSale}
          onSubmit={() => {
            setEditModalOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default ExpenseTable;
