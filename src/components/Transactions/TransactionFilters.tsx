import React, { useState } from 'react';
import type { TransactionFilters } from '../../api/transactions';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFilterChange: (filters: Partial<TransactionFilters>) => void;
}

const TransactionFiltersComponent: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'created', label: 'Created' },
    { value: 'pending', label: 'Pending' },
    { value: 'success', label: 'Success' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Date Created' },
    { value: 'payment_time', label: 'Payment Time' },
    { value: 'order_amount', label: 'Amount' },
    { value: 'status', label: 'Status' },
  ];

  const limitOptions = [
    { value: '10', label: '10 per page' },
    { value: '20', label: '20 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' },
  ];

  const clearFilters = () => {
    onFilterChange({
      status: '',
      school_id: '',
      start_date: '',
      end_date: '',
      sort: 'created_at',
      order: 'desc',
      page: 1,
    });
  };

  const hasActiveFilters = filters.status || filters.school_id || filters.start_date || filters.end_date;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <FunnelIcon className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="input-field"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School ID
            </label>
            <input
              type="text"
              value={filters.school_id || ''}
              onChange={(e) => onFilterChange({ school_id: e.target.value })}
              placeholder="Enter school ID"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={filters.start_date || ''}
              onChange={(e) => onFilterChange({ start_date: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={filters.end_date || ''}
              onChange={(e) => onFilterChange({ end_date: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={filters.sort || 'created_at'}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className="input-field"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <select
              value={filters.order || 'desc'}
              onChange={(e) => onFilterChange({ order: e.target.value as 'asc' | 'desc' })}
              className="input-field"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Per Page
            </label>
            <select
              value={filters.limit?.toString() || '20'}
              onChange={(e) => onFilterChange({ limit: parseInt(e.target.value) })}
              className="input-field"
            >
              {limitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFiltersComponent;

