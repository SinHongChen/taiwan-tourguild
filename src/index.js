import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "style/_variable.scss";
import { HashRouter, Switch } from "react-router-dom";
import { ScrollTop } from "components/hub/LayoutHub";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
