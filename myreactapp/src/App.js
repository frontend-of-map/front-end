import logo from './logo.svg';
import './App.css';
import { Slider, Handles, Tracks } from 'react-compound-slider'
import React, {Component} from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
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
  render(){
    return(
      <div id="vmaps">
      <input type="checkbox" name="creature" value="light"/>光环境地图
      <Sliders/>
      <input type="checkbox" name="creature" value="thermo"/>热环境地图
      <Sliders/>
      <input type="checkbox" name="creature" value="sound"/>声环境地图
      <Sliders/>
      </div>
    );
  }
}
class Animals extends React.Component{
  render(){
    return(
    <div id="animals">
    <input type="checkbox" className="creature" value="bailu"/>白鹭<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>燕雀<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>黑尾蜡嘴<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>其他<input 
        className="yuzhi" value="100"/>阈值<br/>
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
      </div>
    )
  }
}

/*
class App extends Component{
  componentDidMount(){
    console.log(window)
    const {BMap,BAMP_STATUS_SUCCESS} = window
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915),11);

    var p1 = new BMap.Point(116.301934,39.977552);
    var p2 = new BMap.Point(116.508328,39.919141);

    var driving = new BMap.DrivingRoute(map,{renderOptions:{map:map,autoViewport: true}});
    driving.search(p1,p2);
  }
  render(){
    return (
          <div id="allmap" style={{position:"absolute",top:0,left:0,width:'100vw',height:'100vh',}}> 
          
          </div>
    )
  }
}
export default App;
*/
class Map extends React.Component {
  
  //other functions eliminated for brevity

  componentDidMount() {

    // create feature layer and vector source
    var featuresLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features:[],
      })
    });

    // create map object with feature layer
    var map = new ol.Map({
      target: 'map',
      layers: [
    //default OSM layer
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
        featuresLayer
      ],
      view: new ol.View({
        center: [-11718716.28195593, 4869217.172379018], //Boulder, CO
        zoom: 13,
      })
    });

    // save map and layer references to local state
    this.setState({ 
      map: map,
      featuresLayer: featuresLayer
    });

  
  var styles=new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'green'
    }),
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 2
    }),
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: 'red'
        })
    })
});
var geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
   'type': 'name',
   'properties': {
    'name': 'EPSG:3857'
   }
  },
  'features': []
 };
var polygon = (new ol.geom.Polygon([[[120.97, 23.1],[115.97, 15.1],[118.97, 13.1],[120.97, 20.1],[120.97, 23.1]]])).transform('EPSG:4326', map.getView().getProjection());
console.log(map.getView().getProjection());
var proper={"type":"火点"}
var geoMarker = new ol.Feature({

    geometry: polygon//(new ol.geom.Point([120.97, 23.1])).transform('EPSG:4326', map.getView().getProjection())

});

geoMarker.setProperties(proper,true)
geojsonObject.features = [];
    geojsonObject.features.push({
     'type': 'Feature',
     'geometry': {
      'type': 'Point',
      'coordinates': [121.70817285,39.09255465]
     }
    });
var source=new ol.source.Vector({
    features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(geojsonObject)
});

var vectorLayer = new ol.layer.Vector({
    source: source,
    style:styles,
    opacity:0.5//styles['route']
});
map.addLayer(vectorLayer);}
  render(){
    return(
      <div>
      <div id="map"></div>
      <Frontend/>
      </div>
    )
  }
  //other functions eliminated for brevity

}

export default Map;
