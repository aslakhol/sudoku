import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import SettingsProvider from "../components/SettingsProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
};

export default MyApp;
