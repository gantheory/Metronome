import React from 'react';
import ReactDOM from 'react-dom';
import Metronome from './js/Metronome';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey400, grey600} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Bitter',
  palette: {
    primary1Color: grey600,
    textColor: "rgba( 0, 0, 0, 0.6 )",
    disabledColor: grey400,
  },
  button: {
    minWidth: 44,
  }
});

const Wrapper = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Metronome />
  </MuiThemeProvider>
)


ReactDOM.render(
  <Wrapper />,
  document.getElementById('root')
);
