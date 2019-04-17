import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";
import {radio} from "../components/inputs.jsx";
import {parse} from "../components/scorers.jsx"

const Player = () => {
  return (<AnswerForm input={radio([
    {value: 15, text: "Just A Few, Please"},
    {value: 0, text: "I Have Enough Already"},
    {value: 200, text: "Give Me A Bunch"},
    {value: -100, text: "I Actually Have Too Many Points, Please Take Some Away"},
  ])} />)
}

const Host = () => {
  return (
    <OneRound 
      scorer={parse()}
      startComponent={() => (<div>
          <h1>HOW MANY POINTS WOULD YOU LIKE?</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={() => (<h1>HERE YOU GO</h1>)}
      scoreText={(player, scores) => {
        const words = {15: "a few points", 0: "no points", 200: "a bunch of points", "-100": "some points to be taken away"};
        return (<li key={player.name}>{player.name} asked for {words[scores[player.name]]}, +{scores[player.name]} points - {player.score} total}</li>)
      }}/>
  );
}

const give = {player: Player, host: Host, key: 'give', title: "Give Points"};
export default give;