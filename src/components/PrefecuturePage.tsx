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
import { Pie, Line } from "react-chartjs-2";
import { prefectureContext } from "../providers/PrefectureProvider";
import { data } from "../output";
import { deaths } from "../deaths";

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

function PrefecuturePage() {
  const prefectureData = useContext(prefectureContext);
  if (!prefectureData) {
    throw new Error("data がありません。");
  }

  const [deathsData, setDeathsData] = useState<number[]>([0]);
  const [inpatientData, setInpatientData] = useState<(number | undefined)[]>([
    0,
  ]);

  useEffect(() => {
    const inpatient = data.map((d) => {
      const object = Object.keys(d);
      const value = Object.values(d);
      for (let i = 0; i < object.length; i++) {
        if (
          object[i].indexOf("Hokkaido") != -1 &&
          object[i].indexOf("Requiring inpatient care") != -1
        ) {
          return Number(value[i]);
        }
      }
    });
    setInpatientData(() => inpatient);
    const name = "Hokkaido";
    const deathsArr = deaths.map((death) => {
      return Number(death[name]);
    });
    setDeathsData(() => deathsArr);
  }, []);

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
          text: "PCR検査陽性者数・累計死亡者数",
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
    },
  };

  const labels = data.map((data) => {
    return data.Date;
  });

  const data_line = {
    labels,
    datasets: [
      {
        label: "入院治療を要する者",
        data: inpatientData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y_right",
      },
      {
        label: "累計死亡者数",
        data: deathsData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y_left",
      },
    ],
  };

  const remainingDed =
    prefectureData.sickBedNum - prefectureData.ncurrentpatients;

  const data_pie = {
    labels: ["現在患者数", "想定病床残数"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          prefectureData.ncurrentpatients,
          remainingDed < 0 ? 0 : remainingDed,
        ],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 3,
      },
    ],
  };

  const currentpatientsRatio = Math.floor(
    (prefectureData.ncurrentpatients / prefectureData.sickBedNum) * 100
  );

  const closeUpWindows = () => {
    prefectureData.setIsShow(() => "none");
  };

  return (
    <div
      id="prefecturePage"
      style={{ position: "absolute", display: prefectureData.isShow }}
    >
      <div className="container">
        <div className="title">
          {prefectureData.prefectureName} 現在患者数/対策病床数{" "}
          {currentpatientsRatio}%<span onClick={() => closeUpWindows()}>✖</span>
        </div>
        <div className="chart">
          <Pie data={data_pie} />
        </div>
        <div className="numberOfPeople">
          累積陽性者: {prefectureData.npatients.toLocaleString()}人 累積退院者:
          {prefectureData.nexits.toLocaleString()}人 <br />
          累積死者: {prefectureData.ndeaths.toLocaleString()}人 対策病床数:
          {prefectureData.sickBedNum.toLocaleString()}床
        </div>
        <div className="source">
          現在患者数 出典: 厚生労働省 新型コロナウイルス感染症
          各都道府県の検査陽性者の状況(更新日: 2022-08-08) <br /> 一般社団法人
          日本耳鼻咽喉科学会定義におけるハイリスク地域（現在患者数
          {prefectureData.ncurrentpatients.toLocaleString()}名 &gt;= 10名）
          <br /> 対策病床数 医療機関350床+宿泊施設448室 出典:
          新型コロナウイルス対策病床数オープンデータ(発表日: 2022-08-03) <br />
          (参考) 臨床工学技士:98人 マスク専用含む人工呼吸器取扱:273台
          ECMO装置取扱:13台 <br />
          2020年2月回答 出典:
          <a href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">
            一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会
          </a>
        </div>
        <div>
          <Line options={options} data={data_line} />
        </div>
        <div>
          <button>とじる</button>
          <button>公式サイトへ</button>
        </div>
      </div>
    </div>
  );
}

export default PrefecuturePage;
