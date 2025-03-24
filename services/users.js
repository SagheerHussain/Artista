import axios from "axios";

// Get Employees
export const getEmployees = async (token) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};