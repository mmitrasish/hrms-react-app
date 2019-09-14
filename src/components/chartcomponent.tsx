import * as React from "react";
import { ChartOptions, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface IChartProp {
  labels: string[];
  chartData: number[];
  color: string[];
  title: string;
}

const Chart: React.FC<IChartProp> = (props: IChartProp) => {
  const chartData: ChartData = {
    labels: props.labels,
    datasets: [
      {
        data: props.chartData,
        backgroundColor: props.color,
        hoverBackgroundColor: props.color
      }
    ]
  };
  const chartOption: ChartOptions = {
    responsive: true,
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: props.title
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  return (
    <div className="rounded-lg shadow border py-3 px-4">
      <Doughnut data={chartData} options={chartOption} />
    </div>
  );
};
export default Chart;
