import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import reducer from './reducers/host_reducer.js'
import {hostLocalStore, broadcast} from "./reducers/middleware.js"
import Router from './components/router.jsx'

import Root from './components/host_root.jsx'
import {host_games} from './games/index.js'

var stored = {};
try{
  const local = localStorage.getItem('host_store');
  stored = JSON.parse(local) || {};
}catch(err){
  console.log("caught?")
}

let store = createStore(reducer, applyMiddleware(hostLocalStore, broadcast));
store.dispatch({type: "LOAD", stored});
let channel = hostChannel(id, store);
store.dispatch({type: "CREATE", channel, id, code});

const pages = Object.assign({}, host_games, {root: Root})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (<Provider store={store}>
      <Router pages={pages}/>
    </Provider>),
    document.body.appendChild(document.createElement('div')),
  )
})
