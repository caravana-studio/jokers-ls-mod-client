import { PropsWithChildren } from "react";

export const PreThemeLoadingPage = ({ children }: PropsWithChildren) => {
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
        fontFamily: "Orbitron",
        fontSize: 30,
        letterSpacing: "0.25em",
        background: `url(bg/home-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
};
