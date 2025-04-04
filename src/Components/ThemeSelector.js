import React, { useState, useEffect } from "react";
import "../customCss/LanguageSelector.css";

function ThemeSelector() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
	const mode = localStorage.getItem("theme");
	document.querySelector("html").setAttribute("data-theme", mode); 
	setTheme(mode);
  }, []);

  const toggle = (mode) => {
	if (mode == "light") {
		document.querySelector("html").setAttribute("data-theme", "dark"); 
		setTheme("dark");
		localStorage.setItem("theme", "dark");
	}
	else { 
		document.querySelector("html").setAttribute("data-theme", "light"); 
		setTheme("light");
		localStorage.setItem("theme", "light");
	}
  }

  return (
    <div>
      <div className="container">
        <div className="switcherBar">
          <i
            className="fas fa-moon"
            onClick={()=>toggle(theme)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;
