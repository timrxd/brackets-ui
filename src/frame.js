import React from 'react';
import SimpleAppBar from './header.js';
import Bracket from './bracket.js';
import './index.css';

class Frame extends React.Component {
  render() {
    return (
      <div className="frame">

        <div className="frame-header">
          <SimpleAppBar></SimpleAppBar>
        </div>

        <div className="bracket-info">
          <Bracket/>
        </div>
      </div>
    );
  }
}

export default Frame;
