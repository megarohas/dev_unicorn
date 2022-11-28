import Layout from "../components/layout/layout";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "react-day-picker/dist/style.css";
import App from "next/app";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import getConfig from "next/config";

function MyApp({ Component, pageProps, phantom_keystone_session }) {
  // console.log("MyApp", props);
  // const { store } = useStore(pageProps.initialReduxState);

  const { store, persistor } = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      {/*<PersistGate loading={null} persistor={persistor}>*/}
      {/*<NextUIProvider>*/}
      <Layout phantom_keystone_session={phantom_keystone_session}>
        <Component {...pageProps} />
      </Layout>
      {/*</NextUIProvider>*/}
      {/*</PersistGate>*/}
    </Provider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const pageProps = await App.getInitialProps(ctx);

  const {
    publicRuntimeConfig: { API_URL },
  } = getConfig();

  return {
    ...pageProps,
    phantom_keystone_session: !!ctx.ctx.req.cookies.phantom_keystone_session,
  };
};

export default MyApp;
