import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GamePage } from "./pages/Game/GamePage";
import { GameOver } from "./pages/GameOver";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { OpenPack } from "./pages/OpenPack";
import { PlaysLayout } from "./pages/Plays/PlaysLayout";
import { PreviewPage } from "./pages/Preview/PreviewPage";
import { Redirect } from "./pages/Redirect";
import { RewardsPage } from "./pages/RewardsPage";
import { SpecialCardsPage } from "./pages/SpecialCardsPage";
import { Store } from "./pages/store/Store";
import { AudioPlayerProvider } from "./providers/AudioPlayerProvider";
import { CardAnimationsProvider } from "./providers/CardAnimationsProvider";
import { GameProvider } from "./providers/GameProvider";
import { StoreProvider } from "./providers/StoreProvider";
import customTheme from "./theme/theme";

function App() {
  const theme = extendTheme(customTheme);
  return (
    <ChakraBaseProvider theme={theme}>
      <CardAnimationsProvider>
        <GameProvider>
          <AudioPlayerProvider songPath={"/music/new-track.mp3"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gameover/:gameId" element={<GameOver />} />
              <Route path="/demo" element={<GamePage />} />
              <Route path="/rewards" element={<RewardsPage />} />

              <Route
                path="/store"
                element={
                  <StoreProvider>
                    <Store />
                  </StoreProvider>
                }
              />
              <Route path="/redirect/:page" element={<Redirect />} />
              <Route
                path="/preview/:type"
                element={
                  <StoreProvider>
                    <PreviewPage />
                  </StoreProvider>
                }
              />
              <Route
                path="/open-pack"
                element={
                  <StoreProvider>
                    <OpenPack />
                  </StoreProvider>
                }
              />
              <Route
                path="/special-cards"
                element={
                  <StoreProvider>
                    <SpecialCardsPage />
                  </StoreProvider>
                }
              />
              <Route path="/play" element={<Navigate to="/" />} />
              <Route path="/plays" element={<PlaysLayout />} />
            </Routes>
          </AudioPlayerProvider>
        </GameProvider>
      </CardAnimationsProvider>
      <Analytics />
      <SpeedInsights />
    </ChakraBaseProvider>
  );
}

export default App;
