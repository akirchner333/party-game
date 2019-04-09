import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import reducer from "./reducers/player_reducer.js"
import {playerLocalStore} from "./reducers/middleware.js"
import Router from './components/router.jsx'

import Root from "./components/player_root.jsx";
import Waiting from "./components/waiting.jsx";
import {player_games} from "./games/index.js"

const stored = JSON.parse(localStorage.getItem('player_store') || '{}')
let store = createStore(reducer, applyMiddleware(playerLocalStore));
store.dispatch({type: 'LOAD', stored})
let channel = playerChannel(id, store);
store.dispatch({type: "CREATE", channel, id, name});

const pages = Object.assign({}, player_games, {root: Root, wait: Waiting})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (<Provider store={store}>
      <Router pages={pages}/>
    </Provider>),
    document.body.appendChild(document.createElement('div')),
  );
})
