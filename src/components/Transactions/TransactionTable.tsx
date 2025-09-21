import React from 'react';
import type { Transaction } from '../../api/transactions';
import { format } from 'date-fns';
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onSort: (sort: string) => void;
  currentSort?: string;
  sortOrder?: 'asc' | 'desc';
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  onSort,
  currentSort,
  sortOrder,
  pagination,
  onPageChange,
}) => {
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
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const SortButton: React.FC<{ sortKey: string; children: React.ReactNode }> = ({ sortKey, children }) => {
    const isActive = currentSort === sortKey;
    return (
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900"
      >
        <span>{children}</span>
        {isActive ? (
          sortOrder === 'asc' ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading transactions...</span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No transactions found</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your filters</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton sortKey="custom_order_id">Order ID</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton sortKey="student_info.name">Student</SortButton>
              </th>
              <th className="px-6 py-3 text-left">School ID</th>
              <th className="px-6 py-3 text-left">
                <SortButton sortKey="order_amount">Amount</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton sortKey="status">Status</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Payment Mode</th>
              <th className="px-6 py-3 text-left">
                <SortButton sortKey="payment_time">Payment Time</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Bank Reference</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.collect_id} className="hover:bg-gray-50">
                <td className="table-cell font-mono text-sm">
                  {transaction.custom_order_id}
                </td>
                <td className="table-cell">
                  <div>
                    <div className="font-medium text-gray-900">
                      {transaction.student_info?.name ?? '-'}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {transaction.student_info?.email ?? '-'}
                    </div>
                  </div>
                </td>
                <td className="table-cell font-mono text-sm">
                  {transaction.school_id}
                </td>
                <td className="table-cell">
                  <div>
                    <div className="font-medium text-gray-900">
                      {formatCurrency(transaction.order_amount)}
                    </div>
                    {transaction.transaction_amount && (
                      <div className="text-gray-500 text-sm">
                        Paid: {formatCurrency(transaction.transaction_amount)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="table-cell">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="table-cell text-sm text-gray-500">
                  {transaction.payment_mode || '-'}
                </td>
                <td className="table-cell text-sm text-gray-500">
                  {transaction.payment_time
                    ? format(new Date(transaction.payment_time), 'MMM dd, yyyy HH:mm')
                    : '-'}
                </td>
                <td className="table-cell font-mono text-sm text-gray-500">
                  {transaction.bank_reference || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{pagination.total}</span>{' '}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i;
                if (pageNum > pagination.pages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pageNum === pagination.page
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;

