import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsername = event => {
    let username = event.target.value
    this.setState({
      username: username
    })
  }
  handlePassword = event => {
    let password = event.target.value
    this.setState({
      password: password
    })
  }
  submit = async () => {
    // http://47.96.21.88:8086/users/login   登录接口地址
    let res = await axios.post(
      'users/login',
      {
        uname: this.state.username,
        pwd: this.state.password
      }
    )
    if (res.meta.status !== 200) {
      return alert(res.meta.msg)
    }
    sessionStorage.setItem('mytoken',res.data.token)
    // console.log(res)
    let {history} = this.props
    history.push('/home')
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-logo">
          <i className="massive home icon yellow" />
        </div>
        <div className="login-form">
          <Form>
            <Form.Input
              iconPosition="left"
              icon="user"
              placeholder="请输入用户名"
              value={this.state.username}
              onChange={this.handleUsername}
            />
            <Form.Input
              type="password"
              iconPosition="left"
              icon="lock"
              placeholder="请输入密码"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <Button primary fluid onClick={this.submit}>
              登录
            </Button>
          </Form>
        </div>
        <div className="ui horizontal divider line">第三方登录</div>
        <div className="login-three">
          <i className="big wechat icon" />
          <i className="big qq icon" />
          <i className="big weibo icon" />
        </div>
      </div>
    )
  }
}
export default withRouter(Login)
