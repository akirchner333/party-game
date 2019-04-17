import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class Display extends React.Component{
  constructor(props){
    super(props);
    const scores = props.scorer(props)
    this.state = {
      scores: scores
    }
    this.props.updateScores(scores);
  }

  render(){
    const scores = this.props.players.map((p) => this.props.scoreText(p, this.state.scores, this.props.verb));
    return (
      <div>
        <h1>{this.props.title(this.props)}</h1>
        <ul>{scores}</ul>
      </div>
    )
  }
}

Display.propTypes = {
  verb: PropTypes.string,
  scoreText: PropTypes.func,
  scorer: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired
}

Display.defaultProps = {
  verb: "guessed",
  scoreText: (player, scores, verb) => (<li key={player.id}>{player.name} {verb} {player.guess || "nothing"}, +{scores[player.name]} points - {player.score} total</li>)
}

const mapState = (state) => {
  return {
    channel: state.channel,
    players: state.players
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateScores: (scores) => dispatch({type: 'ADD_POINTS', scores, broadcast: true}),
  };
}

const ScorePage = connect(mapState, mapDispatch)(Display);
export default ScorePage;