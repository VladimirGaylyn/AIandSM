import React, { useState, useEffect, useRef } from "react";

import ReactMarkdown from "react-markdown";
// import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import "../customCss/ChatBot.css";
// import apiData from '../Services/apiData';

import DownloadIcon from "../images/download_icon.png";

import { MessagesStore } from "../_zustand/MessagesStore";

function ChatBot(props) {
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isQuerySubmit, setIsQuerySubmit] = useState(false);

  const textareaRef = useRef(null);
  const chatEndRef = useRef();

  const { chatBotMessages, addChatBotMessages, updateChatMessage } =
    MessagesStore();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = `${day}/${month}/${year}`;

      setCurrentTime(
        `${date} ${formattedHours}:${minutes}:${seconds} ${ampm} ${timezone}`
      );
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        SendChat(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [chatMessage]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isQuerySubmit, chatBotMessages]);

  // Add this custom hook for streaming
  const handleStreamingResponse = async (question) => {
    try {
      // const response = await fetch("http://localhost:8000/api/ask", {
      const response = await fetch(
        "https://ej-advisor-backend.onrender.com/api/ask",
        {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      props.setPrompt("");
      props.setDocketPrompt("");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n").filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;

                updateChatMessage(fullResponse);
              }
            } catch (err) {
              console.error("Error parsing SSE chunk:", err);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      props.ResetSearchTextareaHeight();
    }
  };

  const SendChatV2 = async () => {
    if (props.docketPrompt && props.prompt) {
      addChatBotMessages({
        type: "User",
        message: props.docketPrompt + " " + props.prompt,
      });
    }

    setLoading(true);

    handleStreamingResponse(props.docketPrompt + " " + props.prompt);
  };

  const SendChat = (e) => {
    e.preventDefault();

    if (chatMessage.length > 0) {
      addChatBotMessages({
        type: "User",
        message: chatMessage,
      });
    }

    setLoading(true);
    setIsQuerySubmit(true);
    const data = new FormData();
    data.append("website_input", chatMessage);
    setChatMessage("");
    ResetChatBotTextareaHeight();
    handleStreamingResponse(chatMessage);
  };

  const getChatMessage = () => {
    // apiData
    //   .chatBotGet()
    //   .then((response) => {
    //     console.log("First response here", response.data);
    //     chatMessages.current.push({
    //       type: "Agent",
    //       message: response.data,
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //   });

    if (chatBotMessages.length < 1) {
      addChatBotMessages({
        type: "Agent",
        message: "Hello! How can I assist you today?",
      });
    }
  };

  useEffect(() => {
    getChatMessage();
    if (props.prompt) {
      SendChatV2();
    }
  }, []);

  const handleTextareaChange = (e) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setChatMessage(target.value);
  };

  const ResetChatBotTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = "1.5em";
    }
  };

  // // Generate Word document
  // const generateWordDoc = (message) => {
  //   const lines = message.split("\n");

  //   // Create TextRun elements with explicit line breaks
  //   const children = lines.flatMap((line, index) => [
  //     new TextRun({ text: line }),
  //     ...(index < lines.length - 1 ? [new TextRun({ break: 1 })] : []),
  //   ]);

  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [new Paragraph({ children })],
  //       },
  //     ],
  //   });

  //   const firstThreeWords = message.split(" ").slice(0, 3).join(" ");

  //   // Convert document to blob and trigger download
  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, `${firstThreeWords + " ... "}.docx`);
  //   });
  // };

  //updated for **

  // const generateWordDoc = (message) => {
  //   const lines = message.split("\n");

  //   // New logic to handle ** with bold formatting
  //   const processLine = (line) => {
  //     const parts = line.split("**");
  //     return parts.flatMap((part, index) => {
  //       if (part === "") return []; // Skip empty fragments
  //       return new TextRun({ text: part, bold: index % 2 === 1 });
  //     });
  //   };

  //   // Original line break logic + new bold handling
  //   const children = lines.flatMap((line, index) => [
  //     ...processLine(line),
  //     ...(index < lines.length - 1 ? [new TextRun({ break: 1 })] : []),
  //   ]);

  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [new Paragraph({ children })],
  //       },
  //     ],
  //   });

  //   const firstThreeWords = message.split(" ").slice(0, 3).join(" ");

  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, `${firstThreeWords + " ... "}.docx`);
  //   });
  // };

  // const generateWordDoc = (message) => {
  //   const processLine = (line) => {
  //     // Split line into normal text and **bold** sections
  //     const boldRegex = /(\*\*[^*]+\*\*)/g;
  //     const parts = line.split(boldRegex);

  //     return parts.flatMap((part) => {
  //       if (!part) return []; // Skip empty fragments

  //       // Detect bold sections wrapped in **
  //       if (part.startsWith("**") && part.endsWith("**")) {
  //         const textContent = part.slice(2, -2);
  //         return new TextRun({ text: textContent, bold: true });
  //       }
  //       return new TextRun({ text: part, bold: false });
  //     });
  //   };

  //   const lines = message.split("\n");

  //   // Preserve original line break logic + add bold handling
  //   const children = lines.flatMap((line, index) => [
  //     ...processLine(line),
  //     ...(index < lines.length - 1 ? [new TextRun({ break: 1 })] : []),
  //   ]);

  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [new Paragraph({ children })],
  //       },
  //     ],
  //   });

  //   const firstThreeWords = message.split(" ").slice(0, 3).join(" ");

  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, `${firstThreeWords + " ... "}.docx`);
  //   });
  // };

  const generateWordDoc = (message) => {
    const lines = message.split("\n");
    const children = lines.flatMap((line, index) => [
      new TextRun({ text: line.replace(/\*\*/g, "") }),
      ...(index < lines.length - 1 ? [new TextRun({ break: 1 })] : []),
    ]);

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph({ children })],
        },
      ],
    });
    // Regular expression to match "docket" in any case and capture the next 5 characters
    const docketMatch = message.match(/docket\s*no\.?\s*(\d{1,5})/i);
    const docketNumber = docketMatch ? `Docket${docketMatch[1]}` : null;

    // Fallback to first three words if no docket number is found
    const firstThreeWords = message.split(" ").slice(0, 3).join(" ");
    const fileName = docketNumber ? docketNumber : `${firstThreeWords} ...`;

    // Convert document to blob and trigger download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${fileName}.docx`);
    });
  };

  return (
    <div className="main_chatBot">
      <div className={`chatBot_mainSec ${props.openChat ? "expanded" : ""}`}>
        <div className="chat_mainBody">
          <span>{currentTime}</span>
          <div className="chat_mainBodyInner">
            {chatBotMessages.map((chat, index) => {
              if (chat.type === "Agent") {
                return (
                  <div key={index} className="cmp_L">
                    <div className="cmp_messageL c_message">
                      <ReactMarkdown>{chat.message}</ReactMarkdown>
                      <div ref={chatEndRef} />
                    </div>
                    <button
                      className="download_c_message"
                      onClick={() => generateWordDoc(chat.message)}
                    >
                      <img
                        src={DownloadIcon}
                        alt="download"
                        style={{ width: "35px", height: "35px" }}
                      />
                      Click to Download
                    </button>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="cmp_R">
                    <div className="cmp_messageR c_message">
                      <ReactMarkdown>{chat.message}</ReactMarkdown>
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="chatBot_footer">
          <form onSubmit={SendChat}>
            <div className="chatBotV2_formSec">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="chatBotV2_input">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    className="custom-textarea"
	  	    style={{fontFamily: "sans", fontSize: 12}}
                    autoFocus={true}
                    placeholder={"Search Something Here..."}
                    value={chatMessage}
                    onChange={handleTextareaChange}
                  />
                </div>
                <div className="chatBotV2_submit">
                  <button className="chatBotV2_submit_button" type="submit">
                    <i className="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {props.openChat && (
        <div className="chat_openBtn">
          <button onClick={() => props.setOpenChat(!props.openChat)}>
            <i
              className={`${
                props.openChat ? "fas fa-times" : "far fa-comment-dots"
              }`}
            ></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
