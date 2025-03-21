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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditSalesModal from "./EditSalesModal";
import GridTable from "../../components/GridTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ButtonComponent } from "../../components/index";
import {
  deleteSale,
  getFilteredRecordByEmployee,
  getSales,
  getSalesByEmployee,
} from "../../../services/sales";
import Swal from "sweetalert2";

const salesData = [
  {
    clientName: "John Doe",
    projectTitle: "MERN Chat App",
    summary: "Create Full Stack MERN Real Time Chat Application",
    upfrontAmount: "$200",
    receivedAmount: "$500",
    totalAmount: "$700",
    remainingAmount: "$200",
    paymentMethod: "Zelle",
    status: "Pending",
    currency: "USD",
    month: "March",
    year: "2025",
    startDate: "2025-03-12",
    endDate: "2025-03-12",
    leadDate: "2025-03-12",
  },
  {
    clientName: "Jane Smith",
    projectTitle: "Full Stack Learning Managemetn System",
    summary: "Create Full Stack Learning Management System",
    upfrontAmount: "$100",
    receivedAmount: "$400",
    totalAmount: "$500",
    remainingAmount: "$0",
    paymentMethod: "PayPal",
    status: "Fully Paid",
    currency: "EUR",
    month: "March",
    year: "2025",
    startDate: "2025-03-12",
    endDate: "2025-03-12",
    leadDate: "2025-03-12",
  },
  {
    clientName: "Ali Khan",
    projectTitle: "Wordpress Woocommerce Website",
    summary: "Create Full Stack Learning Management System",
    upfrontAmount: "$300",
    receivedAmount: "$600",
    totalAmount: "$900",
    remainingAmount: "$600",
    paymentMethod: "Cashapp",
    status: "Partially Paid",
    currency: "USD",
    month: "March",
    year: "2025",
    startDate: "2025-03-12",
    endDate: "2025-03-12",
    leadDate: "2025-03-12",
  },
];

const SalesTable = ({ setSelectedPage }) => {
  // Get User & Token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // State Variables
  const [saleId, setSaleId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sales, setSales] = useState([]);

  // Fetching Sales Data
  const fetchingSales = async () => {
    try {
      const { sales } = await getSalesByEmployee(token, user._id);
      setSales(sales);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingSales();
  }, []);

  // Map Sales Columns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedRows = sales.map((item) => ({
          id: item._id,
          clientName: item.clientName,
          projectTitle: item.projectTitle,
          summary: item.summary,
          upfrontAmount: item.upfrontAmount,
          receivedAmount: item.receivedAmount,
          totalAmount: item.totalAmount,
          remainingAmount: item.remainingAmount,
          paymentMethod: item.paymentMethod?.method,
          status: item.status,
          month: item.month,
          year: item.year,
          startDate: item.startDate,
          endDate: item.endDate,
          leadDate: item.leadDate,
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sales]);

  // Handle Month Change
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Handle Year Change
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Handle Status Change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle Employee Change
  const handleEmployeeChange = (event) => {
    setEmployee(event.target.value);
  };

  // Define Table Rows And Columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "projectTitle",
      headerName: "Project Title",
      flex: 1,
      minWidth: 350,
      editable: true,
    },
    {
      field: "summary",
      headerName: "Summary",
      flex: 1,
      minWidth: 250,
      editable: true,
    },
    {
      field: "upfrontAmount",
      headerName: "Upfront Amount",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "receivedAmount",
      headerName: "Received Amount",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "remainingAmount",
      headerName: "Remaining Amount",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
      minWidth: 150,
      editable: true,
      renderCell: (params) => (
        <span
          className={`px-4 py-2 font-semibold rounded-[25px] text-[#95a224] bg-[#2a250d]`}
        >
          {params.row.paymentMethod}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      editable: true,
      renderCell: (params) => (
        <span
          className={`px-4 py-2 font-semibold rounded-[25px] ${params.row.status === "Fully Paid" ? "text-[#24a24f] bg-[#0d2a1f]" : params.row.status === "Partially Paid" ? "text-[#79a7bc] bg-[#152432]" : "text-[#f43333] bg-[#3e1716]"}`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "leadDate",
      headerName: "Lead Date",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
            <BsThreeDotsVertical className="text-white" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditSale}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} className="text-red-500">
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Handle Actions Menu
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  // Edit Sale Modal
  const handleEditSale = (sale) => {
    setSaleId(selectedId);
    setSelectedSale(sale);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    handleMenuClose();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this sale? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { success, message } = await deleteSale(selectedId, token);
        if (success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            timer: 1500,
          });
          setRows(rows.filter((row) => row.id !== selectedId));
        }
      } catch (error) {
        console.error("Error deleting sale:", error);
      }
    }
  };

  // Filter Records By Employee ID
  const getFilteredByEmployee = async () => {
    try {
      const { success, sales, message } = await getFilteredRecordByEmployee(
        user._id,
        token,
        month,
        year,
        search,
        status
      );
      if (success) {
        setSales(sales);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilteredByEmployee();
  }, [month, year, status, search]);

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

      <div className="search_records flex justify-between gap-4 mb-4">
        <FormControl className="w-1/2">
          <InputLabel id="demo-simple-select-label">Employee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee}
            label="Employee"
            onChange={handleEmployeeChange}
          >
            {["Muhammad Shayan", "Hassan Raza", "Sagheer Hussain"].map(
              (employee) => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <FormControl className="w-1/2">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            {["Pending", "Fully Paid", "Partially Paid"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Search Records"
          variant="outlined"
          className="w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter_records flex gap-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            onChange={handleMonthChange}
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Month"
            onChange={handleYearChange}
          >
            {[
              2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
            ].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <GridTable
        // handleBulkDelete={handleBulkDelete}
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
          refetchSales={fetchingSales}
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
