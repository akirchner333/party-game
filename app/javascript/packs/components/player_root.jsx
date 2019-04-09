import React from 'react';
import { connect } from 'react-redux'

class PlayerDisplay extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          You have {this.props.score} points. Good work.
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    channel: state.channel,
    name: state.name,
    score: state.score
  }
}

const mapDispatch = (dispatch) => {
  return {};
}

const Root = connect(mapState, mapDispatch)(PlayerDisplay);
export default Root;