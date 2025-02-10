import { formatNumber } from "@/utils";
import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ transactions }) => {
  const groupedData = transactions.reduce((acc, transaction) => {
    const { date, amount, transaction_type } = transaction;

    if (transaction_type === "deposit") {
      const transactionDate = new Date(date).toLocaleDateString();

      if (!acc[transactionDate]) {
        acc[transactionDate] = 0;
      }
      acc[transactionDate] += parseFloat(amount);
    }
    return acc;
  }, {});

  const categories = Object.keys(groupedData);
  const seriesData = Object.values(groupedData);

  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Data",
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => formatNumber(value),
      },
      title: {
        text: "Valor Total de Depósitos",
      },
    },
    title: {
      text: "Total de Depósitos ao Longo do Tempo",
      align: "left",
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      y: {
        formatter: (value) => formatNumber(value),
      },
    },
  };

  const series = [
    {
      name: "Depósitos",
      data: seriesData,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        height={400}
        width={700}
      />
    </div>
  );
};

export default LineChart;
