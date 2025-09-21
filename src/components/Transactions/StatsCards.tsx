import React from 'react';
import type { TransactionStats } from '../../api/transactions';
import { 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface StatsCardsProps {
  stats: TransactionStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const getStatusCount = (status: string) => {
    const statusStat = stats.statusStats.find(s => s._id === status);
    return statusStat ? statusStat.count : 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Amount',
      value: formatCurrency(stats.totalAmount),
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Successful',
      value: getStatusCount('success').toLocaleString(),
      icon: CheckCircleIcon,
      color: 'bg-emerald-500',
    },
    {
      title: 'Failed',
      value: getStatusCount('failed').toLocaleString(),
      icon: XCircleIcon,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="flex items-center">
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

