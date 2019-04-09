import React from 'react';

import RadioForm from "../components/radio_form.jsx";
import OneRound from "../components/one_round.jsx";
import bird from "../../images/bird1.jpg"

const Player = () => {
  return (<RadioForm options={[
    {value: 1, text: "Yes"},
    {value: 0, text: "No"}
  ]}/>)
}

const Finish = (props) => {
  var yes_count = props.players.reduce((p) => p.guess == 1);
  var no_count = props.players.reduce((p) => p.guess == 0);
  return (<h1>MOST PEOPLE SAID {yes_count > no_count ? "YES" : "NO"}, UNPOPULAR OPINIONS GET 25 POINTS</h1>)
}

const Host = () => {
  return (
    <OneRound 
      scorer={(player, players) => {
        var agreement = players.reduce((p) => p.guess == player.guess ? 1 : 0, 0);
        return agreement >= players.length/2 ? -1 : 25;

      }}
      startComponent={() => (<div>
          <h1>IS THIS A DUCK?</h1>
          <div>You have 15 seconds</div>
          <img src={bird} width="500px"/>
        </div>)}
      finishComponent={Finish}
      verb={"said"}/>
  );
}

const duck = {player: Player, host: Host, key: 'duck', title: "Is This A Duck?"};
export default duck;