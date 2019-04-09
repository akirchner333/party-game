import React from 'react';

import EmptyForm from "../components/empty_form.jsx";
import OneRound from "../components/one_round.jsx";

const Player = () => {
  return (<EmptyForm buttonText="PRESS" />);
}

const Host = () => {
  return (
    <OneRound 
      scorer={(player) => player.guess ? 100 : 0}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>WHOEVER PRESSES THE BUTTON FIRST GETS 100 POINTS</h1>
          <div>You have a bunch of time</div>
        </div>)}
      resolveWait={600}
      finishComponent={(props) => {
        console.log(props);
        var winner = props.players.find((p) => p.guess != null);
        if(winner){
          return (<h1>{winner.name.toUpperCase()} PRESSED FIRST! EVERYBODY ELSE GETS NOTHING!</h1>)
        }else{
          return (<h1>NOBODY PRESSED? YOU WAITED ALL THAT TIME AND NOBODY PRESSED THE BUTTON? WILD. ANYWAY, NOBODY GETS ANY POINTS</h1>)
        }
      }}/>
  );
}

const first_press = {player: Player, host: Host, key: 'first_press', title: "First Press"};
export default capitalism;