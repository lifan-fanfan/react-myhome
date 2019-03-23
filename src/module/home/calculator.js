import React, { Component } from 'react'
import { Icon, Tab, Grid, Dropdown, Input, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
class Myeharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ value: 335, name: '贷款总额' }, { value: 310, name: '支付利息' }]
    }
  }
  getOption = () => {
    let option = {
      title: {
        text: '贷款数据统计',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['贷款总额', '支付利息']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.state.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option
  }
  handle = () => {
    // 这里必须深拷贝一个arr
    let {total} = this.props
    let arr = [...this.state.data]
    arr[0].value = total
    arr[1].value = total * 0.2
    this.setState({
      data: arr
    })
    let opt = this.getOption()
    this.echartsRef.getEchartsInstance().setOption(opt);
    console.log(this.echartsRef)
  }
  render() {
    return (
      <div>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={this.handle} fluid color="green">
              计算
            </Button>
          </Grid.Column>
        </Grid.Row>
        <ReactEcharts ref={(e)=>{this.echartsRef = e}} option={this.getOption()} />
      </div>
    )
  }
}
class Calc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      year: 1,
      total: 0,
      rate: 1
    }
  }
  handlegolast = () => {
    let { history } = this.props
    history.go(-1)
  }
  handleChange = (e, { value }) => {
    this.setState({
      type: value
    })
    // console.log(this.state.type)
  }
  handleYear = (e, { value }) => {
    this.setState({
      year: value
    })
  }

  handleTotal = (e) => {
    // Input组件数据的绑定方式和原始方式一致
    this.setState({ 
      total: e.target.value
    });
  }
  generateYears = n => {
    let arr = []
    for (let i = 1; i <= n; i++) {
      arr.push({
        key: i,
        text: i,
        value: i
      })
    }
    return arr
  }
  handleRate = (e, { value }) => {
    this.setState({
      rate: value
    })
  }
  render() {
    // console.log(this.generateYears(25))
    const options = [
      { key: 1, text: '按房间总额', value: 1 },
      { key: 2, text: '按贷款总额', value: 2 }
    ]
    const rates = [
      { key: 1, text: '基准利率(3.25%)', value: 1 },
      { key: 2, text: '基准利率9.5折', value: 2 },
      { key: 3, text: '基准利率9折', value: 3 },
      { key: 4, text: '基准利率8.5折', value: 4 }
    ]
    let frist = (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>贷款方式</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              onChange={this.handleChange}
              options={options}
              placeholder="请选择利率"
              selection
              value={this.state.type}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>贷款总额</Grid.Column>
          <Grid.Column width={10}>
          <Input onChange={this.handleTotal} value={this.state.total} className='calc-first-total' placeholder='贷款总额' />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>贷款年限</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              onChange={this.handleYear}
              options={this.generateYears(25)}
              placeholder="请选择年限"
              selection
              value={this.state.year}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>贷款利率</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              onChange={this.handleRate}
              options={rates}
              placeholder="请选择利率"
              selection
              value={this.state.rate}
            />
          </Grid.Column>
        </Grid.Row>
        {/* <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={this.handleCalc} fluid color="green">
              计算
            </Button>
          </Grid.Column>
        </Grid.Row> */}
        <div className="calc-chart">
          <Myeharts total={this.state.total} />
        </div>
      </Grid>
    )
    let param = this.props.location.state.query
    const panes = [
      { menuItem: '公积金贷款', render: () => <Tab.Pane>{frist}</Tab.Pane> },
      { menuItem: '商业贷款', render: () => <Tab.Pane>商业贷款</Tab.Pane> },
      { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> }
    ]
    return (
      <div className="house-list">
        <div className="house-list-title">
          <Icon onClick={this.handlegolast} name="angle left" size="large" />
          {param.mname}
        </div>
        <div>
          <Tab panes={panes} />
        </div>
      </div>
    )
  }
}
export default withRouter(Calc)
