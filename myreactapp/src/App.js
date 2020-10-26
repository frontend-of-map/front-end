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
        <img src="./光环境图标.jpg"/>
<div className="formula">
        <label>辐亮度 单位：</label><InlineMath math="nW/(cm^2⋅sr)"></InlineMath>
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
        <label>声压级 单位：</label><InlineMath math="dB(A)"></InlineMath>
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
        <label>生理等效温度 单位：℃</label>
 </div>
    )
  }
}
class Anquanyujing extends React.Component{
  render(){
    return(
        <div id="anquan">
        <img src="./安全和预警图标.jpg"/>

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
    this.oninputchange=this.oninputchange.bind(this);
    this.handleLocate=this.handleLocate.bind(this);
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
  handleLocate(e){
    this.props.handleLocate(e);
  }
  oninputchange(e){
    this.props.oninputchange(e.target.value);
  }
  render(){
    if(this.state.guangtype!=undefined){
      //alert(this.state.guangtype)
    return(
      <div id="vmaps" className="bold">
      <div className="mtitle">光环境</div>
      <div id="block">
      <InputRange
        id="Light"
        maxValue={100}
        minValue={0}
        className="inputrange"
        value={this.state.lvalue}
        onChange={lvalue => this.setState({ lvalue,id:"light" })}
        onChangeComplete={this.onOChange} />
        <div id="col2">不透明度</div>

        </div>
      <input id="light" type="checkbox" name="creature" value="light" onClick={this.handleKChange}/>闽三角光环境地图  
      <Guanglegend/>
      <div className="dituming">闽三角光污染预警地图</div>
      <Animals  
            kind={this.props.kind}
            wuzhong={this.props.wuzhong}
            data={this.props.guangtype}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}
            minqitayuzhi={this.props.minqitayuzhi}
            handleQChange={this.props.handleQChange}
            handleTChange={this.props.handleTChange}/> 
      <Anquanyujing/>  
      <input id="xialight" type="checkbox" name="creature" value="xialight" onClick={this.handleKChange}/>厦门岛光环境地图  
      <Guanglegend/>
      <div className="dituming">厦门岛光污染预警地图</div>
      <Animals  
            kind={this.props.kind}
            wuzhong={this.props.wuzhong}
            data={this.props.xiamentype}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}
            xiamenqitayuzhi={this.props.xiamenqitayuzhi}
            handleQChange={this.props.handleQChange}
            handleTChange={this.props.handleTChange}/>  
      <Anquanyujing/>
      <div className="mtitle">声环境</div>
      <div id="block">
      <InputRange
        id="sound"
        maxValue={100}
        minValue={0}
        value={this.state.svalue}
        onChange={svalue => this.setState({ svalue,id:"sound" })}
        onChangeComplete={this.onOChange} /> 
        <div id="col2">不透明度</div>
        </div>
      <input id="sound" type="checkbox" name="creature" value="sound" onClick={this.handleKChange}/>声环境地图
      <Shenglegend/>
      <div className="dituming">声污染预警地图</div>
      <Animals  
            kind={this.props.kind}
            data={this.props.shengtype}
            wuzhong={this.props.wuzhong}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}
            shengqitayuzhi={this.props.shengqitayuzhi}
            handleQChange={this.props.handleQChange}
            handleTChange={this.props.handleTChange}/>
      <Anquanyujing/>
      <div className="mtitle">热环境</div>
      <div id="block">
      <InputRange
        id="thermo"
        maxValue={100}
        minValue={0}
        value={this.state.tvalue}
        onChange={tvalue => this.setState({ tvalue,id:"thermo"})}
        onChangeComplete={this.onOChange} />
        <div id="col2">不透明度</div>
        </div>
      <input id="thermo" type="checkbox" name="creature" value="thermo" onClick={this.handleKChange}/>热环境地图
      <Relegend/> 
      <div className="dituming">热源预警地图</div>
      <Remap 
            kind={this.props.kind}
            data={this.props.retype}
            wuzhong={this.props.wuzhong}
            handleYChange={this.props.handleYChange}
            handleWChange={this.props.handleWChange}
            cancelWChange={this.props.cancelWChange}
            handleFChange={this.props.handleFChange}/>
      <Renlegend/>
  <ButtonGroup>
  <Button block onClick={this.props.changed_img}>切换影像底图</Button>
  <Button block onClick={this.props.changed_vec}>切换街道底图</Button>
  <Button block onClick={this.props.changed_ter}>切换地形底图</Button>
  </ButtonGroup>
      </div>
    );
  }
  }
}
class Remap extends React.Component{
  constructor(props){
    super(props);
    this.state={data:this.props.data,haschosen:false,qita:[]};
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
      this.props.cancelWChange(e.target.id,e.target.value,"kind");
    }
    
