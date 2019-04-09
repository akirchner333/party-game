import React from 'react';

import EmptyForm from "../components/empty_form.jsx";
import OneRound from "../components/one_round.jsx";

const Player = () => {
  return (<EmptyForm buttonText="I OVERTHREW CAPITALISM" />);
}

const Host = () => {
  return (
    <OneRound 
      scorer={(player) => player.guess ? 100 : 0}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>OVERTHROW CAPITALISM</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={(props) => {
        console.log(props);
        var winner = props.players.find((p) => p.guess != null);
        return (<h1>GOOD WORK {winner ? winner.name + "!" : "NOBODY, THANKS FOR NOTHING"}</h1>)
      }}/>
  );
}

const capitalism = {player: Player, host: Host, key: 'capitalism', title: "Overthrow Capitalism"};
export default capitalism;