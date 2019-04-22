import React from 'react';
import {connect} from 'react-redux';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";

import {players, empty} from "../components/inputs.jsx"
import {existence} from "../components/scorers.jsx"

const SpyPlayer = (props) => {
  if(props.host_info){
    if(props.host_info.spy == props.name){
      return (<h1>YOU ARE THE SPY. KEEP IT A SECRET</h1>);
    }else{
      return (<AnswerForm buttonText="PRESS" input={players}/>);
    }
  }else{
    return empty();
  }
}

const mapState = (state) => {
  return {
    host_info: state.host_info,
    name: state.name
  }
}

const Player = connect(mapState)(SpyPlayer);

const Host = () => {
  return (
    <OneRound 
      startFunc={(props) =>{
        var spy = props.players[Math.floor(Math.random() * props.players.length)]
        var info = {
          players: props.players,
          spy: spy.name
        }
        props.channel.perform('send_message', {type: 'SET_HOST_INFO', info});
        return {spy};
      }}
      scorer={(props, state) => {
        var incorrect = 0;
        var scores = props.players.reduce((acc, p) => {
          if(p.name != state.spy.name){
            if(p.guess == state.spy.name){
              acc[p.name] = 100;
            }else{
              acc[p.name] = 0;
              incorrect++;
            }
          }
          return acc;
        }, {});
        scores[state.spy.name] = incorrect * 10;
        return scores;
      }}
      finished={(players) => players.some((p) => p.guess != null)}
      startComponent={() => (<div>
          <h1>ONE OF THE PLAYERS IS A SPY! WHO IS IT?</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={(props, state) => {
        return (<h1>{state.spy.name.toUpperCase()} WAS THE SPY!</h1>);
      }}
      scoreText={(player, scores, verb, state) => {
        if(player.name === state.spy.name){
          return (<li key={player.name}>{player.name} was the spy! +{scores[player.name]} points for everyone who didn{"'"}t get it! {player.score} total.</li>);
        }else{
          return (<li key={player.name}>{player.name} guessed {player.guess || "nothing"}! +{scores[player.name]} points, {player.score} total.</li>);
        }
      }}/>
  );
}

const spy = {player: Player, host: Host, key: 'spy', title: "Spy"};
export default spy;