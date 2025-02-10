import { formatNumber } from "@/utils";
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ transactions }) => {
  const groupedData = transactions.reduce((acc, transaction) => {
    const { industry, amount, transaction_type } = transaction;

    if (transaction_type === "deposit") {
      if (!acc[industry]) {
        acc[industry] = 0;
      }
      acc[industry] += parseFloat(amount);
    }
    return acc;
  }, {});

  const categories = Object.keys(groupedData);
  const seriesData = Object.values(groupedData);

  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Indústria",
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
      text: "Total de Depósitos por Indústria",
      align: "left",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatNumber(value),
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (value) => formatNumber(value),
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
        type="bar"
        height={400}
        width={700}
      />
    </div>
  );
};

export default BarChart;
