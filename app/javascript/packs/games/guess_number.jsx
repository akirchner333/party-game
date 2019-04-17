import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";
import {comparison} from "../components/scorers.jsx"
import {numerical} from "../components/inputs.jsx"

const NumberPlayer = () => {
  return (<AnswerForm 
    input={numerical} 
    buttonText="GUESS" />);
}

const NumberHost = () => {
  const power = parseInt(Math.random() * 10) + 1
  const number = parseInt(Math.random() * Math.pow(10, power))
  return (
    <OneRound 
      scorer={comparison(number, 100, 1)}
      startComponent={() => (<div>
          <h1>Guess A Number!</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={() => (<h1>The Number Was {number}!</h1>)}
      verb="said"/>
  );
}

const number = {player: NumberPlayer, host: NumberHost, key: 'number', title: 'Guess The Number'}
export default number;