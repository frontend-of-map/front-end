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
        <img src="./light.jpeg"/>
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
        <img src="./sound.jpeg"/>
 <div class="formula">
        <label>单位：</label><span>dB</span>
 </div>
 </div>
    )
  }
}
class Relegend extends React.Component{
  render(){
    return(
        <div id="legend">
        <img src="./ren.jpeg"/>

 </div>
    )
  }
}
class Renlegend extends React.Component{
  render(){
    return(
        <div id="legend">
        <img src="./renew.jpeg"/>

 </div>
    )
  }
}
class Variousmaps extends React.Component{
  constructor(props){
    super(props);
    this.state={ haschosen:false, 
                  guangtype:[],
                  lvalue:60, 
                  svalue:60,
                  tvalue:60,
                  id:"" };
    this.handleKChange=this.handleKChange.bind(this);
    this.onOChange=this.onOChange.bind(this);
    //alert(this.props.guangtype)
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
    if(this.state.guangtype!=undefined){
      //alert(this.state.guangtype)
    return(
      <div id="vmaps" className="bold">
      <input id="light" type="checkbox" name="creature" value="light" onClick={this.handleKChange}/>光环境地图
      <InputRange
        id="Light"
        maxValue={100}
        minValue={0}
        value={this.state.lvalue}
        onChange={lvalue => this.setState({ lvalue,id:"light" })}
        onChangeComplete={this.onOChange} />   
      <Guanglegend/>
      <Animals  
            kind={this.props.kind}
            wuzhong={this.props.wuzhong}
            data={this.props.guangtype}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}/>   
      <div class="link-top"></div>
      <input id="sound" type="checkbox" name="creature" value="sound" onClick={this.handleKChange}/>声环境地图
      <InputRange
        id="sound"
        maxValue={100}
        minValue={0}
        value={this.state.svalue}
        onChange={svalue => this.setState({ svalue,id:"sound" })}
        onChangeComplete={this.onOChange} /> 
      <Shenglegend/>
      <Animals  
            kind={this.props.kind}
            data={this.props.shengtype}
            wuzhong={this.props.wuzhong}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}/>
      <div class="link-top"></div>
      <input id="thermo" type="checkbox" name="creature" value="thermo" onClick={this.handleKChange}/>热环境地图
      <InputRange
        id="thermo"
        maxValue={100}
        minValue={0}
        value={this.state.tvalue}
        onChange={tvalue => this.setState({ tvalue,id:"thermo"})}
        onChangeComplete={this.onOChange} />
      <Relegend/> 
      <Animals  
            kind={this.props.kind}
            data={this.props.retype}
            wuzhong={this.props.wuzhong}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}/>
      <Renlegend/>
      </div>
    );
  }
  }
}
class Animals extends React.Component{
  constructor(props){
    super(props);
    this.state={data:this.props.data,haschosen:false};
    this.handleWChange=this.handleWChange.bind(this);
    //this.handleYChange=this.handleYChange.bind(this);
  }
  
  
  handleWChange(e){
    this.setState({haschosen:!this.state.haschosen});
    
    if(e.target.checked)
    {
       this.props.handleWChange(e.target.id,e.target.value);
    }
    else
    {
      this.props.cancelWChange(e.target.id,e.target.value);
    }
    
    //alert(e.target.value);
  }
  render(){
    let onerow=[];
    this.props.data.map((rowinfo)=>{
      if("species" in rowinfo)
    {
        if(rowinfo["species"]!="")
      {onerow.push(
        <tr>
        <th><input id={rowinfo["id"]} type="checkbox" className="creature" value={rowinfo["type"]} onClick={this.handleWChange}/></th>
        <th>{rowinfo["species"]}</th>
        <th><input className="yuzhi" value={rowinfo["yuZhi"]}/></th>
        <th>阈值</th>
        </tr>
      )}
      else{
        this.props.handleYChange(rowinfo["type"],rowinfo["id"]);
      }
    }
      else if(rowinfo["type"]==null)
      { 
        this.props.handleFChange("thermo",rowinfo["wenDu"],rowinfo["shiDu"],rowinfo["fengSu"]);
        this.props.handleYChange(rowinfo["type"],rowinfo["id"]);
      }
      else {
        this.props.handleFChange(rowinfo["id"],rowinfo["wenDu"],rowinfo["shiDu"],rowinfo["fengSu"]);
        onerow.push(
        <tr>
        <th><input id={rowinfo["id"]} type="checkbox" className="creature" value={rowinfo["type"]} onClick={this.handleWChange}/></th>
        <th>{rowinfo["type"]}</th>
        <th><input className="yuzhi" value={rowinfo["yuZhi"]}/></th>
        <th>阈值</th>
        </tr>
      )
      }
    }
    )
    return(
    <div id="animals">
    <tbody>
    <table>
    {onerow}
    </table>
    </tbody>
    </div>)
  }
}
class Frontend extends React.Component{
  constructor(props){
    super(props);
    //alert(this.props.guangtype);
    //this.state={guangtype:this.props.guangtype};
    this.state={guangtype:this.props.guangtype,firstVisible:true,secondVisible:true};
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
      <div className="title">物理环境地图及风险物种</div>
      <Variousmaps 
                value={this.props.value} 
                onChange={this.props.onChange}
                kind={this.props.kind}  
                cancelKChange={this.props.cancelKChange} 
                handleKChange={this.props.handleKChange}
                wuzhong={this.props.wuzhong}
                handleYChange={this.props.handleYChange}
                handleWChange={this.props.handleWChange}
                cancelWChange={this.props.cancelWChange}
                guangtype={this.props.guangtype}
                shengtype={this.props.shengtype}
                retype={this.props.retype}
                handleFChange={this.props.handleFChange}/>
  <div id="r-result"><input type="text" id="suggestId" value={this.props.searchcity} onChange={this.oninputchange}/><button type="button" onClick={this.handleLocate}>定位</button></div>
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
      yuzhi:[],
      lvalue:60,
      tvalue:60,
      svalue:60,
      searchcity:'',
      guangtype:[],
      shengtype:[],
      retype:[],
      guangyuzhi:'',
      shengyuzhi:'',
      reyuzhi:'',
      lightlayer:new ol.layer.Tile({}),
      thermolayer:new ol.layer.Tile({}),
      soundlayer:new ol.layer.Tile({}),
      lng:'',
      lat:'',
      kindlist:new Array(),
      guanglayers:{},
      shenglayers:{},
      relayers:{},
      changed:false,
      num:1,
      sheng:false,
      refujia:{},
      wendu:'',
      shidu:'',
      fengsu:''
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
            new ol.control.ZoomSlider({})
            ])
    });
    this.handleKChange=this.handleKChange.bind(this);
    this.handleWChange=this.handleWChange.bind(this);
    this.handleYChange=this.handleYChange.bind(this);
    this.handleFChange=this.handleFChange.bind(this);
    this.cancelKChange=this.cancelKChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.handleLocate=this.handleLocate.bind(this);
    this.handleAddLayer=this.handleAddLayer.bind(this);
    this.oninputchange=this.oninputchange.bind(this);
    this.changed_ter=this.changed_ter.bind(this);
    this.changed_vec=this.changed_vec.bind(this);
    this.changed_img=this.changed_img.bind(this);
    this.deleteChange=this.deleteChange.bind(this);
    this.cancelWChange=this.cancelWChange.bind(this);
  }
  handleFChange(id,wendu,shidu,fengsu)
  {
    if(!(id in this.state.refujia))
    {
      let tempdata=this.state.refujia;
      tempdata[id]=[wendu,shidu,fengsu];
      this.setState({refujia:tempdata});
      console.log([wendu,shidu,fengsu]);
    }
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
    let templayer;
   if(kind=="light")
   { 
      let p=new Promise((resolve,reject)=>{
       templayer=this.state.guanglayers;
       resolve("success");
        reject('reject')
        
      })
      p.then(function(value){ 
        Object.keys(templayer).forEach(function(key){
            templayer[key].setOpacity(e/100);
      });
      },
        function(value){alert("fail")}
      );
      
      this.setState({lvalue:e});
    }
   if(kind=="thermo")
   {
    let p=new Promise((resolve,reject)=>{
       templayer=this.state.relayers;
       resolve("success");
        reject('reject')
        
      })
      p.then(function(value){ 
        Object.keys(templayer).forEach(function(key){
            templayer[key].setOpacity(e/100);
      });
      },
        function(value){alert("fail")}
      );
    this.setState({tvalue:e});
    //this.state.thermolayer.setOpacity(e/100);
   }
   if(kind=="sound")
    {
      let p=new Promise((resolve,reject)=>{
       templayer=this.state.shenglayers;
       resolve("success");
        reject('reject')
        
      })
      p.then(function(value){ 
        Object.keys(templayer).forEach(function(key){
            templayer[key].setOpacity(e/100);
      });
      },
        function(value){alert("fail")}
      );
      this.setState({svalue:e});
      //this.state.soundlayer.setOpacity(e/100);
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
}
  deleteChange(e){
    var a=this.state.kindlist.indexOf(e);
    //alert("hi");
    var x=this.state.kindlist;
    x.splice(a,1);
    this.setState({kindlist:x});
  }
  cancelKChange(e){
    let temp;
    if(e=="light")
    {
      //alert(this.state.guangyuzhi);
      temp="guang"+this.state.guangyuzhi;
      this.map.removeLayer(this.state.guanglayers[temp]);
    }
    if(e=="sound")
    {
      //alert(this.state.shengyuzhi);
      temp="sheng"+this.state.shengyuzhi;
      this.map.removeLayer(this.state.shenglayers[temp]);
    }
    if(e=="thermo")
    {
      //alert(this.state.reyuzhi);
      temp="re"+this.state.reyuzhi;
      this.map.removeLayer(this.state.relayers[temp]);
    }
    //this.map.removeLayer(this.state.layers[temp]);
  }
  cancelWChange(id,type){
    //alert(type);
    let temp;
    if(type=="光")
    {
      type="guang";
      temp=type+id;
      this.map.removeLayer(this.state.guanglayers[temp]);
    }
    if(type=="声")
    {
      type="sheng";
      temp=type+id;
      this.map.removeLayer(this.state.shenglayers[temp]);
    }
    else if(type=="人" || type==null)
    {
      type="re";
      temp=type+id;
      this.map.removeLayer(this.state.relayers[temp]);
    }
    
    //alert(temp);
    //this.map.removeLayer(this.state.layers[temp]);

  }
  handleKChange(e){
    if(e=="light")
    {
      //alert(this.state.guangyuzhi);
      this.handleAddLayer("guang",this.state.guangyuzhi);
    }
    if(e=="sound")
    {
      //alert(this.state.shengyuzhi);
      this.handleAddLayer("sheng",this.state.shengyuzhi);
    }
    if(e=="thermo")
    {
      //alert(this.state.reyuzhi);
      this.handleAddLayer("re",this.state.reyuzhi);
      this.pushData("thermo");
    }
  }
  
  handleAddLayer(type,id)
  {
    //alert(this.state.yuzhi);
    if(type=="guang")
    {
      var tuceng=type+id;
    var wmsSource = new ol.source.TileWMS({
          url:'http://118.31.56.186:8086/geoserver/test2/wms',//根据自己的服务器填写
            params:{
              'LAYERS':tuceng,//要加载的图层，可以为多个
               'TILED':false,
            },
            serverType:'geoserver',//服务器类型
          })
      var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
      var tempdata;
      let p=new Promise((resolve,reject)=>{
       tempdata=this.state.guanglayers;
        tempdata[tuceng]=layer1;
        this.setState({guanglayers:tempdata});
       //console.log("abc");
       resolve("success");
        reject('reject')
        
      })
      //p.bind(this);
      p.then(function(value){ console.log(tempdata)},function(value){alert("fail")});
      layer1.setOpacity(this.state.lvalue/100);
      //this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
    }
    if(type=="sheng")
    {
      var tuceng=type+id;
    var wmsSource = new ol.source.TileWMS({
          url:'http://118.31.56.186:8086/geoserver/test2/wms',//根据自己的服务器填写
            params:{
              'LAYERS':tuceng,//要加载的图层，可以为多个
               'TILED':false,
            },
            serverType:'geoserver',//服务器类型
          })
      var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });

      var tempdata=this.state.shenglayers;
      tempdata[tuceng]=layer1;
      this.setState({shenglayers:tempdata});
      layer1.setOpacity(this.state.svalue/100);
      //this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
    }
    if(type=="re")
    {

      var tuceng=type+id;
    var wmsSource = new ol.source.TileWMS({
          url:'http://118.31.56.186:8086/geoserver/test2/wms',//根据自己的服务器填写
            params:{
              'LAYERS':tuceng,//要加载的图层，可以为多个
               'TILED':false,
            },
            serverType:'geoserver',//服务器类型
          })
      var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
      let p=new Promise((resolve,reject)=>{
       tempdata=this.state.relayers;
        tempdata[tuceng]=layer1;
        this.setState({relayers:tempdata});
       //console.log("abc");
       resolve("success");
        reject('reject')
        
      })
      //p.bind(this);
      p.then(function(value){ console.log(tempdata)},function(value){alert("fail")});
      
      layer1.setOpacity(this.state.tvalue/100);
      //this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
    }
  }
  
  handleWChange(id,value){
    
    if(value=="光")
    {
        this.handleAddLayer("guang",id);
    }
    if(value=="声")
    {
      this.handleAddLayer("sheng",id);
    }
    if(value=="人")
    {
      this.handleAddLayer("re",id)
      this.pushData(id);
    }
  }
  pushData(id)
  {
    console.log(this.state.refujia);
    let data=this.state.refujia;
    let p=new Promise((resolve,reject)=>{
       this.setState({
          fengsu:data[id][2],
         wendu:data[id][0],
         shidu:data[id][1]
        })
       resolve("success");
        reject('reject')
        
      })
      //p.bind(this);
      p.then(function(value){ console.log("success")},function(value){alert("fail")});
  }
  handleYChange(type,id){
    if(type=="光" && this.state.guangyuzhi!=id)
    {
      this.setState({guangyuzhi:id});
      //alert("hi");
    }
    if(type=="声" && this.state.shengyuzhi!=id)
    {
      this.setState({shengyuzhi:id});
      //alert("hi");
    }
    if(type==null && this.state.reyuzhi!=id)
    {
      this.setState({reyuzhi:id});
    }
  }
  
  componentDidMount(){
    this.map.setTarget("allmap"); 
  }
  componentWillMount(){
       
    $.ajax({
        url: "http://118.31.56.186:80/api/guanglayers",
        dataType: 'json',
        cache: false,
        type:'GET',
        success: function(data) {
          this.setState({guangtype:data})
         // alert(data[0]["species"])
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
      }); 
    $.ajax({
        url: "http://118.31.56.186:80/api/shenglayers",
        dataType: 'json',
        cache: false,
        type:'GET',
        success: function(data) {
          this.setState({shengtype:data})
         // alert(data[0]["species"])
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
      });   
    $.ajax({
        url: "http://118.31.56.186:80/api/relayer",
        dataType: 'json',
        cache: false,
        type:'GET',
        success: function(data) {
          this.setState({retype:data})
         // alert(data[0]["species"])
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
      });
  };
  
  render(){
       // alert(this.state.guangtype)
    return (
        <div id="all">
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
          <div id="tshow">温度：{this.state.wendu} 湿度： {this.state.shidu} 风速： {this.state.fengsu}</div>
  <Frontend 
            kind={this.state.kind} 
            wuzhong={this.state.wuzhong}
            value={this.state.value}
            onChange={this.onChange}
            handleLocate={this.handleLocate}
            oninputchange={this.oninputchange}
            cancelKChange={this.cancelKChange}
            handleKChange={this.handleKChange}
            handleYChange={this.handleYChange}
            handleWChange={this.handleWChange}
            handleFChange={this.handleFChange}
            changed_ter={this.changed_ter}
            changed_vec={this.changed_vec}
            changed_img={this.changed_img}
            cancelWChange={this.cancelWChange}
            guang={this.state.guang}
            sheng={this.state.sheng}
            guangtype={this.state.guangtype}
            shengtype={this.state.shengtype}
            retype={this.state.retype}/>
          
          </div>
    )
  }
}
export default App;