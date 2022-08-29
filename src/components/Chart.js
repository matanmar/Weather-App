import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const ChartLine = (props) => {
  let chartData = {};

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const chartLabel = props.data.weatherList.map(
    (mov) => days[new Date(mov.dt_txt).getDay()]
  );

  if (props.type === "temp") {
    chartData = props.data.weatherList.map(
      (mov) => +mov.main.temp.toFixed(0) - 273
    );
  } else if (props.type === "wind") {
    chartData = props.data.weatherList.map((mov) =>
      Math.round(+mov.wind.speed * 3.6)
    );
  } else {
    chartData = props.data.weatherList.map((mov) => +mov.pop * 100);
  }

  const maxChartValue = props.type === "pop" ? 100 : Math.max(...chartData) + 3;
  const minChartValue = props.type === "pop" ? 0 : Math.min(...chartData) - 3;

  const state = {
    labels: chartLabel,
    datasets: [
      {
        label: props.type === "temp" ? "Temperature Trend" : "Wind Trend",

        borderColor:
          props.type === "temp"
            ? "rgba(255, 196, 67, 0.5)"
            : props.type === "wind"
            ? "rgba(114, 114, 114,0.5)"
            : "rgba(64, 182, 250, 0.5)",
        backgroundColor:
          props.type === "temp"
            ? "rgba(255, 196, 67, 0.5)"
            : props.type === "wind"
            ? "rgba(114, 114, 114,0.5)"
            : "rgba(64, 182, 250, 0.5)",
        borderWidth: 8,
        data: chartData,
        pointStyle: "line",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: props.type === "temp" ? "Temperature Trend" : "Wind Trend",
      fontSize: 20,
    },
    scales: {
      yAxis: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text:
            props.type === "temp"
              ? "Temp ℃"
              : props.type === "wind"
              ? "Wind Speed Km/hr"
              : "probability of precipitation %",
          font: {
            size: 22,
          },
        },
        display: true,
        min: minChartValue, // minimum value
        max: maxChartValue, // maximum value

        ticks: {
          stepSize: props.type === "pop" ? 20 : 1,
          font: {
            size: 22,
          },
        },
      },
      xAxis: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 22,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    chartArea: {
      backgroundColor: "rgba(251, 85, 85, 0.4)",
    },
  };

  return (
    <div className="chart">
      <Line data={state} options={options} />
    </div>
  );
};

export default ChartLine;
