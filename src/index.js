import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "style/_variable.scss";
import { HashRouter, Switch } from "react-router-dom";
import ScrollTop from "components/basic/ScrollTop";
import store from "store/store";
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ScrollTop>
          <Switch>
            <App />
          </Switch>
        </ScrollTop>
      </HashRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

