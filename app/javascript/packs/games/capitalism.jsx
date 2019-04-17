import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";

import {existence} from "../components/scorers.jsx";
import {empty} from "../components/inputs.jsx";

const Player = () => {
  return (<AnswerForm 
    buttonText="I OVERTHREW CAPITALISM" 
    input={empty} />)
}

const Host = () => {
  return (
    <OneRound 
      scorer={existence(100, 0)}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>OVERTHROW CAPITALISM</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={(props) => {
        console.log(props);
        var winner = props.players.find((p) => p.guess != null);
        return (<h1>GOOD WORK {winner ? winner.name + "!" : "NOBODY, THANKS FOR NOTHING"}</h1>)
      }}
      scoreText={(player, scores) => (<li key={player.name}>{player.name} {player.guess ? "overthrew capitalism, +100 points" : "did nothing, 0 points"} - {player.score} total</li>)}/>
  );
}

const capitalism = {player: Player, host: Host, key: 'capitalism', title: "Overthrow Capitalism"};
export default capitalism;