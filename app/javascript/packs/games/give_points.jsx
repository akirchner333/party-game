import React from 'react';

import RadioForm from "../components/radio_form.jsx";
import OneRound from "../components/one_round.jsx";

const Player = () => {
  return (<RadioForm options={[
    {value: 15, text: "Just A Few, Please"},
    {value: 0, text: "I Have Enough Already"},
    {value: 200, text: "Give Me A Bunch"},
    {value: -100, text: "I Actually Have Too Many Points, Please Take Some Away"},
  ]}/>)
}

const Host = () => {
  return (
    <OneRound 
      scorer={(player) => parseInt(player.guess || 0)}
      startComponent={() => (<div>
          <h1>HOW MANY POINTS WOULD YOU LIKE?</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={() => (<h1>HERE YOU GO</h1>)}
      verb={"said"}/>
  );
}

const give = {player: Player, host: Host, key: 'give', title: "Give Points"};
export default give;