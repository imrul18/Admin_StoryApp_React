import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stores

import { store } from "redux/store.js";
import { Provider } from "react-redux";

import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "context/LoaderContext.js";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_ADMINDURL}`;

toast.configure();
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <LoaderProvider>
            <Switch>
              <Route path="/" component={Admin} />
            </Switch>
          </LoaderProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}
