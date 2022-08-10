import React from "react";

export default function Footer() {
  return (
    <div id="footer">
      <div className="container">
        <img
          src="https://www.stopcovid19.jp/img/notestopcovid19-banner.png"
          alt=""
          className="coronaExpertImg"
        />
        <div className="healthImg">
          <div>
            <a href="https://tk3-805-12365.vw.sakura.ne.jp:3443/fine">
              <img
                src="https://tk3-805-12365.vw.sakura.ne.jp:3443/images/mini-fine.png"
                alt=""
                className="healthIcon"
              />
            </a>
          </div>
          <img
            src="https://tk3-805-12365.vw.sakura.ne.jp:3443/images/mini-center.png"
            alt=""
          />
          <div>
            <a href="https://tk3-805-12365.vw.sakura.ne.jp:3443/sick">
              <img
                src="https://tk3-805-12365.vw.sakura.ne.jp:3443/images/mini-sick.png"
                alt=""
                className="healthIcon"
              />
            </a>
          </div>
        </div>
        <a href="https://whowatch.tv/">
          <img
            src="https://www.stopcovid19.jp/img/whowatch-banner.png"
            alt=""
            className="stayhomeImg"
          />
        </a>
      </div>
    </div>
  );
}
