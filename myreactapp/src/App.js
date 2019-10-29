import logo from './logo.svg';
import './App.css';
import { Slider, Handles, Tracks } from 'react-compound-slider'
import React, {Component} from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import $ from 'jquery';
import {Modal, Button} from 'antd';
import 'antd/es/date-picker/style/css';
//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');
export function Handle({ // your handle component
  handle: { id, value, percent }, 
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: 0,
        marginRight:5,
        marginTop: 15,
        zIndex: 2,
        width: 15,
        height: 15,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -18 }}>
        {value}
      </div>
    </div>
  )
}
class Sliders extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const sliderStyle = {  // Give the slider some width
  position: 'relative',
  width: '80%',
  height: 30,
  backgroundColor:'#FFFFFF'
  }
  const railStyle = { 
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 17,
  borderRadius: 5,
  backgroundColor: '#8B9CB6',
  display:'inline'
}
  return(
    <div>
    
    <Slider
    rootStyle={sliderStyle} // inline styles for the outer div. Can also use className prop.
    domain={[0, 100]}
    values={[this.props.value]}
    onUpdate={this.onUpdate}
          onChange={this.onChange}
    >
    <div style={railStyle} />
      <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
</Slider>
</div>)
  
}}
class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state={
    loading: false,
    visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
class Variousmaps extends React.Component{
  constructor(props){
    super(props);
    this.state={value:10};
  }

