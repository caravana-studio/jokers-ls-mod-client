import "../App.scss";

interface LoadingScreenProps {
  error?: boolean;
}

export const LoadingScreen = ({ error = false }: LoadingScreenProps) => {
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
        <div>error loading game</div>
      ) : (
        <>
          <img
            style={{ marginTop: "80px" }}
            width="60%"
            src="logos/logo.png"
            alt="logo"
          />
          <img src="loader.gif" alt="loader" width="100px" />
        </>
      )}
    </div>
  );
};
