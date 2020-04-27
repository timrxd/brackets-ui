import React from 'react';
import './bracket.css';
import './index.css';
import bracket4 from './data/4man.json';
import bracket8 from './data/8man.json';
import bracket16 from './data/16man.json';

class Bracket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: bracket16.matches
    };
  }

  renderMatch(i) {
    return (
      <Match
        match={i}
     />
    );
  }

  renderButton(i) {
    return (
      <BracketButton 
        value={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }


  handleClick(i) {
    switch(i) {
      case "4man": 
        this.setState({matches: bracket4.matches})
        break;
      case "8man": 
        this.setState({matches: bracket8.matches})
        break;
      case "16man": 
        this.setState({matches: bracket16.matches})
        break;
      default:

    }
  }

  render() {

    // Number of entrants = 2^(number of rounds)
    let entrants = this.state.matches.length+1
    let numRounds = Math.log2(entrants);
    let rounds = Array(numRounds).fill(null);
    for (let r = 0; r < numRounds; r++) {
      rounds[r] = this.state.matches.slice(
        entrants-(entrants/(Math.pow(2,r))),
        entrants-(entrants/(Math.pow(2,r+1)))
      );
    }

    let columns = "minmax(auto, 400px) ".repeat(numRounds).slice(0,-1);
    let round = 0;
    return (
      <div>
        <div>
          Bracket:  
          {this.renderButton("4man")}
          {this.renderButton("8man")}
          {this.renderButton("16man")}
        </div>
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
        <div className="bracket" 
        style={{gridTemplateColumns: columns}}>

          {rounds.map(function(m) {
            return (
              <Round 
                round = {round}
                key = {round++}
                matches = {m}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function Round(props) {
  return (
    <div className="round">

      {props.matches.map(function(m) {
        return (
          <Match 
            key={m.matchNumber}
            match={m}
            round={props.round}
          />
        );
      })}

    </div>
  );
}

function Match(props) {
  let p1Win = " winner";
  let p2Win = "";
  if (props.match.player1Score < props.match.player2Score) {
    p1Win = "";
    p2Win = " winner";
  }

  return (
    <div>
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

function BracketButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Bracket;