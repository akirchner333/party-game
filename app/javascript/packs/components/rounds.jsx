import React from 'react';
import { connect } from "react-redux";

const Display = (props) => {
  var Display = props.pages[props.round];
  if(Display === undefined){
    Display = () => (<h1>Invalid Round Submitted, Oh No, Explosions</h1>)
  }
  return (
    <div>
      <Display />
    </div>
  );
}

const mapState = (state) => {
  return {
    round: state.round
  }
}

const Rounds = connect(mapState)(Display);
export default Rounds;