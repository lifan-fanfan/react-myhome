import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
class AuthCheck extends Component {
  render() {
    const { component: Component, path } = this.props
    let isLogin = sessionStorage.getItem('mytoken') ? true : false
    let info = <Component />
    return (
      <Route
        to={path}
        render={() => {
          if (!isLogin) {
            info = <Redirect to="/" />
          }
          return info
        }}
      />
    )
  }
}
export default AuthCheck