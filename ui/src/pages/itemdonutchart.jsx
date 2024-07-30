// src/components/ItemsDonutChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699']; // Customize as needed

const ItemsDonutChart = ({ items }) => {
  // Prepare the data for the chart
  const data = items.map(item => ({
    name: item.name,
    quantity: item.quantity
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="quantity"
          nameKey="name"
          innerRadius="50%"
          outerRadius="80%"
          fill="#8884d8"
          paddingAngle={5}
          label={({ name, quantity }) => `${name}: ${quantity}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ItemsDonutChart;
