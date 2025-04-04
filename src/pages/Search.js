import React, { useState, useEffect, useRef } from "react";
import "../customCss/Search.css";
import "../customCss/Home.css";
import "../customCss/ChatBot.css";
import AppImage from "../images/ed_appImages.png";
import { useTranslation } from "react-i18next";
import Email from "../images/email.png";
import Group from "../images/users.jpg";
import CSC from "../images/csc.png";
import Common from "../Components/Common";
import ChatBotV2 from "../Components/ChatBot";

const Search = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [docketPrompt, setDocketPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chevronDirection, setChevronDirection] = useState({});

  const textareaRef = useRef(null);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [prompt]);

  const promptData = [
    {
      baseIcon: '<i className="fas fa-bookmark"></i>',
      titleKey: "finalizePitchDeck",
      bg: "#0093FF",
    },
    {
      baseIcon: '<i className="fas fa-circle"></i>',
      titleKey: "readTheLeanStartup",
      bg: "#CA5CFF",
    },
    {
      baseIcon: '<i className="fas fa-bell"></i>',
      titleKey: "fixLandingPage",
      bg: "#37F140",
    },
    {
      baseIcon: '<i className="fas fa-folder"></i>',
      titleKey: "replyToRichard",
      bg: "#FFA600",
    },
  ];
  const promptOneData = [
    {
      baseIcon: '<i className="fas fa-bell"></i>',
      titleKey: "fixLandingPage",
      bg: "#37F140",
    },
    {
      baseIcon: '<i className="fas fa-folder"></i>',
      titleKey: "replyToRichard",
      bg: "#FFA600",
    },
  ];
  const [isOpenArray, setIsOpenArray] = useState(
    new Array(promptData.length).fill(false)
  );

  const togglePrompt = (index) => {
    const newIsOpenArray = [...isOpenArray];
    newIsOpenArray[index] = !newIsOpenArray[index];
    setIsOpenArray(newIsOpenArray);
    setChevronDirection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (docketPrompt.length > 0 && prompt.length > 0) {
      setIsOpenChat(true);
      setIsSubmitted(false);
    }
  };

  const handleDocketTextareaChange = (e) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setDocketPrompt(target.value);
  };

  const handlePromptTextareaChange = (e) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setPrompt(target.value);
  };

  const ResetSearchTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = "1.5em";
    }
  };

  return (
    <>
      <Common />
      {isOpenChat && (
        <ChatBotV2
          openChat={isOpenChat}
          setOpenChat={setIsOpenChat}
          prompt={prompt}
          setPrompt={setPrompt}
          docketPrompt={docketPrompt}
          setDocketPrompt={setDocketPrompt}
          ResetSearchTextareaHeight={ResetSearchTextareaHeight}
        />
      )}

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
            {t("homeSub")}
          </h3>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isSubmitted &&
                (docketPrompt.length === 0 ||
                  prompt.length === 0 ||
                  !isSubmitted) && (
                  <div className="alert_formsec">
                    <span
                      style={{
                        fontWeight: "700",
                        color: "red",
                        marginRight: "8px",
                      }}
                    >
                      X
                    </span>
                    <span>
                      Please
                      {docketPrompt.length > 0
                        ? " type your concernes."
                        : " paste the docket number"}
                    </span>
                  </div>
                )}
              <div
                style={{
                  width: "100%",
                  marginTop: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="docket_prompt_formSec">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="prompt_input">
                      <textarea
                        ref={textareaRef}
                        rows={1}
                        className="custom-textarea"
		        style={{fontFamily: "sans", fontSize: 13}}
                        type="text"
                        autoFocus={true}
                        placeholder={t("docketPromptPlaceholder")}
                        value={docketPrompt}
                        onChange={handleDocketTextareaChange}
                      />
                    </div>
                  </div>
                </div>

                <a
                  href="https://portal.ct.gov/csc/1_applications-and-other-pending-matters/pending-matters"
                  target="_blank"
                >
                  <img
                    // src={Email}
                    src={CSC}
                    alt="email"
                    style={{ width: "50px", height: "50px", filter: "invert(var(--invert))" }}
                  />
                </a>
              </div>

              <div className="prompt_formSec">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="prompt_input">
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      className="custom-textarea"
		      style={{fontFamily: "sans", fontSize: 13}}
                      type="text"
                      autoFocus={true}
                      placeholder={t("promptPlaceholder")}
                      value={prompt}
                      onChange={handlePromptTextareaChange}
                    />
                  </div>
                </div>
              </div>
              <div className="propmt_submit">
                <button
                  className="submit_button"
                  style={{
                    cursor:
                      docketPrompt.length === 0 || prompt.length === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {t("Show me a draft comment letter")}
                </button>
              </div>
            </div>
          </form>
          {/* <h4 className="exp_tx">{t("searchText")}</h4> */}
          <span style={{ marginTop: "20px", display: "inline-block" }}>
            (This is a beta application and may take a minute or two. Please be
            patient. We'll be speeding things up soon!)
          </span>

          <h4 className="exp_tx">
            <a
              href="https://acrobat.adobe.com/link/review?uri=urn:aaid:scds:US:769ffbb0-d3e7-3c01-b7a4-ac3ce140c5c5"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--dark)", textDecoration: "underline" }}
            >
              Take a look at some sample letters
            </a>
          </h4>
          {/* <div className="we_doSec we_doSecSearch">
            <div
              className="we_doItem"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div className="we_doInner">
                <img src={Email} alt="email" />
                <h3>{t("ejSearchOne")}</h3>
              </div>
            </div>
            <div
              className="we_doItem"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div className="we_doInner">
                <img src={Group} alt="group" />

                <h3>{t("ejSearchTwo")}</h3>
              </div>
            </div>
          </div> */}
          <div className="prompt_results">
            <h3>{t("results")}</h3>
            {promptData &&
              promptData.map((prompt, index) => (
                <div key={index}>
                  <div
                    className="prompt_resultsInner"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    onClick={() => togglePrompt(index)}
                  >
                    <div className="prompt_ico">
                      <span
                        style={{ background: prompt?.bg }}
                        dangerouslySetInnerHTML={{ __html: prompt.baseIcon }}
                      />
                    </div>
                    <div className="prompt_title">
                      <p>{t(prompt.titleKey)}</p>
                    </div>
                    <div className="prompt_drop">
                      <i
                        className={`fas ${
                          chevronDirection[index]
                            ? "fa-chevron-down"
                            : "fa-chevron-right"
                        }`}
                      ></i>
                    </div>
                  </div>
                  <div
                    className={`sliding_down_div ${
                      isOpenArray[index] ? "open" : ""
                    }`}
                  >
                    {promptOneData &&
                      promptOneData.map((prompt, index) => (
                        <div
                          key={index}
                          className="prompt_resultsInner"
                          style={{ marginLeft: "25px" }}
                        >
                          <div className="prompt_ico">
                            <span
                              style={{ background: prompt?.bg }}
                              dangerouslySetInnerHTML={{
                                __html: prompt.baseIcon,
                              }}
                            />
                          </div>
                          <div className="prompt_title">
                            <p>{t(prompt.titleKey)}</p>
                          </div>
                          <div
                            className="prompt_drop"
                            // onClick={() => togglePrompt(index)}
                          >
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* <div className="banner_bottomSec">
          <img src={AppImage} alt="app_images" />
        </div> */}
      </div>
    </>
  );
};

export default Search;
