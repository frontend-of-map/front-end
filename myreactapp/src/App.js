import logo from './logo.svg';
import './App.css';
import { Slider, Handles, Tracks } from 'react-compound-slider'
import React, {Component} from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import $ from 'jquery';

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
        marginLeft: -15,
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
    values={[10]}
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
class Variousmaps extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="vmaps">
      <input id="light" type="checkbox" name="creature" value="light"/>光环境地图
      <Sliders/>
      <input id="thermo" type="checkbox" name="creature" value="thermo"/>热环境地图
      <Sliders/>
      <input id="sound" type="checkbox" name="creature" value="sound"/>声环境地图
      <Sliders/>
      </div>
    );
  }
}
class Animals extends React.Component{
  render(){
    return(
    <div id="animals">
    <input id="bailu" type="checkbox" className="creature" value="bailu"/>白鹭<input 
        className="yuzhi" value="2"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>燕雀<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>黑尾蜡嘴<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>其他<input 
        className="yuzhi" id="others" value="100"/>阈值<br/>
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
        this.state.secondVisible?<Animals/>:null
      }
      <tbody width="100%">
          <tr>
              <td className="label">经度</td>
              <td><input type="text" name="lng" id="lng" value="" />
              </td>
          </tr>
          <tr>
              <td className="label">纬度</td>
              <td><input type="text" name="lat" id="lat" value="" />
              </td>
          </tr>
          <tr>
              <td className="label">地址</td>
              <td>
                  <input type='text' value='' name='sever_add' id='sever_add'/>
                  <input type='button' value='点击显示地图获取地址经纬度' id='open'/>
              </td>
          </tr>
      </tbody>
      <div id="result">
    <input type="button" onclick="add_control();" value="添加" />
    <input type="button" onclick="delete_control();" value="删除" />
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
      lng:'',
      lat:'',
      server_add:'',
      res:{},
      e_click:false,
      c_click:false,
      s_click:false,
      t_click:false
    }
    this.loadUsers=this.loadUsers.bind(this);
  }
  loadUsers() {
    $.ajax({
        url: "http://118.31.56.186:8086/geoserver/pre_warn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pre_warn%3Adlypoint&maxFeatures=78531&outputFormat=application%2Fjson&cql_filter=GRID_CODE>2",
        dataType: 'json',
        cache: false,
        success: function(data) {
          
         // this.render();
         this.setState({
          res:data
         });
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
    });
  }
  componentDidMount(){
    console.log(window)
    const {BMap,BAMP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT,BMapLib} = window
    var map = new BMap.Map("allmap",{projection:"EPSG:3857"});
    map.centerAndZoom("厦门",7);
  var e_click=false;
    var c_click=false;
    var t_click=false;
    var s_click=false;
  /*var p1 = new BMap.Point(116.301934,39.977552);
    var p2 = new BMap.Point(116.508328,39.919141);
    var driving = new BMap.DrivingRoute(map,{renderOptions:{map:map,autoViewport: true}});
    driving.search(p1,p2);*/
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
  var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
   map.addEventListener("click", showInfo); 
  map.addControl(top_left_control);        
  map.addControl(top_left_navigation);     
  
  // 定义一个控件类,即function
  function ZoomControl(){
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(100, 100);
  }
  // 通过JavaScript的prototype属性继承于BMap.Control
  ZoomControl.prototype = new BMap.Control();
  
  // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
  // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
  ZoomControl.prototype.initialize = function(map){
    // 创建一个DOM元素
    var div = document.createElement("div");
  
    // 添加文字说明
    div.appendChild(document.createTextNode("量尺"));
    // 设置样式
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.backgroundColor = "white";
    
    // 绑定事件,点击一次打开量尺
    div.onclick = function(e){
      var myDis = new BMapLib.DistanceTool(map);
      
      myDis.open();  //开启鼠标测距
      //myDis.close();  //关闭鼠标测距
    
    }
    
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
  }
  // 创建控件
  var myZoomCtrl = new ZoomControl();
  map.addControl(myZoomCtrl);
  function validate() {
        var sever_add = document.getElementsByName('sever_add')[0].value;
        if (isNull(sever_add)) {
            alert('请选择地址');
            return false;
        }
        return true;
    }
    //判断是否是空  
    function isNull(a) {
        return (a == '' || typeof(a) == 'undefined' || a == null) ? true : false;
    }
    document.getElementById('open').onclick = function() {
        if (document.getElementById('allmap').style.display == 'none') {
            document.getElementById('allmap').style.display = 'block';
        } else {
            document.getElementById('allmap').style.display = 'none';
        }
    }
    var geoc = new BMap.Geocoder(); //地址解析对象  
    var markersArray = [];
    var geolocation = new BMap.Geolocation();
    //map.addEventListener("click", showInfo);


    //清除标识  
    function clearOverlays() {
        if (markersArray) {
            for (var i in markersArray) {
                map.removeOverlay(markersArray[i])
            }
        }
    }
    //地图上标注  
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        markersArray.push(marker);
        clearOverlays();
        map.addOverlay(marker);
    }
    //点击地图时间处理  
    function showInfo(e) {
       // this.setState({lng:e.point.lng});
       document.getElementById('lng').value = e.point.lng;
        document.getElementById('lat').value = e.point.lat;
        geoc.getLocation(e.point, function(rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            document.getElementById('sever_add').value = address;
        });
        addMarker(e.point);
    }
  map.enableScrollWheelZoom(true);
  map.disableDragging();     //禁止拖拽
  setTimeout(function(){
     map.enableDragging();   //两秒后开启拖拽
     //map.enableInertialDragging();   //两秒后开启惯性拖拽
  }, 2000);
  var tileLayer = new BMap.TileLayer({isTransparentPng: true});
  tileLayer.getTilesUrl = function(tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return "/jsdemo/img/border.png";
  }
  function add_control(){
    map.addTileLayer(tileLayer);
  }
  function delete_control(){
    map.removeTileLayer(tileLayer);
  }
  add_control();
  function G(id) { return document.getElementById(id); }
                    var ac = new BMap.Autocomplete( //建立一个自动完成的对象
                        { "input": "suggestId", "location": map }); ac.addEventListener("onhighlight", function (e) { //鼠标放在下拉列表上的事件 
                            var str = ""; var _value = e.fromitem.value; var value = "";
                            if (e.fromitem.index > -1) { value = _value.province + _value.city + _value.district + _value.street + _value.business; } str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value; value = ""; if (e.toitem.index > -1) { _value = e.toitem.value; value = _value.province + _value.city + _value.district + _value.street + _value.business; } str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value; G("searchResultPanel").innerHTML = str;
                        }); var myValue; ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件 
                            var _value = e.item.value; myValue = _value.province + _value.city + _value.district + _value.street + _value.business; G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue; setPlace();
                        });
                    function setPlace() {
                        map.clearOverlays(); //清除地图上所有覆盖物
                        function myFun() {
                            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果 
                            map.centerAndZoom(pp, 18); map.addOverlay(new BMap.Marker(pp)); //添加标注
                        } var local = new BMap.LocalSearch(map, { //智能搜索
                            onSearchComplete: myFun
                        }); local.search(myValue);
                    }
                    document.getElementById('light').onclick=function(){
                     // this.setState({e_click:!this.state.e_click});
                     e_click=!e_click;
                    }
                    document.getElementById('thermo').onclick=function(){
                     // this.setState({e_click:!this.state.e_click});
                     t_click=!t_click;
                    }
                    document.getElementById('sound').onclick=function(){
                     // this.setState({e_click:!this.state.e_click});
                     //alert(s_click);
                     s_click=!s_click;
                    }
                   document.getElementById('bailu').onclick=function() {
                if(e_click)
    {$.ajax({
        url: "http://118.31.56.186:8086/geoserver/pre_warn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pre_warn%3Aguang&maxFeatures=50&outputFormat=application%2Fjson",
        dataType: 'json',
        cache: false,
        success: function(data) {
      
var points=[new BMap.Point(121.70817285,39.09255465)];
for(var i=0;i<data.features.length;i++)
{
 var point=new BMap.Point(data.features[i].geometry.coordinates[0],data.features[i].geometry.coordinates[1]);
    var label=new BMap.Label(1,{offset:new BMap.Size(0,0), position:point});
        label.setStyle({
            color : "#FF6347",
            fontSize : "0.5px",
            backgroundColor :"#FF6347",
            border :"0px solid #FF6347",
            padding:"0.5px",
            borderRadius:"100%",
            fontWeight :"bold"
        });
    map.addOverlay(label);
}
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
    });}
    if(t_click)
    {$.ajax({
        url: "http://118.31.56.186:8086/geoserver/pre_warn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pre_warn%3Adlypoint&maxFeatures=10000&outputFormat=application%2Fjson&cql_filter=GRID_CODE>2",
        dataType: 'json',
        cache: false,
        success: function(data) {
      
var points=[new BMap.Point(121.70817285,39.09255465)];
for(var i=0;i<data.features.length;i++)
{
 var point=new BMap.Point(data.features[i].geometry.coordinates[0],data.features[i].geometry.coordinates[1]);
    var label=new BMap.Label(1,{offset:new BMap.Size(0,0), position:point});
        label.setStyle({
            color : "#FF6347",
            fontSize : "0.5px",
            backgroundColor :"#FF6347",
            border :"0px solid #FF6347",
            padding:"0.5px",
            borderRadius:"100%",
            fontWeight :"bold"
        });
    map.addOverlay(label);
}
  alert(points);
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
    });}
  if(s_click)
    {$.ajax({
        url: "http://118.31.56.186:8086/geoserver/pre_warn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pre_warn%3Asheng&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=GRID_CODE>2",
        dataType: 'json',
        cache: false,
        success: function(data) {
      
var points=[new BMap.Point(121.70817285,39.09255465)];
for(var i=0;i<data.features.length;i++)
{
 var point=new BMap.Point(data.features[i].geometry.coordinates[0],data.features[i].geometry.coordinates[1]);
    var label=new BMap.Label(1,{offset:new BMap.Size(0,0), position:point});
        label.setStyle({
            color : "#FF6347",
            fontSize : "0.5px",
            backgroundColor :"#FF6347",
            border :"0px solid #FF6347",
            padding:"0.5px",
            borderRadius:"100%",
            fontWeight :"bold"
        });
    map.addOverlay(label);
}
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
    });}
  };
      
  };
  
  render(){
    const {BMap,BAMP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT,BMapLib} = window
    var map = new BMap.Map("allmap");

    return (
        <div>
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
      
  <Frontend/>
          </div>
    )
  }
}
export default App;

