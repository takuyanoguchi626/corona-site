import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line, Bar, Scatter } from "react-chartjs-2";
import { prefectureContext } from "../providers/PrefectureProvider";
import { data } from "../output";
import { emergency } from "../emergency";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function MainGraph() {
  const [emergencyData, setEmergencyData] = useState<(number | undefined)[]>([
    0,
  ]);
  const [inpatientData, setInpatientData] = useState<(number | undefined)[]>([
    0,
  ]);

  useEffect(() => {
    const inpatient = data.map((d) => {
      const object = Object.keys(d);
      const value = Object.values(d);
      for (let i = 0; i < object.length; i++) {
        if (
          object[i].indexOf("ALL") != -1 &&
          object[i].indexOf("Requiring inpatient care") != -1
        ) {
          return Number(value[i]);
        }
      }
    });
    setInpatientData(() => inpatient);
    console.log(inpatientData);

    const emergencyArr = emergency.map((d) => {
      const object = Object.keys(d);
      const value = Object.values(d);
      for (let i = 0; i < object.length; i++) {
        if (object[i].indexOf("救急搬送困難事案数") != -1) {
          return Number(value[i]);
        }
      }
    });
    setEmergencyData(() => emergencyArr);
    console.log(emergencyData);
  }, []);

  const labels2 = emergency.map((d) => {
    return d["終了日"];
  });

  const labels = data.map((data) => {
    return data.Date;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y_left: {
        title: {
          display: true,
          text: "救急搬送困難事案数",
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y_right: {
        title: {
          display: true,
          text: "入院治療を要する者",
        },
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      x_left: {
        labels: labels2,
        display: false,
      },
      x_right: {
        labels: labels,
      },
    },
  };

  const data_line = {
    datasets: [
      {
        fill: false,
        label: "入院治療を要する者",
        data: inpatientData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y_right",
        xAxisID: "x_right",
      },
      {
        label: "救急搬送困難事案数",
        data: emergencyData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y_left",
        xAxisID: "x_left",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data_line} />
    </div>
  );
}

export default MainGraph;
