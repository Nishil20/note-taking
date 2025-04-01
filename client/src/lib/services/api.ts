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
    const contentType = response.headers.get('content-type');
    let errorData;
    
    try {
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { message: await response.text() };
      }
    } catch (e) {
      errorData = { message: 'Failed to parse response' };
    }

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(
        errorData.message || 
        errorData.error || 
        `Request failed with status ${response.status}`
      );
    }

    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      throw new Error('Invalid response format: not JSON');
    }

    const data = errorData; // We already parsed the response
    
    // Handle both wrapped and unwrapped responses
    if (data.hasOwnProperty('data') && data.hasOwnProperty('success')) {
      // Response is wrapped in an ApiResponse format
      if (!data.success) {
        console.error('API Error (wrapped):', data);
        throw new Error(data.error || 'An error occurred');
      }
      return data.data as T;
    }

    // Response is the data itself
    return data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    console.log(`API Request - GET ${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: this.getHeaders(),
    });
    console.log(`API Response - GET ${endpoint}:`, response.status);
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    console.log(`API Request - POST ${endpoint}:`, body);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    console.log(`API Response - POST ${endpoint}:`, response.status);
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    console.log(`API Request - PUT ${endpoint}:`, body);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    console.log(`API Response - PUT ${endpoint}:`, response.status);
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    console.log(`API Request - DELETE ${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    console.log(`API Response - DELETE ${endpoint}:`, response.status);
    return this.handleResponse<T>(response);
  }
}

export const api = new ApiClient(); 