import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';

import { mainRouter } from './routes'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" render={(routerProps)=>{
        // TODO: 权限,需要登入才能访问admin
        return <App {...routerProps} />
      }} />
      {
        mainRouter.map( route => {
          return <Route key={route.pathname} path={route.pathname} component={route.component} />
        })
      }
      <Redirect form='/' to='/admin' exact/>
      <Redirect to='404' />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

