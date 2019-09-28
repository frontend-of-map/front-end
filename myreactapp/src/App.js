import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Slider, Handles, Tracks } from 'react-compound-slider'

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
        marginTop: 3,
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
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
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
  border: '1px solid steelblue',
  }
  const railStyle = { 
  position: 'absolute',
  width: '80%',
  height: 5,
  marginTop: 5,
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
class Child extends React.createClass{
  render() {
    return (<div>I am the child</div>)
  }
}
class Frontend extends React.Component{
  constructor(props){
    super(props);
    this.state={childVisible:false};
    this.onClick=this.onClick.bind(this);
  }
  onClick() {
    this.setState({childVisible: !this.state.childVisible});
  }
  render(){
    return(
      <div>
      <ul>
      <li><input type="checkbox" name="creature" value="light"/>光环境地图
      <Sliders/></li>
      <li><input type="checkbox" name="creature" value="thermo"/>热环境地图</li>
      <Sliders/>
      <li><input type="checkbox" name="creature" value="sound"/>声环境地图</li>
      <Sliders/>
      </ul>
      <div onClick={this.onClick}>物种</div>
      {
          this.state.childVisible
            ? <Child />
            : null
      }
      <input type="checkbox" className="creature" value="bailu"/>白鹭<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>燕雀<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>黑尾蜡嘴<input 
        className="yuzhi" value="100"/>阈值<br/>
      <input type="checkbox" className="creature" value="bailu"/>其他<input 
        className="yuzhi" value="100"/>阈值<br/>
      </div>
    )
  }
}
export default Frontend;
