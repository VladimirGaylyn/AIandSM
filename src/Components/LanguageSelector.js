import React, { useState } from "react";
import i18n from "../i18n";
import "../customCss/LanguageSelector.css";
import EnFlag from "../images/en_flag.png";
import EsFlag from "../images/es_flag.png";

function LanguageSelector({ onSelectLanguage }) {
  const [langPopup, setLangPopup] = useState(false);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onSelectLanguage && onSelectLanguage(lng);
    setLangPopup(false);
    localStorage.setItem("lang", lng);
  };

  const isActive = (lng) => {
    return i18n.language === lng ? "active" : "";
  };

  return (
    <div>
      <div className="container">
        <div className="switcherBar">
          <i
            className="fas fa-globe"
            onClick={() => setLangPopup(!langPopup)}
          ></i>
          {langPopup && (
            <div className="language_popupOuter">
              <div className="language_popupInner">
                <i
                  className="fas fa-times"
                  onClick={() => setLangPopup(false)}
                ></i>
                <div className="lanSec">
                  <div
                    className={isActive("en") + " lang_button"}
                    onClick={() => changeLanguage("en")}
                  >
                    <p>English</p>
                    <img src={EnFlag} alt="flag" />
                  </div>
                  <div
                    className={isActive("es") + " lang_button"}
                    onClick={() => changeLanguage("es")}
                  >
                    <p>Español</p>
                    <img src={EsFlag} alt="flag" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelector;
