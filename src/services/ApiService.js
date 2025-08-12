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

  //  Obtener usuario autenticado
  async getCurrentUser() {
    const response = await this.client.get("/auth/me");
    return response.data;
  }

  // Crear producto
  async createProduct(productData) {
    const response = await this.client.post("/products", productData);
    return response.data;
  }

  //  Obtener productos (opcional: filtros como category, user_id, search, etc.)
  async getProducts(filters = {}) {
    const response = await this.client.get("/products", {
      params: filters,
    });
    return response.data;
  }

  //  Obtener detalle de un producto
  async getProductById(id) {
    const response = await this.client.get(`/products/${id}`);
    return response.data;
  }

  //  Actualizar producto
  async updateProduct(id, updatedData) {
    const response = await this.client.put(`/products/${id}`, updatedData);
    return response.data;
  }

  // Eliminar producto
  async deleteProduct(id) {
    const response = await this.client.delete(`/products/${id}`);
    return response.data;
  }

  // Notificaciones al vendedor
  async createNotification(data) {
    const response = await this.client.post("/notifications", data);
    return response.data;
  }

  async getNotifications() {
    const response = await this.client.get("/notifications");
    return response.data;
  }

  async markNotificationAsRead(id) {
    const response = await this.client.put(`/notifications/${id}/read`);
    return response.data;
  }

  async deleteNotification(id) {
    const response = await this.client.delete(`/notifications/${id}`);
    return response.data;
  }


  async addToFavorites(productId) {
    const response = await this.client.post("/favorites", {
      product_id: productId
    });
    return response.data;
  }

  async removeFromFavorites(productId) {
    const response = await this.client.delete(`/favorites/${productId}`);
    return response.data;
  }

  async checkFavorite(productId) {
    const response = await this.client.get(`/favorites/check/${productId}`);
    return response.data;
  }

  async getFavorites() {
    const response = await this.client.get("/favorites");
    return response.data;
  }
}

export default new ApiService();
