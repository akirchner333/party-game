import React from 'react';
import { connect } from "react-redux";

const Display = (props) => {
  var Display = props.pages[props.game_state];
  return (
    <div>
      <Display />
    </div>
  );
}

const mapState = (state) => {
  return {
    game_state: state.game_state
  }
}

const mapDispatch = (dispatch) => {
  return {};
}

const Router = connect(mapState, mapDispatch)(Display);
export default Router;