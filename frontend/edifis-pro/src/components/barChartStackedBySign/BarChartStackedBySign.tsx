import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Mission {
  task: string;
  startDate: string;
  endDate: string;
}

interface ChartData {
  day: string;
  [task: string]: number;
}

const MissionChart: React.FC = () => {
  const data: Mission[] = [
    {
      task: 'Plomberie',
      startDate: '2021-01-01T08:00:00',
      endDate: '2021-01-01T12:00:00',
    },
    {
      task: 'Plomberie',
      startDate: '2021-01-01T14:00:00',
      endDate: '2021-01-01T20:00:00',
    },
    {
      task: 'Electricité',
      startDate: '2021-01-02T09:00:00',
      endDate: '2021-01-02T11:00:00',
    },
    {
      task: 'Maçonnerie',
      startDate: '2021-01-03T10:00:00',
      endDate: '2021-01-03T14:00:00',
    },
    {
      task: 'Peinture',
      startDate: '2021-01-04T13:00:00',
      endDate: '2021-01-04T17:00:00',
    },
  ];

  // Fonction pour générer les données à afficher sur le graphique
  const generateChartData = (data: Mission[]): ChartData[] => {
    const chartData: { [key: string]: { [task: string]: { startHour: number; endHour: number } } } = {};

    data.forEach((mission) => {
      const { task, startDate, endDate } = mission;

      const start = new Date(startDate);
      const end = new Date(endDate);

      const day = start.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      const startHour = start.getHours(); // Extract hours from start date
      const endHour = end.getHours(); // Extract hours from end date

      if (!chartData[day]) {
        chartData[day] = {};
      }

      chartData[day][task] = { startHour, endHour };
    });

    const chartArray: ChartData[] = Object.keys(chartData).map((day) => {
      const dayData: ChartData = { day };
      Object.keys(chartData[day]).forEach((task) => {
        const { startHour, endHour } = chartData[day][task];
        dayData[task] = endHour - startHour; // Durée de la mission en heures
      });
      return dayData;
    });

    return chartArray;
  };

  // Générer les données à afficher
  const chartData = generateChartData(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((mission, index) => (
          <Bar
            key={index}
            dataKey={mission.task}
            fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MissionChart;
