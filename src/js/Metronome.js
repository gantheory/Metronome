import React, { Component } from 'react';
import Icon from './Icon';
import '../css/Metronome.css';
import Slider from 'material-ui/Slider';
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import AvPauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';

const styles = {
  play: {
    height: 100,
    width: 100,
  },
};

class Metronome extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 0,
      bpm: 100,
      count: -1,
      beats: [],
      context: new window.AudioContext(),
      osc: 0,
    };
    for ( let i = 0 ; i < 4 ; i += 1 )
      this.state.beats.push( i );
    this.handleStartMetronome = this.handleStartMetronome.bind(this);
    this.handleStopMetronome = this.handleStopMetronome.bind(this);
    this.setAudioContext = this.setAudioContext.bind(this);
    this.timer = this.timer.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  setAudioContext() {
    const newContext = new window.AudioContext();
    this.setState({
      context: newContext,
    });
  }
  handleStartMetronome() {
    this.setAudioContext();
    this.intervalId = setInterval(this.timer, 60 / this.state.bpm * 1000);
  }
  handleStopMetronome() {
    if ( this.state.context.state === 'closed' )
      return;
    clearInterval(this.intervalId);
    this.state.context.close();
    let nowCount = this.state.count;
    nowCount = -1;
    this.setState({
      count: nowCount,
    });
  }
  timer() {
    let nowCount = this.state.count + 1;
    if ( nowCount === 4 ) {
      nowCount = 0;
    }
    this.setState({
      count: nowCount,
    });

    let osc = this.state.context.createOscillator();
    if ( nowCount === 0 ) {
      osc.frequency.value = 840;
    }
    else {
      osc.frequency.value = 440;
    }
    osc.start( this.state.context.currentTime );
    osc.connect( this.state.context.destination );
    osc.stop( this.state.context.currentTime + ( 150 / 1000 ) );
  }
  handleSpeedChange(event, number) {
    this.handleStopMetronome();
    let newValue = Math.round( number * 300 );
    if ( newValue === 0 ) {
      newValue = 1;
    }
    this.setState({
      bpm: newValue,
    });
    if ( this.state.mode === 1 ) {
      this.handleStartMetronome();
    }
  }
  handleColor(nowID) {
    if ( nowID === this.state.count ) {
      return "rgba( 255, 255, 255, 0.9 )";
    }
    else {
      return "rgba( 0, 0, 0, 0.6 )";
    }
  }
  handleModeChange() {
    this.handleStopMetronome();
    const nowMode = this.state.mode;
    if ( nowMode === 0 ) {
      this.setState({
        mode: 1,
      });
      this.handleStartMetronome();
    }
    else {
      this.setState({
        mode: 0,
      });
    }
  }
  render() {
    return(
      <div className="metronome" >
        <h1 className="title" >Metronome</h1>
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
            width={120}
            height={120}
          />
        )}
        </div>
        {this.state.mode === 0
          ? (
            <AvPlayCircleOutline
              className="playToggle"
              style={styles.play}
              hoverColor={"rgba( 255, 255, 255, 0.9"}
              onClick={this.handleModeChange}
            />
          )
          : (
            <AvPauseCircleOutline
              className="playToggle"
              style={styles.play}
              hoverColor={"rgba( 255, 255, 255, 0.9"}
              onClick={this.handleModeChange}
            />
          )
        }
      </div>
    );
  }
}

export default Metronome;
