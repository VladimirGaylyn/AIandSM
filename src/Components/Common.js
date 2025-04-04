import React from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import "../customCss/Common.css";

const Common = () => {
  return (
    <div className="common_container">
      <LanguageSelector />
      <ThemeSelector />
    </div>
  );
};

export default Common;
