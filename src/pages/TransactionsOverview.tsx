import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { transactionsApi } from '../api/transactions';
import type { Transaction, TransactionFilters, TransactionStats } from '../api/transactions';
import Layout from '../components/Layout/Layout';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionFiltersComponent from '../components/Transactions/TransactionFilters';
import StatsCards from '../components/Transactions/StatsCards';

const TransactionsOverview: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState<TransactionFilters>({
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sort: searchParams.get('sort') || 'created_at',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    status: searchParams.get('status') || '',
    start_date: searchParams.get('start_date') || '',
    end_date: searchParams.get('end_date') || '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionsApi.getAllTransactions(filters);
      setTransactions(response.transactions);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await transactionsApi.getTransactionStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);

    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  const handleSort = (sort: string) => {
    const order = filters.sort === sort && filters.order === 'desc' ? 'asc' : 'desc';
    handleFilterChange({ sort, order });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {stats && <StatsCards stats={stats} />}

        <div className="card">
          <TransactionFiltersComponent
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <TransactionTable
            transactions={transactions}
            loading={loading}
            onSort={handleSort}
            currentSort={filters.sort}
            sortOrder={filters.order}
            pagination={{
              page: filters.page || 1,
              limit: filters.limit || 20,
              total: transactions.length,
              pages: Math.ceil(transactions.length / (filters.limit || 20)),
            }}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsOverview;
