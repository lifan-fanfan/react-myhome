import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xy: [{
        'x': 116.43244,
        'y': 39.929986
      }, {
        'x': 116.424355,
        'y': 39.92982
      }, {
        'x': 116.423349,
        'y': 39.935214
      }, {
        'x': 116.350444,
        'y': 39.931645
      }, {
        'x': 116.351684,
        'y': 39.91867
      }, {
        'x': 116.353983,
        'y': 39.913855
      }, {
        'x': 116.357253,
        'y': 39.923152
      }, {
        'x': 116.349168,
        'y': 39.923152
      }, {
        'x': 116.354954,
        'y': 39.935767
      }, {
        'x': 116.36232,
        'y': 39.938339
      }, {
        'x': 116.374249,
        'y': 39.94625
      }, {
        'x': 116.380178,
        'y': 39.953053
      }]
    }
  }
  handlegolast = () => {
    let { history } = this.props
    history.go(-1)
  }
  mapInit = () => {
    // 百度地图API功能
  let BMap = window.BMap
	let map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
	map.enableScrollWheelZoom();


	let MAX = 10;
	let markers = [];
	let pt = null;
  let i = 0;
  let xy = this.state.xy
  for (let i in xy) {
    // 单个点坐标
    pt = new BMap.Point(xy[i].x, xy[i].y);
    markers.push(new BMap.Marker(pt));
  }
  //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
  let BMapLib = window.BMapLib
	// var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
  let markerClusterer = new BMapLib.MarkerClusterer(map, {
    markers: markers,
    girdSize: 100,
    styles: [{
      background: 'rgba(12,181,106,0.9)',
      size: new BMap.Size(92, 92),
      textSize: '16',
      textColor: '#fff',
      borderRadius: 'true'
    }],
  });

    // ---------------------------
    /*
    // 百度地图API功能
    let BMap = window.BMap
    let map = new BMap.Map('allmap') // 创建Map实例
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [
          window.BMAP_NORMAL_MAP, 
          window.BMAP_HYBRID_MAP
        ]
      })
    )
    // map.centerAndZoom("上海",15);
    map.centerAndZoom("北京",15);
    map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    */
  }
  componentDidMount() {
    this.mapInit()  
  }
  render() {
    let param = this.props.location.state.query
    return (
      <div className="house-list">
        <div className="house-list-title">
          <Icon onClick={this.handlegolast} name="angle left" size="large" />
          {param.mname}
        </div>
        <div className = "map-house-content" id="allmap" />
      </div>
    )
  }
}
export default withRouter(Map)
