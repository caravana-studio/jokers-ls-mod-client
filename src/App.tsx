import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AdventurersPage } from "./pages/Adventurers/AdventurersPage";
import { ChooseAdventurerCards } from "./pages/ChooseAdventurerCards";
import { ChooseClassPage } from "./pages/ChooseClassPage";
import { ChooseModifiersPage } from "./pages/ChooseModifiersPage";
import { ChooseSpecialsPage } from "./pages/ChooseSpecialsPage";
import { GamePage } from "./pages/Game/GamePage";
import { GameOver } from "./pages/GameOver";
import { Home } from "./pages/Home";
import { PlaysLayout } from "./pages/Plays/PlaysLayout";
import { RewardsPage } from "./pages/RewardsPage";
import { RewardsSelection } from "./pages/RewardsSelection";
import { AudioPlayerProvider } from "./providers/AudioPlayerProvider";
import { CardAnimationsProvider } from "./providers/CardAnimationsProvider";
import { GameProvider } from "./providers/GameProvider";
import customTheme from "./theme/theme";
import { DesktopOnlyNotice } from "./pages/DesktopOnlyNotice";
import { useEffect } from "react";

function App() {
  const theme = extendTheme(customTheme);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 1280) {
      navigate("/desktop-only-notice");
    }
  }, [navigate]);

  return (
    <ChakraBaseProvider theme={theme}>
      <CardAnimationsProvider>
        <GameProvider>
          <AudioPlayerProvider initialSongPath={"/music/OST_ 005.mp3"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/choose-class" element={<ChooseClassPage />} />
              <Route path="/game/:mode" element={<GamePage />} />
              <Route
                path="/choose-modifiers"
                element={<ChooseModifiersPage />}
              />
              <Route path="/choose-specials" element={<ChooseSpecialsPage />} />
              <Route
                path="/choose-adventurer-cards"
                element={<ChooseAdventurerCards />}
              />
              <Route path="/gameover/:gameId" element={<GameOver />} />
              <Route path="/plays" element={<PlaysLayout />} />
              <Route path="/gameover/:gameId" element={<>Game Over</>} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/adventurers" element={<AdventurersPage />} />
              <Route path="/rewards/:mode" element={<RewardsSelection />} />
              <Route
                path="/desktop-only-notice"
                element={<DesktopOnlyNotice />}
              />
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
