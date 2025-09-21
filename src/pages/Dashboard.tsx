import React, { useEffect, useState } from 'react';
import { transactionsApi } from '../api/transactions';
import type { TransactionStats } from '../api/transactions';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336']; // completed, pending, failed

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<TransactionStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await transactionsApi.getTransactionStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }
    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 grid gap-6">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl shadow p-6 bg-white">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">{stats.totalOrders}</p>
        </div>
        <div className="rounded-2xl shadow p-6 bg-white">
          <h2 className="text-xl font-semibold">Total Amount</h2>
          <p className="text-3xl mt-2">₹{stats.totalAmount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl shadow p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.statusStats}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {stats.statusStats.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
