import axios from "axios";

// Get All Sales
export const getSales = async (token) => {
  const response =  await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Get Sale By Id
export const getSaleById = async (id, token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/sale/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(response.data);
  return response.data;
};

// Get Sales By Employee
export const getSalesByEmployee = async (token, id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/employee/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Get Employee Current Sales Amount
export const getEmployeeCurrentSalesAmount = async (id, token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/employee/current-sales-amount/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Get Employee Filtered Sales
export const getFilteredRecordByEmployee = async (id, token, month, year, search, status) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/employee/filter-sales/${id}?month=${month}&year=${year}&search=${search}&status=${status}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(response.data);
  return response.data;
};

// Get Past Sales
export const getPastSales = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/past-sales`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Create Sale
export const createSale = async (data, token) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/sales`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Update Sale
export const updateSale = async (id, data, token) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/sales/update/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Delete Sale
export const deleteSale = async (id, token) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/sales/delete/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Fetch Payment Methods
export const getPaymentMethods = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/payment-method`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};