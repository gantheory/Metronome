import React, { Component } from 'react';

const icons = {
  'lineWeight': 'M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z',
};

class Icon extends Component {
  render() {
    const styles = {
      path: {
        fill: this.props.color,
      },
    };
    return (
      <svg width={this.props.width} height={this.props.height} viewBox="0 0 1024 1024">
        <path style={styles.path} d={icons[this.props.icon]}></path>
      </svg>
    );
  }
}

export default Icon;
