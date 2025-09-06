// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: number;
  username: string;
  email: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for session cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(data: { username: string; email: string; password: string }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async checkSession() {
    return this.request('/auth/session');
  }

  // Product endpoints
  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(data: {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    brand?: string;
    location?: string;
    images?: string[];
  }) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserProducts() {
    return this.request('/products/user/my-products');
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(data: { product_id: number; quantity?: number }) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(id: string, data: { quantity: number }) {
    return this.request(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async removeFromCart(id: string) {
    return this.request(`/cart/${id}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE',
    });
  }

  // Order endpoints
  async createOrder(data: {
    product_id: number;
    shipping_address: string;
    payment_method: string;
    notes?: string;
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserOrders() {
    return this.request('/orders/my-orders');
  }

  async getUserSales() {
    return this.request('/orders/my-sales');
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, data: { status: string }) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
