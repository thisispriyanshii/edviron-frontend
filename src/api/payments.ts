import api from './axios';

export interface CreatePaymentData {
  school_id: string;
  trustee_id?: string;
  student_info: {
    name: string;
    id: string;
    email: string;
  };
  gateway_name: string;
  custom_order_id?: string;
  order_amount: number;
}

export interface PaymentResponse {
  success: boolean;
  payment_url: string;
  order_id: string;
  collect_id?: string;
}

export interface PaymentStatus {
  order_id: string;
  custom_order_id: string;
  school_id: string;
  student_info: {
    name: string;
    id: string;
    email: string;
  };
  order_amount: number;
  transaction_amount?: number;
  status: string;
  payment_mode?: string;
  bank_reference?: string;
  payment_time?: string;
  error_message?: string;
}

export const paymentsApi = {
  createPayment: async (data: CreatePaymentData): Promise<PaymentResponse> => {
    const response = await api.post('/payments/create-payment', data);
    return response.data;
  },

  getPaymentStatus: async (orderId: string): Promise<PaymentStatus> => {
    const response = await api.get(`/payments/status/${orderId}`);
    return response.data;
  },
};

