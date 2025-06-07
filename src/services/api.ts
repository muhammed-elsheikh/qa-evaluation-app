const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || 'An error occurred');
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    const data = await this.handleResponse<{ token: string; user: any }>(response);
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await this.handleResponse<{ token: string; user: any }>(response);
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<{ user: any }>(response);
  }

  // Dashboard endpoints
  async getDashboardData() {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<{
      stats: Array<{
        title: string;
        value: string | number;
        change?: { value: number; trend: 'up' | 'down' };
        color: string;
      }>;
      activities: Array<{
        id: number;
        action: string;
        time: string;
        type: string;
      }>;
    }>(response);
  }

  // Utility methods
  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

export const apiService = new ApiService();
