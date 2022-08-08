import React from "react";

export default function main() {
  return (
    <div id="main">
      <div className="upper">
        <div className="left">
          <div className="patientChart">患者数等の表</div>
          <div className="patientSentence">患者数等の文章</div>
        </div>
        <div className="right">都道府県別の表</div>
      </div>
      <div className="lower">
        <p>
          新型コロナウイルス感染症（国内事例） 現在患者数 / 対策病床数
          ※軽症者等は自宅療養など、病床を使用しないことがあります（詳細）
        </p>
        <p>（現在患者数 前日より増加 前日より減少）</p>
      </div>
    </div>
  );
}
