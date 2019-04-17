import React from 'react';

import AnswerForm from "../components/answer_form.jsx";
import Rounds from "../components/rounds.jsx";
import HostRounds from "../components/host_rounds.jsx";
import ScorePage from "../components/score_page.jsx";

const Player = (props) => {
  return (<Rounds pages = {[
    () => <div></div>,
    () => <AnswerForm options={[
          {value: 1, text: "Yes"},
          {value: 2, text: "No"}
        ]}/>,
    () => <h1>Waiting...</h1>
  ]}/>);
}

const Host = (props) => {
  return (<HostRounds pages={[
    {page: () => (<div>
              <h1>LET{"'"}S ALL THINK ABOUT DEATH FOR A BIT</h1>
              <div>You have 15 seconds</div>
            </div>)},
    {page: () => (<div>
            <h1>DID YOU REALLY THINK ABOUT DEATH? YOU HAVE TO TELL THE TRUTH</h1>
            <div>You have 15 seconds</div>
          </div>
        )},
    {page: () => <ScorePage 
      scorer={(props) => props.players.reduce((acc, p) => {
        acc[p.name] = p.guess == 1 ? 100 : 10;
        return acc;
      }, {})}
      title={() => "THANK YOU FOR YOUR HONESTY EVERYONE"}
      scoreText={(p, scores) => (<li key={p.name}>{p.name} {p.guess == 1 ? "thought about death, +100 points" : "didn't think about death buts gets +10 points for being honest about it"} - {p.score} total.</li>)}/>,
    resolveWait: 10,
    finished: () => false}
  ]}/>);
};

const death = {player: Player, host: Host, key: 'death', title: 'Think About Death'};
export default death;