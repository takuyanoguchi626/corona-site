import React from "react";

function PrefecuturePage() {
  return (
    <div id="prefecturePage" style={{ position: "absolute", display: "none" }}>
      <div className="container">
        <div>鳥取県 現在患者数/対策病床数 895%</div>
        <div>円グラフ</div>
        <div>
          累積陽性者: 33,740人 累積退院者: 26,220人 <br />
          累積死者: 27人 対策病床数: 798床
        </div>
        <div>
          現在患者数 出典: 厚生労働省 新型コロナウイルス感染症
          各都道府県の検査陽性者の状況(更新日: 2022-08-08) <br /> 一般社団法人
          日本耳鼻咽喉科学会定義におけるハイリスク地域（現在患者数 7150名 &gt;=
          10名） <br /> 対策病床数 医療機関350床+宿泊施設448室 出典:
          新型コロナウイルス対策病床数オープンデータ(発表日: 2022-08-03) <br />
          (参考) 臨床工学技士:98人 マスク専用含む人工呼吸器取扱:273台
          ECMO装置取扱:13台 <br />
          2020年2月回答 出典: 一般社団法人 日本呼吸療法医学会 公益社団法人
          日本臨床工学技士会
        </div>
        <div>折れ線グラフ</div>
        <div>
          <button>とじる</button>
          <button>公式サイトへ</button>
        </div>
      </div>
    </div>
  );
}

export default PrefecuturePage;
