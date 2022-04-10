import React, { useState, useEffect } from "react";
const DarkThemeContext = React.createContext();

const mainColors = [
  { bg: "#E5E5E5", txt: "#000",isMode :"light",bgFilter : "#fff",iconSearch :"#000",bgCard :"#fff",borderCard:"#fff"},
  { bg: "#000", txt: "#fff",isMode :"dark" ,bgFilter :"#001529",iconSearch :"#000",bgCard :"#000",borderCard:"#fff"}
];

const DartThemeProvider = ({ children }) => {
  const [turnOn, setTurnOn] = useState(false);
  const [mainColor, setMainColor] = useState(mainColors[1]);

  useEffect(() => {
    const color = turnOn ? mainColors[1] : mainColors[0];
    setMainColor(color);
  }, [turnOn]);

  return (
    <DarkThemeContext.Provider
      value={{ turnOn, setTurnOn, mainColor, setMainColor }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
};

export { DarkThemeContext, DartThemeProvider };