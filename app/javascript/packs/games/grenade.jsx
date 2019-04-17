import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";

// import {existence} from "../components/scorers.jsx";
import {empty} from "../components/inputs.jsx";

const Player = () => {
  return (<AnswerForm buttonText="IF YOU PRESS THE BUTTON YOUR SCORE WILL BE REDUCED TO ZERO" input={empty} />);
}

const Host = () => {
  return (
    <OneRound 
      scorer={(props) => {
        var anyone = props.players.every((p) => (p.guess) == null);
        return props.players.reduce((acc, p) => {
          acc[p.name] = p.guess ? -p.score : anyone ? 0 : -1000;
          return acc;
        }, {});
      }}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>IF NOBODY PRESSES THE BUTTON EVERYONE LOSES 1000 POINTS</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={() => (<h1>BOOM</h1>)}
      scoreText={(p, scores) => {
        switch(scores[p.name]){
          case -1000:
            return (<li key={p.name}>The grenade goes off and {p.name} loses 100 points - total {p.score}</li>);
          case 0:
            return (<li key={p.name}>{p.name} is completely unchanged by this experience - total {p.score} points</li>);
          default:
            return (<li key={p.name}>{p.name} throws themselves on the grenade and loses {-scores[p.name]} points - total {p.score}</li>);
        }
      }}/>
  );
}

const grenade = {player: Player, host: Host, key: 'grenade', title: "Grenade"};
export default grenade;