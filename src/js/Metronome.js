import React, { Component } from 'react';
import Icon from './Icon';
import '../css/Metronome.css';
import Slider from 'material-ui/Slider';
import Sound from 'react-sound';

class Metronome extends Component {
  constructor(props){
    super(props);
    this.state = {
      bpm: 100,
      count: 0,
      beats: [],
    };
    for ( let i = 0 ; i < 4 ; i += 1 )
      this.state.beats.push( i );
    this.timer = this.timer.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }
  timer() {
    if ( this.state.count === 3 ) {
      this.setState({
        count: 0,
      });
    }
    else{
      this.setState({
        count: this.state.count + 1,
      });
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer, 60 / this.state.bpm * 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  handleSpeedChange(event, number) {
    const newValue = Math.round( number * 300 );
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.timer, 60 / newValue * 1000);
    this.setState({
      bpm: newValue,
    });
  }
  handleColor(nowID) {
    if ( nowID === this.state.count ) {
      return "rgba( 255, 255, 255, 0.9 )";
    }
    else {
      return "rgba( 0, 0, 0, 0.6 )";
    }
  }
  render() {
    return(
      <div className="metronome" >
        <h1 className="title" >Metronome</h1>
        <Sound
          url="./WordList01.mp3"
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          volume="100"
        />
        <div className="bpm" >
          {this.state.bpm}
        </div>
        <Slider className="slider"
          value={this.state.bpm / 300}
          onChange={this.handleSpeedChange}
        />
        <div className="beats" >
          {this.state.beats.map( ID =>
            <Icon className="beat"
              key={ID}
              icon="lineWeight"
              color={this.handleColor( ID )}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Metronome;
