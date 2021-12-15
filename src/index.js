import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
// import Preloader from "./components/Preloader";
import { APP_ID } from "./api/agora";

import { AgoraProvider } from "@agnostech/react-agora-ng";
import AgoraRTC from "agora-rtc-sdk-ng";

// mode can be rtc or live. Refer Agora NG SDK docs for more info
import App from "./App"
// const App = lazy(() => import("./App"));
let persistor = persistStore(store);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          
            <AgoraProvider client={client} appId={APP_ID}>
              <App />
            </AgoraProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
