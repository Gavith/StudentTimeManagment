import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ refresh }: { refresh?: number }) => {
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/days")
      .then(res => res.json())
      .then(data => {
        // Sort by day number if date is "July N"
        const sorted = [...data].sort((a, b) => {
          const getDay = (d: any) => parseInt((d.date || '').replace('July ', ''), 10);
          return getDay(a) - getDay(b);
        });
        setDays(sorted);
      });
  }, [refresh]);

  const labels = days.map(day => day.date);
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Hours' }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Recording",
        data: days.map(day => day.recording),
        backgroundColor: "rgba(75, 192, 192, 0.5)"
      },
      {
        label: "Study",
        data: days.map(day => day.study),
        backgroundColor: "rgba(153, 102, 255, 0.5)"
      },
      {
        label: "Computer Science",
        data: days.map(day => day.computerScience),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Wasted time",
        data: days.map(day => day.wastedTime),
        backgroundColor: "rgba(255, 159, 64, 0.5)"
      },
      {
        label: "Unnecessary works",
        data: days.map(day => day.unnecessaryWorks),
        backgroundColor: "rgba(255, 205, 86, 0.5)"
      }
    ]
  };

  // THIS IS THE IMPORTANT PART!
  return <Bar options={options} data={data} />;
};
