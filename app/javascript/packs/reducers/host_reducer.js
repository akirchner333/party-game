import {combineReducers} from 'redux';
import shared_reducers from "./reducers.js"

const players = (state = [], action) => {
  switch(action.type){
    case 'ADD_PLAYER':
      // I should check here to avoid duplicate names
      return [...state, {name: action.name, score: 0, guess: null, id: state.length}];
    case 'LOAD':
      return action.stored.players ? action.stored.players : state;
    case 'ADD_SCORE':
    case 'ADD_POINTS':
    case 'ANSWER':
    case 'CLEAR_GUESSES':
    case 'END_GAME':
      return state.map((p) => player(p, action));
    default:
      return state;
  }
}
const player = (state = {}, action) => {
  if(state.name === action.name || state.id === action.id){
    switch(action.type){
      case 'ANSWER':
        return Object.assign({}, state, {guess: action.answer});
      case 'ADD_SCORE':
        return Object.assign({}, state, {score: state.score + action.score});
      default:
        return state;
    }
  }else{
    switch(action.type){
      case 'ADD_POINTS':
        const delta = action.scores[state.name] || 0;
        return Object.assign({}, state, {score: parseInt(state.score) + delta});
      case 'END_GAME':
      case 'CLEAR_GUESSES':
        return Object.assign({}, state, {guess: null});
      default:
        return state;
    }
  }
}

const code = (state = "", action) => {
  switch(action.type){
    case 'CREATE':
      return action.code;
    default:
      return state;
  }
}

const host_reducers = {
  players,
  code
};

const reducer = combineReducers(Object.assign({}, host_reducers, shared_reducers));
export default reducer;