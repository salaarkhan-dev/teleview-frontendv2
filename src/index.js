import React, { Suspense, lazy } from "react";
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
import Preloader from "./components/Preloader";

const App = lazy(() => import("./App"));
let persistor = persistStore(store);

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
          <Suspense fallback={<Preloader />}>
            <App />
          </Suspense>
        </SnackbarProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
