import {combineReducers} from 'redux';
import shared_reducers from "./reducers.js"

const score = (state = 0, action) => {
  switch(action.type){
    case 'LOAD':
      return action.stored.score || state;
    case 'ADD_POINTS':
      return state + action.delta;
    case 'SET_SCORE':
      return action.score;
    default:
      return state;
  }
}

const guess = (state = "", action) => {
  switch(action.type){
    case 'SET_GUESS':
      return action.guess;
    case 'END_GAME':
      return "";
    default:
      return state;
  }
}

const name = (state = "", action) => {
  switch(action.type){
    case 'CREATE':
      return action.name;
    case 'LOAD':
      return action.stored.name || state;
    default:
      return state;
  }
}

const player_reducers = {
  score,
  guess,
  name,
}

const combined = combineReducers(Object.assign({}, player_reducers, shared_reducers));

const reducer = (state, action) => {
  if(action.type == 'ADD_POINTS'){
    action = {type: 'ADD_POINTS', delta: action.scores[state.name] || 0}
  }
  return combined(state, action);
}
export default reducer;