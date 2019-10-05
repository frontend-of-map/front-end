import React, {Component} from 'react';

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
