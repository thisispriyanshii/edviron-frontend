import React, { useState } from 'react';
import { transactionsApi } from '../api/transactions';
import type { Transaction } from '../api/transactions';
import Layout from '../components/Layout/Layout';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const StatusCheck: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setTransaction(null);

    try {
      const result = await transactionsApi.getTransactionStatus(orderId.trim());
      setTransaction(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transaction not found');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      created: { color: 'bg-blue-100 text-blue-800', label: 'Created' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      success: { color: 'bg-green-100 text-green-800', label: 'Success' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' },
      cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.created;
    
    return (
      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Status Check</h1>
          <p className="text-gray-600">Enter an order ID to check the transaction status</p>
        </div>

        <div className="card">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter order ID (e.g., ORDER_001)"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading || !orderId.trim()}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>{loading ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {transaction && (
            <div className="mt-6 space-y-6">
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Order ID</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{transaction.custom_order_id}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">{getStatusBadge(transaction.status)}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Student Name</label>
                      <p className="mt-1 text-sm text-gray-900">{transaction.student_info.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Student Email</label>
                      <p className="mt-1 text-sm text-gray-900">{transaction.student_info.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Student ID</label>
                      <p className="mt-1 text-sm text-gray-900">{transaction.student_info.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">School ID</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{transaction.school_id}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Order Amount</label>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {formatCurrency(transaction.order_amount)}
                      </p>
                    </div>
                    
                    {transaction.transaction_amount && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Transaction Amount</label>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {formatCurrency(transaction.transaction_amount)}
                        </p>
                      </div>
                    )}
                    
                    {transaction.payment_mode && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Payment Mode</label>
                        <p className="mt-1 text-sm text-gray-900">{transaction.payment_mode}</p>
                      </div>
                    )}
                    
                    {transaction.bank_reference && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Bank Reference</label>
                        <p className="mt-1 text-sm text-gray-900 font-mono">{transaction.bank_reference}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {transaction.payment_time && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Payment Time</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(transaction.payment_time).toLocaleString()}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created At</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {transaction.error_message && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-500">Error Message</label>
                    <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-700">{transaction.error_message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StatusCheck;

