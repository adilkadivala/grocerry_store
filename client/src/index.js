import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import Store from "./store/Store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <Auth0Provider
      domain="dev-uttihpqxwtqd2xnr.us.auth0.com"
      clientId="7DZwazDMT4kbeYfIlrILCICqodgmv9vA"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Auth0Provider>
  </Provider>
);
