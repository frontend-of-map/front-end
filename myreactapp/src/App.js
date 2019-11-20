import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import $ from 'jquery';
import {Modal, Button,Table,Select} from 'antd';
import InputRange from'react-input-range';
import 'antd/es/date-picker/style/css';
import 'react-input-range/lib/css/index.css';
import 'katex/dist/katex.min.css';
import { InlineMath} from 'react-katex';
var ol = require('openlayers');
const ButtonGroup=Button.Group;
const {Option}=Select;
//const InlineMath = ReactKaTeX.InlineMath;
require('openlayers/css/ol.css');
class Guanglegend extends React.Component{
  render(){
    var h="`W``/`` (m^2 \cdot sr \cdot \mu m)`";
    //alert("ok");
    return(
      <div id="legend">
        <img src="http://118.31.56.186:8086/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=hu:huguang&STYLE=huguang2"/>
<div className="formula">
        <label>单位：</label><InlineMath math="W/(m^2⋅sr⋅μm)"></InlineMath>
 </div>
 </div>
      )
  }
}
class Shenglegend extends React.Component{
  render(){
    return(
        <div id="legend">
        <img src="http://118.31.56.186:8086/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=hu:sheng&STYLE=sheng"/>
 <div class="formula">
        <label>单位：</label><span>dB</span>
 </div>
 </div>
    )
  }
}
class Variousmaps extends React.Component{
  constructor(props){
    super(props);
    this.state={ haschosen:false, 
                  lvalue:60, 
                  svalue:60,
                  tvalue:60,
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
        onChangeComplete={this.onOChange} />      
      <input id="thermo" type="checkbox" name="creature" value="thermo" onClick={this.handleKChange}/>热环境地图
      <InputRange
        id="thermo"
        maxValue={100}
        minValue={0}
        value={this.state.tvalue}
        onChange={tvalue => this.setState({ tvalue,id:"thermo"})}
        onChangeComplete={this.onOChange} /> 
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
    <tbody>
    <table>
    <tr>
        <th><input id="bailu" type="checkbox" className="creature" value="bailu"/></th>
        <th>白鹭</th>
        <th><input className="yuzhi" value="2"/></th>
        <th>阈值</th>
    </tr>
    <tr>
        <th><input id="bailu" type="checkbox" className="creature" value="bailu"/></th>
        <th>燕雀</th>
        <th><input className="yuzhi" value="100"/></th>
        <th>阈值</th>
    </tr>
    <tr>
        <th><input id="bailu" type="checkbox" className="creature" value="bailu"/></th>
        <th>黑尾蜡嘴</th>
        <th><input className="yuzhi" value="100"/></th>
        <th>阈值</th>
    </tr>
    <tr>
        <th><input id="qita" type="checkbox" className="creature" value="bailu" onClick={this.handleWChange}/></th>
        <th>其他</th>
        <th><select id="box" onChange={this.handleYChange}></select></th>
        <th>阈值</th>
    </tr>
    </table>
    </tbody>
    </div>)
  }
}
class Frontend extends React.Component{
  constructor(props){
    super(props);
    this.state={firstVisible:true,secondVisible:true};
    this.onfirstClick=this.onfirstClick.bind(this);
    this.onsecondClick=this.onsecondClick.bind(this);    
    this.oninputchange=this.oninputchange.bind(this);
    this.handleLocate=this.handleLocate.bind(this);
  }
  handleLocate(e){
    this.props.handleLocate(e);
  }
  onfirstClick(){
    this.setState({firstVisible: !this.state.firstVisible});
  }
  onsecondClick(){
    this.setState({secondVisible: !this.state.secondVisible});
  }
  oninputchange(e){
    this.props.oninputchange(e.target.value);
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
  <div id="r-result"><input type="text" id="suggestId" value={this.props.searchcity} onChange={this.oninputchange}/><button type="button" onClick={this.handleLocate}>定位</button></div>
  <div id="searchResultPanel" ></div>
  <ButtonGroup>
  <Button block onClick={this.props.changed_img}>切换影像底图</Button>
  <Button block onClick={this.props.changed_vec}>切换街道底图</Button>
  <Button block onClick={this.props.changed_ter}>切换地形底图</Button>
  </ButtonGroup>
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
      lvalue:60,
      tvalue:60,
      svalue:60,
      searchcity:'',
      lightlayer:new ol.layer.Tile({}),
      thermolayer:new ol.layer.Tile({}),
      soundlayer:new ol.layer.Tile({}),
      lng:'',
      lat:'',
      kindlist:new Array(),
      changed:false,
      num:1,
      sheng:false
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
        projection: 'EPSG:4326',
        guang:false
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
    this.handleLocate=this.handleLocate.bind(this);
    this.handleAddLayer=this.handleAddLayer.bind(this);
    this.oninputchange=this.oninputchange.bind(this);
    this.changed_ter=this.changed_ter.bind(this);
    this.changed_vec=this.changed_vec.bind(this);
    this.changed_img=this.changed_img.bind(this);
  }
  changed_img(){
    var img= new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url:  'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d'
                })
            })
    var layersArray=this.map.getLayers()
 //   this.map.addLayer(img);
    layersArray.insertAt(this.state.num,img);
    this.setState({num:this.state.num+1});
  }
  changed_vec(){
    var map_cva= new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d"
                })
            })

    var map_vec =new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d"
                })
            })
    var layersArray=this.map.getLayers();
    this.map.removeLayer();
    layersArray.insertAt(this.state.num,map_vec);
    layersArray.insertAt(this.state.num+1,map_cva);
    this.setState({num:this.state.num+2});
   // this.map.addLayer(map_vec,0);
   // this.map.addLayer(map_cva,0);
  }
  changed_ter(){
    var map_ter =new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url:  "http://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d"
                            })
                        })
    var map_cta =new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d"
                })
            })
    var layersArray=this.map.getLayers();
    this.map.removeLayer(layersArray);
    layersArray.insertAt(this.state.num,map_ter);
    layersArray.insertAt(this.state.num+1,map_cta);
    this.setState({num:this.state.num+2});
  //  this.map.addLayer(map_ter,0);
   // this.map.addLayer(map_cta,0);
  }
  onChange(e,kind){
   if(kind=="light")
   { 
      this.setState({lvalue:e});
      this.state.lightlayer.setOpacity(e/100);
    }
   if(kind=="sound")
    {
      this.setState({svalue:e});
      this.state.soundlayer.setOpacity(e/100);
    }
  }
  oninputchange(e){
    this.setState({searchcity:e});
  }
  handleLocate(e){
    const {BMap,BAMP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT,BMapLib} = window
    var baimap = new BMap.Map("l-map");    
    var myGeo = new BMap.Geocoder();      
      // 将地址解析结果显示在地图上，并调整地图视野
    
    var map=this.map;
    myGeo.getPoint(this.state.searchcity, function(point){ //这里换成用户的输入     
    if (point) {  
      //alert(map);
    map.getView().setCenter([point.lng,point.lat]);
    map.getView().setZoom(8);
    }      
   }, 
  this.state.searchcity);//规定用户一定要输入城市
/*
  this.setState({
    lng: myGeo.getPoint(this.state.searchcity.lng),
    lat: myGeo.getPoint(this.state.searchcity.lat)
  })
    this.map.getView().setCenter([this.state.lng,this.state.lat]);
    this.map.getView().setZoom(11);
  */
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
    this.state.kindlist.push(e);
    if(e=="light")
    {
      document.getElementById("box").innerHTML="<option value=''>无</option><option value='100.8'>100.8</option><option value='62.82'>62.82</option><option value='80.83'>80.83</option>"
    }
    if(e=="sound")
    {
      document.getElementById("box").innerHTML="<option value=''>无</option><option value='62'>62</option><option value='66'>66</option><option value='70'>70</option>"
    }
    if(this.state.wuzhong!='')
    {
      this.handleAddLayer(e,this.state.wuzhong,this.state.yuzhi);
    }
  }
  handleAddLayer(kind,wuzhong,yuzhi)
  {
    if(kind=="light")
    {
      this.setState({sheng:false});
      var tuceng='hu:huguang';
      tuceng=tuceng+yuzhi
      if(yuzhi=="")
      {
        this.setState({guang:true});
      }
      else{
        this.setState({guang:false});
      }
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
      layer1.setOpacity(this.state.lvalue/100);
      this.setState({lightlayer:layer1});
    }
    if(kind=="sound")
    {
      this.setState({guang:false});
      var tuceng='hu:sheng';
      tuceng=tuceng+yuzhi;  
      if(yuzhi=="")
      {
        this.setState({sheng:true});
      }
      else{
        this.setState({sheng:false});
      }
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
      layer1.setOpacity(this.state.svalue/100);
      this.setState({soundlayer:layer1});
    }
    this.map.addLayer(layer1,1)
  }
  handleWChange(e){
    if(this.state.kind)
    {
      this.setState({wuzhong:e});
    }
    for(var i=0;i<this.state.kindlist.length;i++)
    //此处使用于其他，有固定阈值的物种需要先将阈值放入yuzhi，再调用函数
    {
      this.handleAddLayer(this.state.kindlist[i],e,this.state.yuzhi)
    }  
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
  };
  
  render(){

    return (
        <div>
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
      {
                this.state.guang?<Guanglegend/>:null
            }
            {
                this.state.sheng?<Shenglegend/>:null
            }
  <Frontend 
            kind={this.state.kind} 
            yuzhi={this.state.yuzhi}
            wuzhong={this.state.wuzhong}
            value={this.state.value}
            onChange={this.onChange}
            handleLocate={this.handleLocate}
            oninputchange={this.oninputchange}
            cancelKChange={this.cancelKChange}
            handleKChange={this.handleKChange}
            handleYChange={this.handleYChange}
            handleWChange={this.handleWChange}
            changed_ter={this.changed_ter}
            changed_vec={this.changed_vec}
            changed_img={this.changed_img}/>
            
          </div>
    )
  }
}
export default App;

