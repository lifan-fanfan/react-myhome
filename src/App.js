import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './module/main'
import Login from './Login'
import './App.css'
import AuthCheck from './Auth'
import './assets/fonts/iconfont.css'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import {baseURL} from './common'
axios.defaults.baseURL = baseURL

// 统一处理接口的token（axios请求拦截器）
axios.interceptors.request.use(function (config) {
  if(!config.url.endsWith('/')){
    config.headers.Authorization = sessionStorage.getItem('mytoken');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// axios 响应拦截器解决data过长问题
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <AuthCheck path="/home" component={Main} />
          <Route render={()=>{return <div>找不到当前路由</div>}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
