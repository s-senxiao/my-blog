import './custom.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Frame from './components/frame/Frame'
import './index.css'
// import App from './App';
import * as serviceWorker from './serviceWorker'
import 'antd/dist/antd.css'
// import api from './helper/api'

// React.__proto__.$api = api

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Switch>
      <Route component={Frame}></Route>
    </Switch>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
