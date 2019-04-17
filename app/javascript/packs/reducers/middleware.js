const playerLocalStore = store => next => action => {
  const result = next(action);
  const storage = {
    name: store.getState().name,
    score: store.getState().score,
    game_state: store.getState().game_state,
  };
  localStorage.setItem('player_store', JSON.stringify(storage));
  return result;
}

const hostLocalStore = store => next => action => {
  const result = next(action);
  const storage = {
    game_state: store.getState().game_state,
    players: store.getState().players
  };
  localStorage.setItem('host_store', JSON.stringify(storage));
  return result;
}

const broadcast = store => next => action => {
  if(action.broadcast){
    store.getState().channel.perform('send_message', action);
  }
  return next(action);
}

export {playerLocalStore, hostLocalStore, broadcast};