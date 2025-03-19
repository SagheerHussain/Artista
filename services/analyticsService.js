import axios from "axios";

export const getRevenue = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/revenue`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getTotalExpance = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/expences/expense/total-expance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getTotalRecievedAmount = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/total-received-amount`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getPendingAmount = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/pending-amount`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getClients = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/unique-clients`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getRevenueByEmployee = async (id, token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/employee/revenue/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getRecievedAmountByEmployee = async (id, token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/sales/employee/total-received-amount/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

\