import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoChart = ({ currency, data, days }) => {
  const date = [];
  const prices = [];

  for (let i = 0; i < data.length; i++) {
    prices.push(data[i][1]);
    if (days === "24h") {
      date.push(new Date(data[i][0]).toLocaleTimeString());
    } else {
      date.push(new Date(data[i][0]).toLocaleDateString());
    }
  }

  console.log(prices);
  console.log(date);
  return (
    <Line
      className="chart"
      options={{
        responsive: true,
      }}
      data={{
        labels: date,
        datasets: [
          {
            label: `Price in ${currency}`,
            data: prices,
            borderColor: "#45B8AC",
            backgroungColor: "rgba(255,99,132,0.5)",
          },
        ],
      }}
    />
  );
};

export default CryptoChart;
