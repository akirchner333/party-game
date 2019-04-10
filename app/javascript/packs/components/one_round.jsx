import React from 'react';
import { connect } from 'react-redux'

class Display extends React.Component{
  constructor(props){
    super(props);
    const timeout = window.setTimeout(() => {
      this.resolve();
    }, (props.resolveWait * 1000) || 15000);

    this.state = {
      finished: false,
      timeout
    }

    this.resolve = this.resolve.bind(this);
    this.finished = this.finished.bind(this);
    this.scoreText = this.scoreText.bind(this);
  }

  resolve(){
    var scores = this.props.scorer(this.props);
    // this.props.players.forEach((player) => {
    //   scores[player.name] = this.props.scorer(player, this.props.players);
    // });
    this.setState({finished: true, scores});
    this.props.updateScores(scores);
    this.props.channel.perform('send_message', {type: "ADD_POINTS", scores});
    setTimeout(() => {
      this.props.channel.perform('send_message', {type: "SET_STATE", state: "root"});
      this.props.clearGuesses();
      this.props.returnToRoot();
    }, this.props.returnWait || 5000);
  }

  finished(){
    if(this.props.finished){
      return this.props.finished(this.props.players);
    }else{
      return this.props.players.every((player) => player.guess != null);
    }
  }

  scoreText(player, scores){
    if(this.props.scoreText){
      return this.props.scoreText(player, scores);
    }else{
      const verb = this.props.verb || "guessed";
      return (<li key={player.id}>{player.name} {verb} {player.guess || "nothing"}, +{scores[player.name]} points - {player.score} total</li>);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!this.state.finished && this.finished()){
      clearTimeout(this.state.timeout);
      this.resolve();
    }
  }

  render(){
    if(!this.state.finished){
      return (<div>{this.props.startComponent(this.props)}</div>);
    }else{
      const scores = this.props.players.map((p) => this.scoreText(p, this.state.scores));
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

const mapState = (state) => {
  return {
    channel: state.channel,
    players: state.players
  }
}

const mapDispatch = (dispatch) => {
  return {
    returnToRoot: () => dispatch({type: 'SET_STATE', state: 'root'}),
    updateScores: (scores) => dispatch({type: 'UPDATE_SCORES', scores}),
    clearGuesses: () => dispatch({type: 'CLEAR_GUESSES'})
  };
}

const OneRound = connect(mapState, mapDispatch)(Display);
export default OneRound;