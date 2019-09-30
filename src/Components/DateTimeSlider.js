import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const style = { width: 600, margin: 50 };


function percentFormatter(v) {
  return `${v} %`;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default class NullableSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="col">


          <p>sadf</p>
        <Slider max={2000} step={10}/>
        <button onClick={this.reset}>Reset</button>
        </div>
        </div>
      </div>
    );
  }
}