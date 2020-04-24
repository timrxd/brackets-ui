import React from 'react';
import './bracket.css';
import './index.css';
import bracketData from './data/bracket.json';

class Bracket extends React.Component {

  constructor(props) {
    console.log(bracketData.matches);
    super(props);
    this.state = {
      matches: bracketData.matches
    };
  }

  renderMatch(i) {
    return (
      <Match
        match={i}
     />
    );
  }

  render() {
    console.log(this.state.matches);
    return (
      <div className="bracket">
        <div>
          Bracket
        </div>
        <div className="grid-container">
          <Round 
            matches = {this.state.matches.slice(0,2)}
          />
          <Round
            matches = {this.state.matches.slice(2,3)}
          />
        </div>
      </div>
    );
  }
}

function Match(props) {
  let p1Win = " winner";
  let p2Win = "";
  if (props.match.player1Score < props.match.player2Score) {
    p1Win = "";
    p2Win = " winner";
  }

  let padding = 0;
  if (props.match.matchNumber === 2) {
    padding = 60;
  }

  return (
    <div 
    style={{paddingTop: padding+'px', paddingBottom: padding+'px'}}>
      <div className="match">
        <div className={"playerName"+p1Win} title={props.match.player1}>
          {props.match.player1Score} - {props.match.player1} - L W W L L
        </div>
        <div className={"playerName"+p2Win} title={props.match.player2}>
          {props.match.player2Score} - {props.match.player2} - W L L W W
        </div>
      </div>
    </div>
  );
}

function Round(props) {


  return (
    <div className="round">

      {props.matches.map(function(m) {
        return (
          <Match 
            key={m.matchNumber}
            match={m}
          />
        );
      })}

    </div>
  );
}




export default Bracket;