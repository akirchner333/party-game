import React from 'react';
import { connect } from 'react-redux'

import {games} from '../games/index.js'

class RootDisplay extends React.Component{
  constructor(props){
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect(e, state){
    e.preventDefault();
    this.props.channel.perform('send_message', {type: "SET_STATE", state});
    this.props.setState(state);
  }

  render(){
    const players = this.props.players.map((p) =>
      <li key={p.id}>{p.name} - {p.score} points</li>
    );

    const gameList = games.map((g) => 
      <li key={g.key}><a href="#" onClick={(e) => this.redirect(e, g.key)}>{g.title}</a></li>
    )

    return (
      <div>
        <h1>100 Bad Party Games!!</h1>
        <div>
          Game Code: {this.props.code}
        </div>
        <div>
          <h2>Players</h2>
          <ul>
            {players}
          </ul>
        </div>

        <div>
          <h2>Games!</h2>
          <ol>
            {gameList}
          </ol>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    channel: state.channel,
    players: state.players,
    game_id: state.game_id,
    code: state.code
  }
}

const mapDispatch = (dispatch) => {
  return {
    setState: (state) => dispatch({type: "SET_STATE", state})
  };
}

const Root = connect(mapState, mapDispatch)(RootDisplay);
export default Root;