  render(){
    return(
      <div id="vmaps">
      <input id="light" type="checkbox" name="creature" value="light"/>光环境地图
      <Sliders value={this.state.value}/>
      <input id="thermo" type="checkbox" name="creature" value="thermo"/>热环境地图
      <Sliders value={this.state.value}/>
      <input id="sound" type="checkbox" name="creature" value="sound"/>声环境地图
      <Sliders value={this.state.value}/>
      </div>
    );
  }
}
class Animals extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
    <div id="animals">
    <input id="bailu" type="checkbox" className="creature" value="bailu"/>白鹭<input 
        className="yuzhi" value="2"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>燕雀<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>黑尾蜡嘴<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input id="qita" type="checkbox" className="creature" value="bailu"/>其他
      <select id="box"></select>阈值<br/>
    </div>)
  }
}
class Frontend extends React.Component{
  constructor(props){
    super(props);
    this.state={firstVisible:true,secondVisible:true};
    this.onfirstClick=this.onfirstClick.bind(this);
    this.onsecondClick=this.onsecondClick.bind(this);
  }
  onfirstClick(){
    this.setState({firstVisible: !this.state.firstVisible});
  }
  onsecondClick(){
    this.setState({secondVisible: !this.state.secondVisible});
  }
  render(){
    return(
      <div id="choices">
      <div onClick={this.onfirstClick} className="title">物理环境地图</div>
      {
        this.state.firstVisible?<Variousmaps/>:null
      }
      <div onClick={this.onsecondClick} className="title">物种</div>
      {
        this.state.secondVisible?<Animals kind={this.props.kind} handleChange={this.props.handleChange}/>:null
      }
      <div id="mouse-position"></div>
      <div id="result">
    <input type="button" onclick="add_control();" value="添加" />
    <input type="button" onclick="delete_control();" value="删除" />
    <div id="btn2"><button type="button">定位到北京</button></div>
  </div>
  <Upload id='uploadfile'/>
  <div id="r-result">区域搜索:<input type="text" id="suggestId" size="20" value="百度" /></div>
  <div id="searchResultPanel" ></div>

      </div>
    )
  }
}


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      kind:'',
      yuzhi:'',
      e_click:false,
      c_click:false,
      s_click:false,
      t_click:false
    }
    this.changestate=this.changestate.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  changestate(){
      this.setState({kind:'hu:huguang',e_click:true});
  }
  handleChange(e){
      this.setState({yuzhi:e});
  }
  componentDidMount(){
    var map = new ol.Map({
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
      target: 'allmap',
      view: new ol.View({
        center: [118.06, 24.27],
        maxZoom: 19,
        zoom: 10,
        projection: 'EPSG:4326'
      }),
      controls: ol.control.defaults().extend([
                new ol.control.MousePosition({
                  coordinateFormat: ol.coordinate.createStringXY(4),      // 将坐标保留4位小数位，并转换为字符串
            projection: 'EPSG:4326',                                // 定义投影
            className: 'custom-mouse-position',                     // 控件的CSS类名
            target: document.getElementById('mouse-position'),      // 将控件渲染在该DOM元素中
            undefinedHTML: '&nbsp;'                                 // 鼠标离开地图时，显示空格
                }),      // 实例化坐标拾取控件，并加入地图
            new ol.control.ScaleLine({}),
            new ol.control.ZoomSlider({})
            ])

    });
        const {BMap,BAMP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT,BMapLib} = window
    var baimap = new BMap.Map("l-map");  
document.getElementById('btn2').onclick=function(){
// 创建地址解析器实例     
  var myGeo = new BMap.Geocoder();      
  // 将地址解析结果显示在地图上，并调整地图视野    
  myGeo.getPoint("北京市海淀区上地10街10号", function(point){ //这里换成用户的输入     
    if (point) {  
       map.getView().setCenter([point.lng,point.lat]);
      map.getView().setZoom(11);
    }      
   }, 
  "北京市");//规定用户一定要输入城市
      
};
    var e_click=false;
    var c_click=false;
    var t_click=false;
    var s_click=false;
    var kind=this.state.kind;
    var yuzhi=this.state.yuzhi;
    document.getElementById('light').onclick=function(){
                     // this.setState({e_click:!this.state.e_click});
                     e_click=!e_click;
                     
                    }
    document.getElementById('sound').onclick=function(){
                     // this.setState({e_click:!this.state.e_click});
                     s_click=!s_click;
                     
                    }
   // document.getElementById('light').onclick=this.changestate;
    document.getElementById('qita').onclick=function() {
      if(e_click)
      {
        var wmsSource = new ol.source.TileWMS({
    url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
    params:{
        'LAYERS':'hu:huguang',//要加载的图层，可以为多个
        'TILED':false,
    },
    serverType:'geoserver',//服务器类型
  
})
        var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
        map.addLayer(layer1);
    document.getElementById('box').innerHTML=
                                "<option value='100.8'>100.8</option><option value='62.82'>62.82</option><option value='80.83'>80.83</option>";
    document.getElementById('box').onchange=function(){
      map.removeLayer(layer1);
      var tuceng='hu:huguang';
      tuceng=tuceng+document.getElementById('box').value
      var wmsSource = new ol.source.TileWMS({
    url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
    params:{
        'LAYERS':tuceng,//要加载的图层，可以为多个
        'TILED':false,
    },
    serverType:'geoserver',//服务器类型
  
})
        var layer = new ol.layer.Tile({
                 source:wmsSource
           });

       /* document.getElementById('ok').oninput=function() {
    var value = document.getElementById("ok").value;
    layer1.setOpacity(value);
 }*/
         map.addLayer(layer);
         layer1=layer;
       }}
     if(s_click)
     {
       var wmsSource = new ol.source.TileWMS({
    url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
    params:{
        'LAYERS':'hu:sheng',//要加载的图层，可以为多个
        'TILED':false,
    },
    serverType:'geoserver',//服务器类型
  
})
        var layer3 = new ol.layer.Tile({
                 source:wmsSource
           });
        map.addLayer(layer3);
      document.getElementById('box').innerHTML=
                                "<option value='70'>70</option><option value='66'>66</option><option value='62'>62</option><option value='60'>60</option>";
    document.getElementById('box').onchange=function(){
      map.removeLayer(layer3);
      var tuceng='hu: wsheng';
      tuceng=tuceng+document.getElementById('box').value
      var wmsSource = new ol.source.TileWMS({
    url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
    params:{
        'LAYERS':tuceng,//要加载的图层，可以为多个
        'TILED':false,
    },
    serverType:'geoserver',//服务器类型
  
})
        var layer4 = new ol.layer.Tile({
                 source:wmsSource
           });
       /* document.getElementById('ok').oninput=function() {
    var value = document.getElementById("ok").value;
    layer1.setOpacity(value);
 }*/
         map.addLayer(layer4);
         layer3=layer4;
       }
     }
    }     
  };
  
  render(){

    return (
        <div>
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
      
  <Frontend kind={this.state.kind} handleChange={this.handleChange}/>
          </div>
    )
  }
}
export default App;

