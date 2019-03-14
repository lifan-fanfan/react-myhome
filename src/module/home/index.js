import React, { Component } from 'react'
import { Input, Grid, Icon, Item, Button, Dimmer, Loader } from 'semantic-ui-react'
import './index.css'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import axios from 'axios'
import { baseURL } from '../../common'


// 房源组件
function House(props){
  let {houseData} = props
  let newHouse = []
  let oldHouse = []
  let hireHouse = []
  houseData.forEach(item => {
    let houstContet = (
      <Item key={item.id}>
        <Item.Image src={baseURL+'public/home.png'}/>
        <Item.Content>
          <Item.Header>{item.home_name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{item.home_desc}</span>
          </Item.Meta>
          <Item.Description>
            {item.home_tags.split(',').map((tag,index)=>{return <Button key={index} basic color='green' size='mini'>{tag}</Button>})}
          </Item.Description>
          <Item.Description>{item.home_price}</Item.Description>
        </Item.Content>
      </Item>
    )
    if(item.home_type===1) {
      newHouse.push(houstContet)
    } else if(item.home_type===2) {
      oldHouse.push(houstContet)
    } else {
      hireHouse.push(houstContet)
    }
  });

  return (
    <div>
      <div>
        <div className='home-hire-title'>最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>组一个家</div>
        <Item.Group divided unstackable>
          {hireHouse}
        </Item.Group>
      </div>
    </div>
  )
}
// 问答组件
function Faq(props) {
  let { faqData } = props
  let faqContent = faqData.map(item => {
    let arr = item.question_tag.split(',')
    let btns = arr.map((item, index) => {
      return (
        <Button key={index} basic color="green" size="mini">
          {item}
        </Button>
      )
    })
    return (
      <li key={item.question_id}>
        <div>
          <Icon name="question circle outline" />
          <span>{item.question_name}</span>
        </div>
        <div>
          {btns}
          <div>
            {item.atime} ● <Icon name="comment alternate outline" /> {item.qnum}
          </div>
        </div>
      </li>
    )
  })
  return (
    <div className="home-ask">
      <div className="home-ask-title">好客问答</div>
      <ul>{faqContent}</ul>
    </div>
  )
}
// 资讯组件
function Info(props) {
  let { infoData } = props
  let infoContent = infoData.map(item => {
    return (
      <Item.Header key={item.id}>
        <span>限购 ●</span>
        <span>{item.info_title}</span>
      </Item.Header>
    )
  })
  return (
    <Item.Group unstackable>
      <Item className="home-msg-img">
        <Item.Image size="tiny" src={baseURL + 'public/zixun.png'} />
        <Item.Content verticalAlign="top">
          {infoContent}
          <div className="home-msg-more">
            <Icon name="angle right" size="big" />
          </div>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
// 菜單組件
function Menu(props) {
  let { menuData } = props
  let menuInfo = menuData.map(item => {
    return (
      <Grid.Column key={item.id}>
        <div className="home-menu-item">
          <Icon name="home" size="big" />
        </div>
        <div>{item.menu_name}</div>
      </Grid.Column>
    )
  })
  return (
    <Grid columns={4} divided padded>
      <Grid.Row>{menuInfo}</Grid.Row>
    </Grid>
  )
}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipe: [],
      menu: [],
      info: [],
      faq: [],
      house: [],
      loadFlag: true
    }
  }
  loadData = (pathName) => {
    return axios.post(pathName).then(res => {
      return res.data.list
      // this.setState({
      //   [dataName]: res.data.list
      // })
    })
  }
  componentDidMount() {
    let swipe = this.loadData('homes/swipe')
    let menu = this.loadData('homes/menu')
    let info = this.loadData('homes/info')
    let faq = this.loadData('/homes/faq')
    let house = this.loadData('/homes/house')
    Promise.all([swipe,menu,info,faq,house]).then(ret=>{
      this.setState({
        swipe: ret[0],
        menu: ret[1],
        info: ret[2],
        faq: ret[3],
        house: ret[4]
      },()=>{
        this.setState({
          loadFlag: false
        })
      })
    })
  }
  render() {
    return (
      <div className="home-container">
        {/*遮罩效果*/}
        <Dimmer inverted active={this.state.loadFlag} page>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className="search-container">
          <Input fluid icon="search" placeholder="请输入搜索内容" />
        </div>
        <div className="home-content">
          <div>
            <ImageGallery
              showThumbnails={false}
              showPlayButton={false}
              autoPlay={true}
              slideInterval={3000}
              preventDefaultTouchmoveEvent={true}
              showFullscreenButton={false}
              showNav={false}
              swipeThreshold={30}
              items={this.state.swipe}
            />
          </div>
          {/* 菜单组件 */}
          <div>
            <Menu menuData={this.state.menu} />
          </div>
          {/* 资讯组件 */}
          <div className="home-msg">
            <Info infoData={this.state.info} />
          </div>
          {/* 问答组件 */}
          <div>
            <Faq faqData={this.state.faq} />
          </div>
          {/* 房源组件 */}
          <div>
            <House houseData={this.state.house} />
          </div>
          <div className="foot" />
        </div>
      </div>
    )
  }
}
export default Home