    //alert(e.target.value);
  }
  render(){
    let onerow=[],qita=[];
    this.props.data.map((rowinfo)=>{  
      
      if(rowinfo["type"]==null)
      { 
        this.props.handleFChange("thermo",rowinfo["wenDu"],rowinfo["shiDu"],rowinfo["fengSu"],rowinfo["yunLiang"]);
        this.props.handleYChange(rowinfo["type"],rowinfo["id"]);
      }
      else {
        //this.props.handleFChange(rowinfo["id"],rowinfo["wenDu"],rowinfo["shiDu"],rowinfo["fengSu"]);
        onerow.push(
        <div>
        <tr>
        <th><input id={rowinfo["id"]} type="checkbox" className="creature" value={rowinfo["type"]} onClick={this.handleWChange}/></th>
        <th>{rowinfo["type"]}</th>
        <th> 7~31 </th>
        <th> 舒适范围 </th>
        </tr>
        </div>
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
class Qita extends React.Component{
  constructor(props){
    super(props);
    this.handleWChange=this.handleWChange.bind(this);
    this.handleTChange=this.handleTChange.bind(this);
    this.handleQChange=this.handleQChange.bind(this);
  }
  handleTChange(e){
    this.props.handleTChange(this.props.data[0]["type"],e.target.value);
  }
  handleWChange(e){
    if(e.target.checked)
    {
       this.props.handleWChange(e.target.id,e.target.value);
    }
    else
    {
      this.props.cancelWChange(e.target.id,e.target.value,"qita");
    }
    
    //alert(e.target.value);
  }
  handleQChange(a,b){
    this.props.handleQChange(a,b);
  }
  render(){
    let options=[];
    if(this.props.data.length!=0){
    this.handleQChange(this.props.data[0]["type"],this.props.data[0]["id"]);
    this.props.data.map((rowinfo)=>{
      options.push(
      <option id={rowinfo["type"]} value={rowinfo["id"]} >{rowinfo["yuZhi"]}</option>
      )
    })
  }
    //let type=this.props.data[0]["type"]
    if(this.props.data.length!=0)
    {return(
    <div>
    <tr>
    <th><input id="qita" type="checkbox" className="creature" value={this.props.data[0]["type"]} onClick={this.handleWChange}/></th>
    <th>其他</th>
    <select onChange={this.handleTChange}> 
    {options}
    </select>
    <th>阈值</th>
    </tr>
    </div>
    )}
    else{
      return(
        <div>
        </div>
        )
    }
  }
}
class Animals extends React.Component{
  constructor(props){
    super(props);
    this.state={data:this.props.data,haschosen:false,qita:[]};
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
      this.props.cancelWChange(e.target.id,e.target.value,"kind");
    }
    
    //alert(e.target.value);
  }
  render(){
    let onerow=[],qita=[];
    this.props.data.map((rowinfo)=>{  
      if(rowinfo instanceof Array){
        //this.setState({qita:rowinfo});
        //console.log(rowinfo);
        qita=rowinfo;
      }
      else if(rowinfo["species"]==""){
        this.props.handleYChange(rowinfo["type"],rowinfo["id"]);
      }
      else if("species" in rowinfo)
    {
      //this.props.handleFChange(rowinfo["id"],rowinfo["wenDu"],rowinfo["shiDu"],rowinfo["fengSu"]);
        onerow.push(
        <div>
        <tr>
        <th><input id={rowinfo["id"]} type="checkbox" className="creature" value={rowinfo["type"]} onClick={this.handleWChange}/></th>
        <th>{rowinfo["species"]}</th>
        <th><input className="yuzhi" value={rowinfo["yuZhi"]}/></th>
        <th>阈值</th>
        </tr>
        </div>
      )
    }
   }
    )
    return(
    <div id="animals">
    <tbody>
    <table>
    {onerow}
    <Qita data={qita}
    minqitayuzhi={this.props.minqitayuzhi}
    xiamenqitayuzhi={this.props.minqitayuzhi}
    shengqitayuzhi={this.props.shengqitayuzhi}
    handleQChange={this.props.handleQChange}
    handleWChange={this.props.handleWChange}
    cancelWChange={this.props.cancelWChange}
    handleTChange={this.props.handleTChange}/>
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
    this.state={guangtype:this.props.guangtype,firstVisible:true};
    this.onfirstClick=this.onfirstClick.bind(this);    
    //this.oninputchange=this.oninputchange.bind(this);
    this.handleLocate=this.handleLocate.bind(this);
  }
  handleLocate(e){
    this.props.handleLocate(e);
  }
  onfirstClick(){
    this.setState({firstVisible: !this.state.firstVisible});
  }
  
  render(){
    return(
      <div id="choices">
      <div onClick={this.onfirstClick} className="title">物理环境地图及风险物种</div>
      <div id="r">
      {
      this.state.firstVisible?<Variousmaps 
                value={this.props.value} 
                onChange={this.props.onChange}
                kind={this.props.kind}  
                cancelKChange={this.props.cancelKChange} 
                handleKChange={this.props.handleKChange}
                wuzhong={this.props.wuzhong}
                handleYChange={this.props.handleYChange}
                handleWChange={this.props.handleWChange}
                cancelWChange={this.props.cancelWChange}
                handleQChange={this.props.handleQChange}
                guangtype={this.props.guangtype}
                shengtype={this.props.shengtype}
                retype={this.props.retype}
                xiamentype={this.props.xiamentype}
                handleFChange={this.props.handleFChange}
                handleTChange={this.props.handleTChange}
                handleLocate={this.handleLocate}
                oninputchange={this.props.oninputchange}
                changed_ter={this.props.changed_ter}
                changed_vec={this.props.changed_vec}
                changed_img={this.props.changed_img}
                searchcity={this.props.searchcity}
                minqitayuzhi={this.props.minqitayuzhi}
                xiamenqitayuzhi={this.props.minqitayuzhi}
                shengqitayuzhi={this.props.shengqitayuzhi}/>:null
              }
  </div>
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
      xiamentype:[],
      guangyuzhi:'',
      shengyuzhi:'',
      reyuzhi:'',
      xiaguangyuzhi:'',
      lng:'',
      lat:'',
      kindlist:new Array(),
      guanglayers:{},
      shenglayers:{},
      relayers:{},
      xiaguanglayers:{},
      changed:false,
      num:1,
      sheng:false,
      wendu:'',
      shidu:'',
      fengsu:'',
      tianqi:'',
      minqitayuzhi:0,
      xiamenqitayuzhi:0,
      shengqitayuzhi:0
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
    this.handleQChange=this.handleQChange.bind(this);
    this.handleTChange=this.handleTChange.bind(this);
    this.onChange=this.onChange.bind(this);
   // this.handleLocate=this.handleLocate.bind(this);
    this.handleAddLayer=this.handleAddLayer.bind(this);
    //this.oninputchange=this.oninputchange.bind(this);
    this.changed_ter=this.changed_ter.bind(this);
    this.changed_vec=this.changed_vec.bind(this);
    this.changed_img=this.changed_img.bind(this);
    this.deleteChange=this.deleteChange.bind(this);
    this.cancelWChange=this.cancelWChange.bind(this);
  }
  handleFChange(id,wendu,shidu,fengsu,tianqi)
  {
      if(this.state.wendu=='')
      {
         this.setState({
             fengsu:fengsu,
              wendu:wendu,
             shidu:shidu,
            tianqi:tianqi
         });
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
    let templayer,templayer2;
   if(kind=="light")
   { 
      let p=new Promise((resolve,reject)=>{
       templayer=this.state.guanglayers;
       templayer2=this.state.xiaguanglayers;
       resolve("success");
        reject('reject')
        
      })
      p.then(function(value){ 
        Object.keys(templayer).forEach(function(key){
            templayer[key].setOpacity(e/100);
      });
        Object.keys(templayer2).forEach(function(key){
            templayer2[key].setOpacity(e/100);
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
  /*
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
}*/
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
    if(e=="xialight")
    {
      temp="xiaguang"+this.state.xiaguangyuzhi;
      this.map.removeLayer(this.state.xiaguanglayers[temp]);
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
  cancelWChange(id,type,qita){
    //console.log("id:"+id+" type:"+type+" qita:"+qita)
    //alert(type);
    let temp;
    if(qita=="qita"&&type=="光")
    {
      id=this.state.minqitayuzhi;
      type="guang";
      temp=type+id;
      this.map.removeLayer(this.state.guanglayers[temp]);
    }
    else if(type=="光")
    {
      //id=this.state.minqitayuzhi;
      type="guang";
      temp=type+id;
      this.map.removeLayer(this.state.guanglayers[temp]);
    }
    
    if(qita=="qita"&&type=="厦门光地图")
    {
      type="xiaguang";
      console.log(this.state.xiamenqitayuzhi);
      temp=type+this.state.xiamenqitayuzhi;
      this.map.removeLayer(this.state.xiaguanglayers[temp]);
    }
    else if(type=="厦门光地图")
    {
      type="xiaguang";
      temp=type+id;
      this.map.removeLayer(this.state.xiaguanglayers[temp]);
    }
    if(qita=="qita"&&type=="声")
    {
      type="sheng";
      console.log(this.state.shengqitayuzhi);
      temp=type+this.state.shengqitayuzhi;
      this.map.removeLayer(this.state.shenglayers[temp]);
    }
    else if(type=="声")
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
    if(e=="xialight")
    {
      this.handleAddLayer("xiaguang",this.state.xiaguangyuzhi);
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
    if(type=="xiaguang")
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
       tempdata=this.state.xiaguanglayers;
        tempdata[tuceng]=layer1;
        this.setState({xiaguanglayers:tempdata});
       //console.log("abc");
       resolve("success");
        reject('reject')
        
      })
      //p.bind(this);
      p.then(function(value){ console.log(tempdata)},function(value){alert(tuceng)});
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
/*
      var tempdata=this.state.shenglayers;
      tempdata[tuceng]=layer1;
      this.setState({shenglayers:tempdata});
      layer1.setOpacity(this.state.svalue/100);
      //this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
      */
      let p=new Promise((resolve,reject)=>{
       tempdata=this.state.shenglayers;
        tempdata[tuceng]=layer1;
        this.setState({shenglayers:tempdata});
       //console.log("abc");
       resolve("success");
        reject('reject')
        
      })
      //p.bind(this);
      p.then(function(value){ console.log(tempdata)},function(value){alert("fail")});
      
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
    if(id=="qita"){
        console.log("1"+value);
        if(value=="光")
        {
          this.handleAddLayer("guang",this.state.minqitayuzhi);
        }
        if(value=="厦门光地图")
        {
          this.handleAddLayer("xiaguang",this.state.xiamenqitayuzhi);
        }
        if(value=="声")
        {
          this.handleAddLayer("sheng",this.state.shengqitayuzhi);
        }
    }
   else if(value=="光")
    {
        this.handleAddLayer("guang",id);
    }
   else if(value=="厦门光地图")
    {
        this.handleAddLayer("xiaguang",id);
    }
   else if(value=="声")
    {
      this.handleAddLayer("sheng",id);
    }
    if(value=="人")
    {
      this.handleAddLayer("re",id)
      //this.pushData(id);
    }
  }
  handleYChange(type,id){
    if(type=="光" && this.state.guangyuzhi!=id)
    {
      this.setState({guangyuzhi:id});
      //alert("hi");
    }
    if(type=="厦门光地图" && this.state.xiaguangyuzhi!=id)
    {
      this.setState({xiaguangyuzhi:id});
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
  handleQChange(type,yuzhi){
    if(type=="光"&&this.state.minqitayuzhi==0)
    {
      this.setState({minqitayuzhi:yuzhi});
      console.log("2"+yuzhi);
    }
    if(type=="厦门光地图"&&this.state.xiamenqitayuzhi==0)
    {
      this.setState({xiamenqitayuzhi:yuzhi});
      console.log("2"+yuzhi);
    }
    if(type=="声"&&this.state.shengqitayuzhi==0)
    {
      this.setState({shengqitayuzhi:yuzhi});
      console.log("2"+yuzhi);
    }
  }
  handleTChange(type,id){
    console.log("type:"+type+" id:"+id);
    if(type=="光"){
      this.setState({minqitayuzhi:id});
      console.log("4"+this.state.minqitayuzhi);
      this.cancelWChange(this.state.minqitayuzhi,"光","qita");
      this.handleAddLayer("guang",id);
    }
    if(type=="厦门光地图"){
      this.setState({xiamenqitayuzhi:id});
      console.log("4"+this.state.xiamenqitayuzhi);
      this.cancelWChange(this.state.xiamenqitayuzhi,"厦门光地图","qita");
      this.handleAddLayer("xiaguang",id);
    }
    if(type=="声"){
      this.setState({shengqitayuzhi:id});
      console.log("4"+this.state.shengqitayuzhi);
      this.cancelWChange(this.state.shengqitayuzhi,"声","qita");
      this.handleAddLayer("sheng",id);
    }
  }
  componentDidMount(){
    this.map.setTarget("allmap"); 
  }
  componentWillMount(){
     
    $.ajax({
        url: "http://118.31.56.186:80/api/test-guanglayers",
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
     /**/
    $.ajax({
        url: "http://118.31.56.186:80/api/test-xia-guanglayers",
        dataType: 'json',
        cache: false,
        type:'GET',
        success: function(data) {
          this.setState({xiamentype:data})
         // alert(data[0]["species"])
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
      }); 
      
    $.ajax({
        url: "http://118.31.56.186:80/api/test-shenglayers",
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
      /* */
  };
  
  render(){
       // alert(this.state.guangtype)
    return (
        <div id="all">
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> </div>
          <div id="tshow">天气:{this.state.tianqi}  温度:{this.state.wendu} &#8451; 湿度:{this.state.shidu}% 风速:{this.state.fengsu}m/s </div>
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
            handleQChange={this.handleQChange}
            handleTChange={this.handleTChange}
            changed_ter={this.changed_ter}
            changed_vec={this.changed_vec}
            changed_img={this.changed_img}
            cancelWChange={this.cancelWChange}
            guang={this.state.guang}
            sheng={this.state.sheng}
            guangtype={this.state.guangtype}
            shengtype={this.state.shengtype}
            retype={this.state.retype}
            xiamentype={this.state.xiamentype}
            searchcity={this.state.searchcity}
            minqitayuzhi={this.state.minqitayuzhi}
            shengqitayuzhi={this.state.shengqitayuzhi}/>
            
          </div>
    )
  }
}
export default App;