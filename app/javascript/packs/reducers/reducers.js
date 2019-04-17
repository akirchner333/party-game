import {combineReducers} from 'redux';

const channel = (state = null, action) => {
  switch(action.type){
    case 'CREATE':
      return action.channel;
    default:
      return state;
  }
}

const game_id = (state = null, action) => {
  switch(action.type){
    case 'CREATE':
      return action.id;
    default:
      return state;
  }
}

const game_state = (state = "root", action) => {
  switch(action.type){
    case 'SET_STATE':
      return action.state;
    case 'LOAD':
      return action.stored.game_state ? action.stored.game_state : state;
    case 'END_GAME':
      return 'root';
    default:
      return state;
  }
}

const round = (state = 0, action) => {
  switch(action.type){
    case 'NEXT_ROUND':
      return state + 1;
    case 'END_ROUND':
    case 'END_GAME':
      return 0;
    default:
      return state;
  }
}

const shared_reducers = {game_id, channel, game_state, round};
export default shared_reducers;