// src/api/api.js
const API_BASE_URL = "http://localhost:8000/api";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("access_token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    credentials: "include", // keep cookies if backend also sets them
  });

  // Handle non-OK responses
  if (!response.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.error || errorMessage;
    } catch (err) {
      // response not JSON
    }
    throw new Error(errorMessage);
  }

  // Return parsed JSON
  return response.json();
};

export default apiFetch;
