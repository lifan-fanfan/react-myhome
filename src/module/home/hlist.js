import React, { Component } from 'react'
import { Icon , Item } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {baseURL} from '../../common'

class Hlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      houseList: []
    }
  }
  handlegolast = () => {
    let { history } = this.props
    history.go(-1)
  }
  componentDidMount = async () => {
    let param = this.props.location.state.query
    let ret = await axios.post('homes/list', { home_type: param.type })
    this.setState({
      houseList: ret.data
    })
  }
  render() {
    let param = this.props.location.state.query
    let hostListinfo = this.state.houseList.map(item => {
      return (
        <Item key={item.id}>
          <Item.Image src={baseURL + 'public/home.png'} />
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>{item.home_tags}</Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>
      )
    })
    return (
      <div className="house-list">
        <div className="house-list-title">
          <Icon onClick={this.handlegolast} name="angle left" size="large" />
          {param.mname}
        </div>
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            {hostListinfo}
          </Item.Group>
        </div>
      </div>
    )
  }
}
export default withRouter(Hlist)
