import React, { useEffect, useState } from "react";
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
import { getSales } from "../../../services/sales";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [employee, setEmployee] = useState("");
  const [sales, setSales] = useState([]);

  // Fetching Sales Data
  const fetchingSales = async () => {
    try {
      const { success, sales, message } = await getSales(token);
      console.log("inside == >", sales)
      setSales(sales);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingSales();
  }, [])
  
  // Fetch Sales Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getBooks();
        const formattedRows = sales.map((item, index) => ({
          id: item._id || index + 1,
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
  }, [fetchingSales]);

  // Handle Month Change
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Handle Year Change
  const handleYearChange = (event) => {
    setYear(event.target.value);
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
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      editable: true,
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
    // setSelectedSale(sale);
    // setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    // setSelectedId(id);
    // setDeleteModalOpen(true);
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

      <div className="search_records flex justify-between gap-4 mb-4">
        {/* <FormControl className="w-1/2">
          <InputLabel id="demo-simple-select-label">Employees</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee}
            label="Employee"
            onChange={handleEmployeeChange}
          >
            {[
              "Muhammad Shayan",
              "Hassan Raza",
              "Muhammad Rafay"
            ].map((employee) => (
              <MenuItem key={employee} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <TextField
          id="outlined-basic"
          label="Search Records"
          variant="outlined"
          className="w-[30%]"
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
        <ButtonComponent label="Filter" onButtonClick={() => {}} />
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
