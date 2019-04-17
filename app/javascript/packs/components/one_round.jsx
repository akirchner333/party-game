import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Display extends React.Component{
  constructor(props){
    super(props);
    const timeout = window.setTimeout(() => {
      this.resolve();
    }, props.resolveWait * 1000);

    this.state = {
      finished: false,
      timeout
    }

    this.resolve = this.resolve.bind(this);
  }

  resolve(){
    var scores = this.props.scorer(this.props);
    console.log(scores);
    this.setState({finished: true, scores});
    this.props.updateScores(scores);
    setTimeout(() => {
      this.props.clearGuesses();
      this.props.returnToRoot();
    }, this.props.returnWait * 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!this.state.finished && this.props.finished(this.props.players)){
      clearTimeout(this.state.timeout);
      this.resolve();
    }
  }

  render(){
    if(!this.state.finished){
      return (<div>{this.props.startComponent(this.props)}</div>);
    }else{
      const scores = this.props.players.map((p) => this.props.scoreText(p, this.state.scores, this.props.verb));
      return (
        <div>
          {this.props.finishComponent(this.props)}
          <ul>
            {scores}
          </ul>
        </div>
      );
    }
  }
}

// I'm not including the props that are provided through connect in this list
// They're in there automatically, I can't mess up by failing to put them in or forget they're an option
Display.propTypes = {
  verb: PropTypes.string,
  resolveWait: PropTypes.number,
  returnWait: PropTypes.number,
  finished: PropTypes.func,
  scoreText: PropTypes.func,
  scorer: PropTypes.func.isRequired,
  startComponent: PropTypes.func.isRequired,
  finishComponent: PropTypes.func.isRequired
}

Display.defaultProps = {
  verb: "guessed",
  resolveWait: 15,
  returnWait: 5,
  finished: (players) => players.every((player) => player.guess != null),
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
    returnToRoot: () => dispatch({type: 'SET_STATE', state: 'root', broadcast: true}),
    updateScores: (scores) => dispatch({type: 'ADD_POINTS', scores, broadcast: true}),
    clearGuesses: () => dispatch({type: 'CLEAR_GUESSES'})
  };
}

const OneRound = connect(mapState, mapDispatch)(Display);
export default OneRound;