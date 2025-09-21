import api from './axios';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  school_id?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    school_id?: string;
  };
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

