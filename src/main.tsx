import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { dojoConfig } from "../dojoConfig.ts";
import App from "./App.tsx";

import { DojoProvider } from "./dojo/DojoContext.tsx";
import { setup } from "./dojo/setup.ts";
import "./index.css";
import { LoadingScreen } from "./pages/LoadingScreen.tsx";
import { preloadImages } from "./utils/preloadImages.ts";
import { I18nextProvider } from "react-i18next";
import localI18n from "./i18n.ts";
import i18n from "i18next";

async function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("React root not found");
  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(<LoadingScreen />);

  const loadImages = async () => {
    await i18n.loadNamespaces(["traditional-cards", "neon-cards"]);
    preloadImages();
  };

  i18n.on("initialized", loadImages);

  try {
    const setupResult = await setup(dojoConfig);
    const queryClient = new QueryClient();
    root.render(
      <DojoProvider value={setupResult}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <I18nextProvider i18n={localI18n} defaultNS={undefined}>
              <App />
            </I18nextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </DojoProvider>
    );
  } catch (e) {
    console.error(e);
    root.render(<LoadingScreen error />);
  }
}

init();
