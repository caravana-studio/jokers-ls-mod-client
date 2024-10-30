import "../App.scss";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  error?: boolean;
}

export const LoadingScreen = ({ error = false }: LoadingScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showFirstDot, setShowFirstDot] = useState(false);
  const [showSecondDot, setShowSecondDot] = useState(false);
  const [showThirdDot, setShowThirdDot] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const logoTimeout = setTimeout(() => setShowLogo(true), 500);
    const textTimeout = setTimeout(() => setShowText(true), 1000);
    const firstDotTimeout = setTimeout(() => setShowFirstDot(true), 1500);
    const secondDotTimeout = setTimeout(() => setShowSecondDot(true), 2000);
    const thirdDotTimeout = setTimeout(() => setShowThirdDot(true), 2500);
    const loaderTimeout = setTimeout(() => setShowLoader(true), 3000);
    
    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(textTimeout);
      clearTimeout(loaderTimeout);
      clearTimeout(firstDotTimeout);
      clearTimeout(secondDotTimeout);
      clearTimeout(thirdDotTimeout);
    };
  }, []);

  return (
    <div
      style={{
        height: "100%",
        position: "fixed",
        bottom: 0,
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "VT323",
        fontSize: 30,
        letterSpacing: "0.25em",
        background: `url(bg/home-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexWrap: "wrap",
      }}
    >
      {error ? (
        <h2>error loading game</h2>
      ) : (
        <>
          <img
            src="logos/caravana-isologo.png"
            alt="loader"
            width="300px"
            style={{
              opacity: showLogo ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
          <h4
            style={{
              opacity: showText ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            presents
          <span
            style={{
              opacity: showFirstDot ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            .
          </span><span
            style={{
              opacity: showSecondDot ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            .
          </span><span
            style={{
              opacity: showThirdDot ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            .
          </span>
          </h4>
          <img
            src="loader.gif"
            alt="loader"
            width="100px"
            style={{
              opacity: showLoader ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
        </>
      )}
    </div>
  );
};
