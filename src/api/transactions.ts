import api from './axios';

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

export interface TransactionResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TransactionStats {
  totalOrders: number;
  totalAmount: number;
  statusStats: Array<{
    _id: string;
    count: number;
  }>;
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

export const transactionsApi = {
  getAllTransactions: async (filters: TransactionFilters = {}): Promise<TransactionResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  getTransactionsBySchool: async (schoolId: string, filters: TransactionFilters = {}): Promise<TransactionResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/transactions/school/${schoolId}?${params.toString()}`);
    return response.data;
  },

  getTransactionStatus: async (customOrderId: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/status/${customOrderId}`);
    return response.data;
  },

  getTransactionStats: async (): Promise<TransactionStats> => {
    const response = await api.get('/transactions/stats');
    return response.data;
  },
};

