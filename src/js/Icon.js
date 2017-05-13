import React from 'react';

const icons = {
  'lineWeight': 'M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z'
};

const Icon = props => {
  const styles = {
    path: {
      fill: props.color,
    },
  };
  return (
  <svg width="120" height="120" viewBox="0 0 1024 1024">
    <path style={styles.path} d={icons[props.icon]}></path>
  </svg>
  );
};

export default Icon;
