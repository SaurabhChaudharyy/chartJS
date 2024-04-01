import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const StockPriceChart = () => {
  const chartRef = useRef(null);
  const intervalRef = useRef(null);
  const fetchDataAndUpdateChart = async () => {
    try {
      const response = await fetch(
        "https://backend-cloudflare.ch-saurabh75.workers.dev/stock-price"
      );
      const data = await response.json();
      updateChart(data.price);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChart = (price) => {
    const options = { hour: "numeric", minute: "numeric" };
    const time = new Date().toLocaleTimeString(undefined, options);
    chartRef.current.data.labels.push(time);
    chartRef.current.data.datasets[0].data.push(price);
    chartRef.current.update();
  };

  const changeInterval = (newInterval) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchDataAndUpdateChart, newInterval);
  };

  useEffect(() => {
    const ctx = document.getElementById("stock-chart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Stock Price",
            data: [],
            borderColor: "blue",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: { type: "category" }, // Use category scale type
          y: { title: { display: true, text: "Price" } },
        },
      },
    });

    intervalRef.current = setInterval(fetchDataAndUpdateChart, 1000);

    return () => {
      clearInterval(intervalRef.current);
      chartRef.current.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="stock-chart" width="400" height="200"></canvas>

      <button onClick={() => changeInterval(1000)}>1 second</button>
      <button onClick={() => changeInterval(2000)}>2 seconds</button>
      <button onClick={() => changeInterval(5000)}>5 seconds</button>
    </div>
  );
};

export default StockPriceChart;
