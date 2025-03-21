import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditSalaryModal from "./EditSalaryModal";
import GridTable from "../../components/GridTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

const salariesData = [
  {
    employee: "John Doe",
    amount: "30000",
    status: "Paid",
    paidDate: "2025-03-10",
    bonus: "270",
    totalAmount: "8600",
  },
  {
    employee: "Jane Smith",
    amount: "4500",
    status: "Pending",
    paidDate: "2025-03-12",
    bonus: "270",
    totalAmount: "4600",
  },
  {
    employee: "Ali Khan",
    amount: "2800",
    status: "Paid",
    paidDate: "2025-03-15",
    bonus: "270",
    totalAmount: "2900",
  },
];

const SalariesTable = ({ setSelectedPage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle Actions Menu
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  // Map Sales Columns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedRows = salariesData.map((item, index) => ({
          id: index + 1,
          employee: item.employee,
          amount: item.amount,
          status: item.status,
          paidDate: item.paidDate,
          bonus: item.bonus,
          totalAmount: item.totalAmount,
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define Table Rows And Columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
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
      renderCell: (params) => (
        <span
          className={`px-4 py-2 font-semibold rounded-[25px] ${params.row.status === "Paid" ? "text-[#24a24f] bg-[#0d2a1f]" : "text-[#79a7bc] bg-[#152432]"}`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "paidDate",
      headerName: "Paid Date",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "bonus",
      headerName: "Bonus",
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
            <MenuItem onClick={handleEditSalary}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} className="text-red-500">
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Edit Salary
  const handleEditSalary = (salary) => {
    setSelectedSalary(salary);
    setEditModalOpen(true);
  };

  // Delete Salary
  const handleDelete = () => {};

  // Handle Modal Close
  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedSalary(null);
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

      <div className="search_records grid grid-cols-3 gap-4">
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Employee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={employee}
            label="Employee"
            // onChange={handleEmployeeChange}
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={month}
            label="Month"
            // onChange={handleMonthChange}
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
            // value={year}
            label="Month"
            // onChange={handleYearChange}
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
        selectedRows={selectedRows}
        rows={rows}
        columns={columns}
        setSelectedRows={setSelectedRows}
      />

      {/* Edit Salary Modal */}
      <EditSalaryModal
        open={editModalOpen}
        onClose={handleModalClose}
        initialData={selectedSalary}
      />
    </Box>
  );
};

export default SalariesTable;
