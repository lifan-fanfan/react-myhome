import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './module/main'
import Login from './Login'
import './App.css'
import AuthCheck from './Auth'
import './assets/fonts/iconfont.css'
import 'semantic-ui-css/semantic.min.css'
function Abc(){
  return <div>abc</div>
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <AuthCheck path="/home" component={Main} />
          <AuthCheck path="/abc" component={Abc} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
