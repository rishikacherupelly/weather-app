// WeatherChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function WeatherChart({ forecast }) {
  const data = {
    labels: forecast.list.filter((_, idx) => idx % 8 === 0).map(item =>
      new Date(item.dt_txt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.list.filter((_, idx) => idx % 8 === 0).map(item => item.main.temp),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '40px auto' }}>
      <h3>5-Day Forecast</h3>
      <Line data={data} />
    </div>
  );
}

export default WeatherChart;
