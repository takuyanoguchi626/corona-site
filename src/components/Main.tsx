import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Main() {
  //都道府県別データ
  const [data, setData] = useState([]);
  //全国患者数合計
  const [totalPatient, setTotalPatient] = useState(0);
  //全国対策病床合計
  const [totalSickBed, setTotalSickBed] = useState(0);
  //対策病床に対する患者数の割合
  const [patientRatio, setPatientRatio] = useState(0);
  //全国死亡者数
  const [deaths, setDeaths] = useState(0);
  //累計退院者数
  const [exits, setExits] = useState(0);
  //累計PCR陽性者数
  const [patients, setPatients] = useState(0);
  //

  /**
   * 都道府県別のコロナのデータを取得する.
   */
  const coronaData_prefectures = async () => {
    const res = await axios.get(
      "https://www.stopcovid19.jp/data/covid19japan_beds/latest.json"
    );
    setData(() => res.data);
    let totalPatientData = 0;
    let totalSickBedData = 0;
    for (const prefecture of res.data) {
      totalPatientData += Number(prefecture["PCR検査陽性者数"]);
      totalSickBedData +=
        Number(prefecture["入院患者受入確保病床"]) +
        Number(prefecture["宿泊施設受入可能室数"]);
    }
    setTotalPatient(() => totalPatientData);
    setTotalSickBed(() => totalSickBedData);
    setPatientRatio(() =>
      Math.floor((totalPatientData / totalSickBedData) * 100)
    );
  };
  /**
   * 全国のコロナのデータを取得する.
   */
  const coronaData_wholeCountry = async () => {
    const res = await axios.get(
      "https://www.stopcovid19.jp/data/covid19japan.json"
    );
    setDeaths(() => res.data.ndeaths);
    setExits(() => res.data.nexits);
    setPatients(() => res.data.npatients);
  };

  useEffect(() => {
    coronaData_prefectures();
    coronaData_wholeCountry();
  }, []);

  return (
    <div id="main">
      <div className="upper">
        <div className="left">
          <div className="patientChart">
            <table className="chartTable">
              <tbody>
                <tr>
                  <td>現在患者数/対策病床数</td>
                  <td>現在患者数</td>
                </tr>
                <tr className="number">
                  <td>{patientRatio.toLocaleString()}%</td>
                  <td>{totalPatient.toLocaleString()}人</td>
                </tr>
                <tr>
                  <td>累積退院者</td>
                  <td>死亡者</td>
                </tr>
                <tr className="number">
                  <td>{exits.toLocaleString()}人</td>
                  <td>{deaths.toLocaleString()}人</td>
                </tr>
                <tr>
                  <td>対策病床数 {totalSickBed.toLocaleString()}床</td>
                  <td>PCR検査陽性者数 {patients.toLocaleString()}人</td>
                </tr>
                <tr className="chartSentence">
                  <td colSpan={2}>
                    臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台
                    <br />
                    2020年2月回答 出典
                    <a href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">
                      一般社団法人 日本呼吸療法医学会　公益社団法人
                      日本臨床工学技士会
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="patientSentence">
            <p>
              現在患者数 更新日: 2022-08-06 (速報 2022-08-07T20:00) <br />
              対策病床数 発表日: 2022-08-03 <br />
              新型コロナ対策病床数は「感染症指定医療機関の指定状況」の下記合計と仮定
            </p>
            <div className="kindOfCorona">
              <label htmlFor="tokutei">
                <input type="checkbox" id="tokutei" />
                特定
              </label>
              <label htmlFor="issyu">
                <input type="checkbox" id="issyu" />
                一種
              </label>
              <label htmlFor="kansen">
                <input type="checkbox" id="kansen" />
                二種（感染）
              </label>
              <label htmlFor="kekkaku">
                <input type="checkbox" id="kekkaku" />
                二種（結核）
              </label>
              <label htmlFor="ippanSeisin">
                <input type="checkbox" id="ippanSeisin" />
                二種（一般/精神）
              </label>
            </div>
            <div className="openData">
              <label htmlFor="sickBed">
                <input type="checkbox" id="sickBed" />「
                <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html">
                  新型コロナウイルス対策病床数オープンデータ
                </a>
                」を使用
              </label>
              <br />
              <label htmlFor="patient">
                <input type="checkbox" id="patient" />「
                <a href="https://docs.google.com/spreadsheets/d/1SPqnO0yLn8ubax96sDJZVDcjAH8QT1suLCIgroPGVHY/edit#gid=0">
                  新型コロナウイルス患者数オープンデータ
                </a>
                」を使用（速報）
              </label>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="prefectures">
            <div className="wholeCountry">
              {totalPatient}/{totalSickBed}
              <br />
              (全国) 現在患者数 / 対策病床数
            </div>
            {data.map((prefecture, index) => {
              const pcrTextNum = Number(prefecture["PCR検査陽性者数"]);
              const sickBedNum =
                Number(prefecture["入院患者受入確保病床"]) +
                Number(prefecture["宿泊施設受入可能室数"]);
              const ratio = Math.floor((pcrTextNum / sickBedNum) * 100);
              return (
                <div key={index} className="prefecture">
                  {prefecture["都道府県名"]}
                  <br />
                  {ratio + "%"}
                  <br />
                  {pcrTextNum.toLocaleString() +
                    "/" +
                    sickBedNum.toLocaleString()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lower">
        <p>
          新型コロナウイルス感染症（国内事例） 現在患者数 / 対策病床数
          ※軽症者等は自宅療養など、病床を使用しないことがあります（
          <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html">
            詳細
          </a>
          ）
        </p>
        <p>
          （現在患者数
          <img
            className="up"
            src="https://www.stopcovid19.jp/img/trendarrow01.svg"
            alt=""
          />
          前日より増加
          <img
            className="down"
            src="https://www.stopcovid19.jp/img/trendarrow03.svg"
            alt=""
          />
          前日より減少）
        </p>
      </div>
    </div>
  );
}
