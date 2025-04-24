'use client';
import { useFullYearIncomExpenseQuery } from '@/src/redux/api/transactionApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export default function BarChartComponent() {
  const { data: chartData } = useFullYearIncomExpenseQuery(new Date().getFullYear());
  // const { data: chartData } = useFullYearIncomExpenseQuery('2025');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" name="Income" />
        <Bar dataKey="expense" fill="#ff7373" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
