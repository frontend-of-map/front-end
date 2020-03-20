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
        <img src="./re.jpeg"/>
 <div class="formula">
        <label>单位：</label><span>颜色和内容暂定</span>
 </div>
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
      <div id="vmaps">
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
            cancelWChange={this.props.cancelWChange}/>   
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
            cancelWChange={this.props.cancelWChange}/>
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
            cancelWChange={this.props.cancelWChange}/>
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
      this.props.cancelWChange(e.target.value);
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
      }}
      else if(rowinfo["type"]=="人"){
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
                retype={this.props.retype}/>
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
      lightlayer:new ol.layer.Tile({}),
      thermolayer:new ol.layer.Tile({}),
      soundlayer:new ol.layer.Tile({}),
      lng:'',
      lat:'',
      kindlist:new Array(),
      changed:false,
      num:1,
      sheng:false,
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
   if(kind=="thermo")
   {
    this.setState({tvalue:e});
    this.state.thermolayer.setOpacity(e/100);
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
}
  deleteChange(e){
    var a=this.state.kindlist.indexOf(e);
    //alert("hi");
    var x=this.state.kindlist;
    x.splice(a,1);
    this.setState({kindlist:x});
  }
  cancelKChange(e){
    this.setState({kind:''});
    if(e=='light')
    {
      this.map.removeLayer(this.state.lightlayer);
      this.setState({guang:false});
    }
    if(e=='thermo')
    {
      this.map.removeLayer(this.state.thermolayer);
      this.setState({shidu:"",fengsu:"",wendu:""});
    }
    if(e=='sound')
    {
      this.map.removeLayer(this.state.soundlayer);
      this.setState({sheng:false});
    }
    this.deleteChange(e);
    //alert(this.state.kindlist);
  }
  cancelWChange(e){
    this.setState({wuzhong:''});
    for(var i=0;i<this.state.kindlist.length;i++)
    //此处使用于其他，有固定阈值的物种需要先将阈值放入yuzhi，再调用函数
    {
      //alert(this.state.kindlist);
      if(this.state.kindlist[i]=='light')
      {
          this.map.removeLayer(this.state.lightlayer);
          this.setState({guang:false});
      }
      if(this.state.kindlist[i]=='thermo')
      {
        this.map.removeLayer(this.state.thermolayer);
        this.setState({shidu:"",fengsu:"",wendu:""});
       }
       if(this.state.kindlist[i]=='sound')
       {
          this.map.removeLayer(this.state.soundlayer);
          this.setState({sheng:false});
        }
    } 
  }
  handleKChange(e){
    /*this.setState({kind:e,yuzhi:""});
    this.state.kindlist.push(e);
    
    if(this.state.wuzhong!='')
    {
      this.handleAddLayer(e,this.state.wuzhong,"");
    }
    */
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
      layer1.setOpacity(this.state.tvalue/100);
      this.setState({lightlayer:layer1});
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
      layer1.setOpacity(this.state.tvalue/100);
      this.setState({lightlayer:layer1});
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
      layer1.setOpacity(this.state.tvalue/100);
      this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
    }
    /*
    //alert(kind+wuzhong+yuzhi);
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
      layer1.setOpacity(this.state.tvalue/100);
      this.setState({lightlayer:layer1});
      this.map.addLayer(layer1,1)
    }
    if(kind=="thermo")
    {
      this.setState({guang:false,sheng:false});
      //var layer1;
      $.ajax({
        url: "http://118.31.56.186:80/relayer",
        dataType: 'json',
        cache: false,
        type:'GET',
        success: function(data) {
          this.setState({wendu:"温度:"+data["wenDu"],
                          shidu:"湿度:"+data["shiDu"],
                          fengsu:"风速:"+data["fengSu"]});
          var wmsSource = new ol.source.TileWMS({
         url:'http://118.31.56.186:8086/geoserver/hu/wms',//根据自己的服务器填写
          params:{
            'LAYERS':"hu:"+data["layername"],//要加载的图层，可以为多个
           'TILED':false,
           },
           serverType:'geoserver',//服务器类型
           });
           var layer1 = new ol.layer.Tile({
                 source:wmsSource
           });
           layer1.setOpacity(this.state.svalue/100);
           this.setState({thermolayer:layer1});
           this.map.addLayer(layer1,1)
        }.bind(this),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }.bind(this)
      });
    }
    if(kind=="sound")
    {
     // alert(yuzhi);
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
      this.map.addLayer(layer1)
    }
    */
  }
  
  handleWChange(id,value){
    //alert(this.state.yuzhi);
    if(this.state.kind)
    {
      //this.setState({wuzhong:e});
    }
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
    }
    /*
    for(var i=0;i<this.state.kindlist.length;i++)
    //此处使用于其他，有固定阈值的物种需要先将阈值放入yuzhi，再调用函数
    {
      //alert(this.state.kindlist);
      this.handleAddLayer(this.state.kindlist[i],e)
    }  
    """
    */
  }
  handleYChange(type,id){
    let temp=this.state.yuzhi;
    temp[type]=id;
    this.state.yuzhi[type]=id;
    /*this.setState({yuzhi:e});
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
    this.handleAddLayer(this.state.kind,this.state.wuzhong,e)*/
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
          <div id="tshow">{this.state.wendu} {this.state.shidu} {this.state.fengsu}</div>
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

