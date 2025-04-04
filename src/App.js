import React, { useEffect } from "react";
import Routes from "./Routes";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Routes />;
}

export default App
