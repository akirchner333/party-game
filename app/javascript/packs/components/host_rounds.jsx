import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import HostRound from "./host_round.jsx"

class Display extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      passAlong: {}
    }

    this.nextRound = this.nextRound.bind(this);
  }

  nextRound(newInfo){
    if(this.props.round + 1 < this.props.pages.length){
      this.setState({passAlong: newInfo});
      this.props.channel.perform('send_message', {type: "NEXT_ROUND"});
      this.props.nextRound();
    }else{
      this.props.channel.perform('send_message', {type: "END_GAME"});
      this.props.endGame();
    }
  }

  render(){
    return <HostRound {...this.props.pages[this.props.round]} 
      nextRound={this.nextRound} 
      passAlong={this.state.passAlong} />;
  }
}

const mapState = (state) => {
  return {
    channel: state.channel,
    round: state.round
  }
}

const mapDispatch = (dispatch) => {
  return {
    nextRound: () => dispatch({type: 'NEXT_ROUND'}),
    endGame: () => dispatch({type: 'END_GAME'}),
  }
}

const HostRounds = connect(mapState, mapDispatch)(Display);
export default HostRounds;