import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("EpicEatExpressAccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const fetchProducts = async () => {
  try {
    const response = await api.get("/getfood");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchProductsbyCategory = async (query) => {
  try {
    const response = await api.get(`/getfood?category=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductDetails = async (id) => await api.get(`/getfood/${id}`);

export const addToCart = async (data) => {
  try {
    const response = await api.post("/addcart", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get("/getcart");
    console.log("response get cart", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const removeCartItem = async (data) => {
  try {
    const response = await api.delete("/removecartitem", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
