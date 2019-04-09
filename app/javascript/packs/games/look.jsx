import React from 'react';

import OneRound from "../components/one_round.jsx";

const LookPlayer = () => {
  return (<h1>DON{'\''}T LOOK HERE, LOOK AT THE CAT</h1>);
}

const LookHost = () => {
  return (
    <OneRound 
      scorer={(player) => 93}
      finished={(players) => false}
      startComponent={() => (<div>
          <h1>HEY, CAN YOU LOOK AT THIS CAT FOR ME?</h1>
          <div>You have 15 seconds</div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg" alt="a white cat with an amber left eye and green right eye." height="400px" />
        </div>)}
      finishComponent={() => (<h1>THANKS EVERYBODY</h1>)}
      scoreText={(player, scores) => (<li key={player.name}>{player.name} gets 93 points for looking at the cat - {player.score} total</li>)} />
  );
}

const look = {player: LookPlayer, host: LookHost, key: 'look', title: 'Look At This Cat'}
export default look;