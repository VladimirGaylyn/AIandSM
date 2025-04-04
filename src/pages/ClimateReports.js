import React, { useState } from "react";
import "../customCss/Search.css";
import "../customCss/Home.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Common from "../Components/Common";
const ClimateReport = () => {
  const { t } = useTranslation();
  const [climatePopup, setClimatePopup] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(false);
  const submitClimateForm = (e) => {
    e.preventDefault();
    if (addressInput) {
      setClimatePopup(true);
      setError(false);
    } else {
      setError(true);
      setClimatePopup(false);
    }
  };
  const apiKey = "f87c804e54cf44e297f808d6dc2efe40";
  const fetchAddress = async (data) => {
    try {
      if (data !== "") {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${data}&apiKey=${apiKey}`
        );
        console.log(response.data);
        setAddresses(response?.data?.features);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  };

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
          <h3
            className="main_subTitle"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            {t("climateHead")}
          </h3>

          <div className="prompt_formSec" style={{ marginTop: "80px" }}>
            <form onSubmit={submitClimateForm}>
              <div className="prompt_input">
                <input
                  type="text"
                  autoFocus={true}
                  value={addressInput}
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                    fetchAddress(e.target.value);
                  }}
                />
              </div>
              <div className="propmt_submit">
                <button
                  className="submit_button"
                  type="submit"
                  onClick={submitClimateForm}
                >
                  {t("search")}
                </button>
              </div>
            </form>
            {addresses?.length > 0 && (
              <div className="input_results">
                <ul>
                  {addresses.map((address, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setAddressInput(address?.properties?.formatted);
                        setClimatePopup(true);
                        setError(false);
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>
                      {address?.properties?.formatted}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {error && <p className="errorM">{t("errorM")}</p>}
          </div>
        </div>
        {climatePopup && (
          <div className="climatePopup">
            <div className="climatePopupInner">
              <i
                className="fas fa-times"
                onClick={() => {
                  setClimatePopup(false);
                  setAddressInput("");
                  setError(false);
                  setAddresses([]);
                }}
              ></i>
              <div className="climateIframeSec">
                <iframe
                  title="ClimateCheck Report"
                  src={`https://climatecheck.com/report?address=${addressInput}`}
                  width="100%"
                  height="750"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClimateReport;
