import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import $ from 'jquery';
import {Modal, Button} from 'antd';
import InputRange from'react-input-range';
import 'antd/es/date-picker/style/css';
import 'react-input-range/lib/css/index.css';
var ol = require('openlayers');
require('openlayers/css/ol.css');
/*
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
}*/
class Variousmaps extends React.Component{
  constructor(props){
    super(props);
    this.state={ haschosen:false, 
                  lvalue:30, 
                  svalue:30,
                  tvalue:30,
                  id:"" };
    this.handleKChange=this.handleKChange.bind(this);
    this.onOChange=this.onOChange.bind(this);
  }
  onOChange(e){
    this.props.onChange(e,this.state.id);
  }
  handleKChange(e){
    this.setState({haschosen:!this.state.haschosen});
    if(e.target.checked)
    {
       this.props.handleKChange(e.target.value);
    }
    else
    {
      this.props.cancelKChange(e.target.value);
    }
  }
  render(){
    return(
      <div id="vmaps">
      <input id="light" type="checkbox" name="creature" value="light" onClick={this.handleKChange}/>光环境地图
      <InputRange
        id="light"
        maxValue={100}
        minValue={0}
        value={this.state.lvalue}
        onChange={lvalue => this.setState({ lvalue,id:"light" })}
        onChangeComplete={this.onChange} />      
      <input id="thermo" type="checkbox" name="creature" value="thermo" onClick={this.handleKChange}/>热环境地图
      <InputRange
        id="thermo"
        maxValue={100}
        minValue={0}
        value={this.state.tvalue}
        onChange={tvalue => this.setState({ tvalue,id:"thermo"})}
        onChangeComplete={this.onChange} /> 
      <input id="sound" type="checkbox" name="creature" value="sound" onClick={this.handleKChange}/>声环境地图
      <InputRange
        id="sound"
        maxValue={100}
        minValue={0}
        value={this.state.svalue}
        onChange={svalue => this.setState({ svalue,id:"sound" })}
        onChangeComplete={this.onOChange} /> 
      </div>
    );
  }
}
class Animals extends React.Component{
  constructor(props){
    super(props);
    this.handleWChange=this.handleWChange.bind(this);
    this.handleYChange=this.handleYChange.bind(this);
  }
  handleWChange(e){
    this.props.handleWChange(e.target.value);
  }
  handleYChange(e){
    this.props.handleYChange(e.target.value);
    
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
      <input id="qita" type="checkbox" className="creature" value="bailu" onClick={this.handleWChange}/>其他
      <select id="box" onChange={this.handleYChange}>
      </select>阈值<br/>
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
        this.state.firstVisible?<Variousmaps value={this.props.value} onChange={this.props.onChange}
                kind={this.props.kind}  cancelKChange={this.props.cancelKChange} handleKChange={this.props.handleKChange}/>:null
      }
      <div onClick={this.onsecondClick} className="title">物种</div>
      {
        this.state.secondVisible?<Animals  
            kind={this.props.kind}
            yuzhi={this.props.yuzhi}
            wuzhong={this.props.wuzhong}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}/>:null
      }
      <div id="mouse-position"></div>
      <div id="result">
    <input type="button" onClick={this.handleclick} value="添加" />
    <input type="button" onclick="delete_control();" value="删除" />
    <div id="btn2"><button type="button">定位到北京</button></div>
  </div>
  
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
      wuzhong:'',
      yuzhi:'',
      value:10,
      lightlayer:new ol.layer.Tile({}),
      thermolayer:new ol.layer.Tile({}),
      soundlayer:new ol.layer.Tile({})
      }
    this.map= new ol.Map({
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
      //target: 'allmap',
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
    this.handleKChange=this.handleKChange.bind(this);
    this.handleWChange=this.handleWChange.bind(this);
    this.handleYChange=this.handleYChange.bind(this);
    this.cancelKChange=this.cancelKChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.handleAddLayer=this.handleAddLayer.bind(this);
  }
  onChange(e,kind){
    this.setState({value:e});
   //alert(e);
   let value=1-e/100;
   if(kind=="light")
   { 
      this.state.lightlayer.setOpacity(value);
    }
    if(kind=="sound")
    {
      this.state.soundlayer.setOpacity(value);
    }
  }
  cancelKChange(e){
    this.setState({kind:''});
    if(e=='light')
    {
      this.map.removeLayer(this.state.lightlayer);
    }
    if(e=='thermo')
    {
      this.map.removeLayer(this.state.thermolayer);
    }
    if(e=='sound')
    {
      this.map.removeLayer(this.state.soundlayer);
    }
  }
  handleKChange(e){
    this.setState({kind:e});
    if(this.state.wuzhong!='')
    {
      this.handleAddLayer(e,this.state.wuzhong,this.state.yuzhi);
    }
  }
  handleAddLayer(kind,wuzhong,yuzhi)
  {
    if(kind=="light")
    {
      var tuceng='hu:huguang';
      tuceng=tuceng+yuzhi
      var wmsSource = new ol.source.TileWMS({
          url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
            params:{
              'LAYERS':tuceng,//要加载的图层，可以为多个
               'TILED':false,
            },
            serverType:'geoserver',//服务器类型
          })
      var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
      this.setState({lightlayer:layer1});
    }
    if(kind=="sound")
    {
      var tuceng='hu:sheng';
      tuceng=tuceng+yuzhi;  
      var wmsSource = new ol.source.TileWMS({
      url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
       params:{
            'LAYERS':tuceng,//要加载的图层，可以为多个
           'TILED':false,
        },
      serverType:'geoserver',//服务器类型
      });
      var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
      this.setState({soundlayer:layer1});
    }
    this.map.addLayer(layer1)
  }
  handleWChange(e){
    if(this.state.kind)
    {
      this.setState({wuzhong:e});
    }
    if(this.state.kind=="light")
    {
      document.getElementById("box").innerHTML="<option value=''>0</option><option value='100.8'>100.8</option><option value='62.82'>62.82</option><option value='80.83'>80.83</option>"
    }
    if(this.state.kind=="sound")
    {
      document.getElementById("box").innerHTML="<option value=''>0</option><option value='62'>62</option><option value='66'>66</option><option value='70'>70</option>"
    }
    //此处使用于其他，有固定阈值的物种需要先将阈值放入yuzhi，再调用函数
      this.handleAddLayer(this.state.kind,e,this.state.yuzhi)
  }
  handleYChange(e){
    this.setState({yuzhi:e});
    if(this.state.kind=="light")
    {
      this.map.removeLayer(this.state.lightlayer);
    }
    if(this.state.kind=="thermo")
    {
      this.map.removeLayer(this.state.thermolayer);
    }
    if(this.state.kind=="sound")
    {
      this.map.removeLayer(this.state.soundlayer);
    }
    this.handleAddLayer(this.state.kind,this.state.wuzhong,e)
  }
  componentDidMount(){
    this.map.setTarget("allmap");
        const {BMap,BAMP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT,BMapLib} = window
    var baimap = new BMap.Map("l-map");  
document.getElementById('btn2').onclick=function(){
// 创建地址解析器实例     
  var myGeo = new BMap.Geocoder();      
  // 将地址解析结果显示在地图上，并调整地图视野    
  myGeo.getPoint("北京市海淀区上地10街10号", function(point){ //这里换成用户的输入     
    if (point) {  
       this.map.getView().setCenter([point.lng,point.lat]);
      this.map.getView().setZoom(11);
    }      
   }, 
  "北京市");//规定用户一定要输入城市
      
};
  };
  
  render(){

    return (
        <div>
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
      
  <Frontend 
            kind={this.state.kind} 
            yuzhi={this.state.yuzhi}
            wuzhong={this.state.wuzhong}
            value={this.state.value}
            onChange={this.onChange}
            cancelKChange={this.cancelKChange}
            handleKChange={this.handleKChange}
            handleYChange={this.handleYChange}
            handleWChange={this.handleWChange}/>
 
          </div>
    )
  }
}
export default App;

