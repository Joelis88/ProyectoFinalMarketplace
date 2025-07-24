// import API_CONFIG from "../config/api";
// import axios from 'axios';

// class ApiService {
//   constructor() {
//     this.baseURL = API_CONFIG.BASE_URL;
//   }

//   get token() {
//     return localStorage.getItem("token");
//   }

//   getHeaders() {
//     const headers = {
//       "Content-Type": "application/json",
//       ...API_CONFIG.HEADERS,
//     };
//     const token = this.token;
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }
//     return headers;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;
//     const config = {
//       headers: this.getHeaders(),
//       ...options,
//     };

//     try {
//       const response = await fetch(url, config);
//       const text = await response.text();
//       const data = text ? JSON.parse(text) : {};

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem("token");
//           throw new Error("Token inválido o expirado");
//         }
//         throw new Error(data.error || "Error en la petición");
//       }

//       return data;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   }

//   async login(credentials) {
//     const response = await this.request("/auth/login", {
//       method: "POST",
//       body: JSON.stringify(credentials),
//     });

//     if (response.data?.token) {
//       localStorage.setItem("token", response.data.token);
//     }

//     return response;
//   }

//   async logout() {
//     localStorage.removeItem("token");
//   }

//   async getCurrentUser() {
//     return this.request("/auth/me");
//   }

//   async createProduct(productData) {
//     return this.request("/products", {
//       method: "POST",
//       body: JSON.stringify(productData),
//     });
//   }


//   async getProducts(params = {}) {
//     const token = this.token;
//     try {
//       const response = await axios.get(`${this.baseURL}/products`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });
//       return response.data; 
//     } catch (error) {
//       console.error("API getProducts error:", error);
//       throw error;
//     }
//   }
// }
// export default new ApiService();


import axios from "axios";
import API_CONFIG from "../config/api";

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        ...API_CONFIG.HEADERS,
      },
    });

    // Interceptor para agregar token en cada request
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // 🔐 LOGIN
  async login(credentials) {
    const response = await this.client.post("/auth/login", credentials);
    const token = response.data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return response.data;
  }

  // 🔓 LOGOUT
  logout() {
    localStorage.removeItem("token");
  }

  // 👤 Obtener usuario autenticado
  async getCurrentUser() {
    const response = await this.client.get("/auth/me");
    return response.data;
  }

  // 📦 Crear producto
  async createProduct(productData) {
    const response = await this.client.post("/products", productData);
    return response.data;
  }

  // 🔍 Obtener productos (opcional: filtros como category, user_id, search, etc.)
  async getProducts(filters = {}) {
    const response = await this.client.get("/products", {
      params: filters,
    });
    return response.data;
  }

  // 📄 Obtener detalle de un producto
  async getProductById(id) {
    const response = await this.client.get(`/products/${id}`);
    return response.data;
  }

  // ✏️ Actualizar producto
  async updateProduct(id, updatedData) {
    const response = await this.client.put(`/products/${id}`, updatedData);
    return response.data;
  }

  // 🗑️ Eliminar producto
  async deleteProduct(id) {
    const response = await this.client.delete(`/products/${id}`);
    return response.data;
  }
}

export default new ApiService();