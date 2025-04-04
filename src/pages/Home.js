import React, { useState } from "react";
import "../customCss/Search.css";
import "../customCss/Home.css";
import { useTranslation } from "react-i18next";
import Search from "../images/AI__withoutbackground.png";
import Map from "../images/map_new_withoutbackground.png";
import Earth from "../images/Climate__withoutbackground.png";
import { Link } from "react-router-dom";
import Common from "../Components/Common";
const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Common />
      <div className="bannerSec">
        <div className="container">
          <h1
            className="main_title"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            EJ Advisor
          </h1>
          {/* <h3
            className="main_subTitle"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            {t("homeSub")}
          </h3> */}
          <div className="we_doSec">
            <div
              className="we_doItem"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              {/* <div className="weDo_hover"></div> */}
              <Link to="/search">
                <div className="we_doInner">
                  <img src={Search} alt="search" />
                  <h3>{t("ejServiceOne")}</h3>
                </div>
              </Link>
            </div>
            <div
              className="we_doItem"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              {/* <div className="weDo_hover"></div> */}
              <div className="we_doInner">
                <img src={Map} alt="map" />
                <h3>{t("ejServiceTwo")}</h3>
              </div>
            </div>
            <div
              className="we_doItem"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              {/* <div className="weDo_hover"></div> */}
              <Link to="/climate-report">
              <div className="we_doInner">
                <img src={Earth} alt="climate" />
                <h3>{t("ejServiceThree")}</h3>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
