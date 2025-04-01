// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiError {
  message: string;
  errors?: any[];
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  errors?: any[];
}

class ApiClient {
  private getAuthToken(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.token;
    }
    return null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || 'An error occurred');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: not JSON');
    }

    const data = await response.json();
    
    // Handle both wrapped and unwrapped responses
    if (data.hasOwnProperty('data') && data.hasOwnProperty('success')) {
      // Response is wrapped in an ApiResponse format
      if (!data.success) {
        throw new Error(data.error || 'An error occurred');
      }
      return data.data as T;
    }

    // Response is the data itself
    return data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

export const api = new ApiClient(); 