import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";

const Player = () => {
  return (<AnswerForm buttonText="PRESS" answer={() => (new Date()).getTime()} />);
}

const Host = () => {
  return (
    <OneRound 
      scorer={(props) => {
        var scores = {};
        var players = props.players.sort((a, b) => parseInt(b.guess) - parseInt(a.guess));
        console.log(players[0]);
        scores[players[0].name] = players[0].guess == null ? 0 : 100;
        for(var i = 1; i < players.length; i++){
          scores[players[i].name] = 0;
        }
        return scores;
      }}
      finished={(players) => players.every((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>WHOEVER PRESSES THE BUTTON LAST GETS 100 POINTS</h1>
          <div>You have 1 minute</div>
        </div>)}
      resolveWait={60}
      finishComponent={(props) => {
        var winner = props.players.find((p) => p.guess != null);
        if(winner){
          return (<h1>{winner.name.toUpperCase()} PRESSED LAST! EVERYBODY ELSE GETS NOTHING!</h1>)
        }else{
          return (<h1>NOBODY PRESSED? YOU WAITED ALL THAT TIME AND NOBODY PRESSED THE BUTTON? WILD. ANYWAY, NOBODY GETS ANY POINTS</h1>)
        }
      }}
      scoreText={(player, scores) => (<li key={player.name}>{player.name} {scores[player.name] == 100 ? "pressed last, gets 100 points" : "didn't press last, gets 0 points"} - {player.score} total</li>) }/>
  );
}

const last_press = {player: Player, host: Host, key: 'last_press', title: "Last Press"};
export default last_press;