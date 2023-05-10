import CustomHeader from "@/components/layout/header/CustomHeader";
import { store } from "@/redux/store";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CustomHeader />
      <Component {...pageProps} />
    </Provider>
  );
}
