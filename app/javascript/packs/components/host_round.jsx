import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class Display extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      finished: false,
      timeout: this.startTimer()
    }

    this.resolve = this.resolve.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(){
    return window.setTimeout(() => {
      // just in case
      if(!this.state.finished){
        this.resolve();
      }
    }, this.props.resolveWait * 1000);
  }

  resolve(){
    this.props.resolve(this.props);

    // I'm keeping the finished state even though it's less important here
    // Just to avoid any kind of loops in componentDidUpate. Resolve can only run once per rendering of this component
    this.setState({finished: true});
    // Each round may want to pass information to the next round. But how's that defined?
    // Perhaps I'll leave this blank for now until a future point where I have a specific use case
    this.props.nextRound({});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!this.state.finished && this.props.finished(this.props.players)){
      clearTimeout(this.state.timeout);
      this.resolve();
    }else if(this.state.finished && prevProps.page !== this.props.page){
      this.setState({
        finished: false,
        timeout: this.startTimer()
      });
    }
  }

  render(){
    return (<div>{this.props.page(this.props)}</div>);
  }
}

Display.propTypes = {
  resolve: PropTypes.func,
  finished: PropTypes.func,
  page: PropTypes.func.isRequired,
  nextRound: PropTypes.func.isRequired,
  resolveWait: PropTypes.number
}

Display.defaultProps = {
  resolve: (p) => {},
  finished: (players) => players.every((player) => player.guess != null),
  resolveWait: 15,
}

const mapState = (state) => {
  return {
    channel: state.channel,
    players: state.players
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateScores: (scores) => dispatch({type: 'UPDATE_SCORES', scores}),
    clearGuesses: () => dispatch({type: 'CLEAR_GUESSES'})
  };
}

const OneRound = connect(mapState, mapDispatch)(Display);
export default OneRound;