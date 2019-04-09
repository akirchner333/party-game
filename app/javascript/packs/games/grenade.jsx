import React from 'react';

import EmptyForm from "../components/empty_form.jsx";
import OneRound from "../components/one_round.jsx";

const Player = () => {
  return (<EmptyForm buttonText="IF YOU PRESS THE BUTTON YOU LOSE 1,000 POINTS" />);
}

const Host = () => {
  return (
    <OneRound 
      scorer={(player, players) => {
        if(players.every((p) => p.guess == null)){
          return -100
        }else if(player.guess != null){
          return -1000
        }else{
          return 0;
        }
      }}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>IF NOBODY PRESSES THE BUTTON EVERYONE LOSES 100 POINTS</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={() => (<h1>BOOM</h1>)}
      scoreText={(p, scores) => {
        switch(scores[p.name]){
          case -100:
            return (<li key={p.name}>The grenade goes off and {p.name} loses 100 points - total {p.score}</li>);
          case -1000:
            return (<li key={p.name}>{p.name} throws themselves on the grenade and loses 1000 points - total {p.score}</li>);
          case 0:
            return (<li key={p.name}>{p.name} is completely unchanged by this experience - total {p.score} points</li>);
          default:
            return (<li key={p.name}>{p.name} is cheating somehow? Good for them honestly. +{scores[p.name]} points, {p.score} total</li>);
        }
      }}/>
  );
}

const grenade = {player: Player, host: Host, key: 'grenade', title: "Grenade"};
export default grenade;