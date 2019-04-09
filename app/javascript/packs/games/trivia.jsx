import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import OneRound from "../components/one_round.jsx";

const TriviaPlayer = () => {
  return (<AnswerForm type="text" buttonText="GUESS" />);
}

const TriviaHost = () => {
  const answer = "en-tarah-ana"
  return (
    <OneRound 
      scorer={(player) => player.guess.toLowerCase() == answer ? 9999999 : 0}
      startComponent={(<div>
          <h1>WHO WAS THE 4TH SUMERIAN KING IN THE FIRST DYNASTY OF KISH, ACCORDING TO THE SUMERIAN KING LIST?</h1>
          <div>You have 15 seconds</div>
        </div>)}
      finishComponent={(<h1>IT WAS EN-TARAH-ANA, OBVIOUSLY</h1>)}/>
  );
}

const trivia = {player: TriviaPlayer, host: TriviaHost, key: 'trivia', title: "Trivia"};
export default trivia;