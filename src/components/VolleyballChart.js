import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const VolleyballChartLine = (props) => {
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

  const chartData = props.data.weatherList.map((mov) =>
    Math.round(+mov.wind.speed * 3.6)
  );

  const maxChartValue = props.type === "pop" ? 100 : Math.max(...chartData) + 3;
  const minChartValue = props.type === "pop" ? 0 : Math.min(...chartData) - 3;

  const down = (ctx) =>
    ctx.p0.parsed.y > 17 ? "rgba(255,26,104,0.5)" : "rgba(75,192,192,0.5)"; //18 is the limit which above its not recomand to play volley bal

  const state = {
    labels: chartLabel,
    datasets: [
      {
        label: "Wind Trend",

        borderColor: "rgba(255, 174, 0, 0.75)",
        borderWidth: 8,
        data: chartData,
        pointStyle: "line",
        fill: true,
        tension: 0.2,
        segment: {
          borderColor: (ctx) => down(ctx),
          backgroundColor: (ctx) => down(ctx),
        },
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Wind Trend",
      fontSize: 20,
    },
    scales: {
      yAxis: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Wind Speed Km/hr",
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

export default VolleyballChartLine;
