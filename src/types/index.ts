export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  school_id?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  school_id?: string;
  role?: string;
}

export interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount?: number;
  status: string;
  custom_order_id: string;
  student_info: {
    name: string;
    id: string;
    email: string;
  };
  payment_mode?: string;
  bank_reference?: string;
  payment_time?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  status?: string;
  school_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TransactionResponse {
  transactions: Transaction[];
  pagination: PaginationInfo;
}

export interface TransactionStats {
  totalOrders: number;
  totalAmount: number;
  statusStats: Array<{
    _id: string;
    count: number;
  }>;
}

export type TransactionStatus = 'created' | 'pending' | 'success' | 'failed' | 'cancelled';

export interface School {
  id: string;
  name: string;
  address?: string;
  contact?: string;
}

