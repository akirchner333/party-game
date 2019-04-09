import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import reducer from './reducers/host_reducer.js'
import {hostLocalStore} from "./reducers/middleware.js"
import Router from './components/router.jsx'

import Root from './components/host_root.jsx'
import {host_games} from './games/index.js'

const stored = JSON.parse(localStorage.getItem('host_store') || '{}');
console.log(stored);
let store = createStore(reducer, applyMiddleware(hostLocalStore));
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
