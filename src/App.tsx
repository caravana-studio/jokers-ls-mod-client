import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ChooseClassPage } from "./pages/ChooseClassPage";
import { ChooseModifiersPage } from "./pages/ChooseModifiersPage";
import { ChooseSpecialsPage } from "./pages/ChooseSpecialsPage";
import { GamePage } from "./pages/Game/GamePage";
import { Home } from "./pages/Home";
import { AudioPlayerProvider } from "./providers/AudioPlayerProvider";
import { CardAnimationsProvider } from "./providers/CardAnimationsProvider";
import { GameProvider } from "./providers/GameProvider";
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
              <Route path="/choose-class" element={<ChooseClassPage />} />
              <Route path="/game/:mode" element={<GamePage />} />
              <Route
                path="/choose-modifiers"
                element={<ChooseModifiersPage />}
              />
              <Route path="/choose-specials" element={<ChooseSpecialsPage />} />
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
