import number from './guess_number.jsx'
import trivia from './trivia.jsx'
import look from './look.jsx'
import give from './give_points.jsx'
import capitalism from "./capitalism.jsx"
import grenade from "./grenade.jsx"
import first_press from "./first_press.jsx"
import last_press from "./last_press.jsx"
import death from "./death.jsx"
import spy from "./spy.jsx"

const games = [
  number,
  trivia,
  look,
  give,
  capitalism,
  grenade,
  first_press,
  last_press,
  death,
  spy
]

var host_games = {};
var player_games = {};

for(var i = 0; i < games.length; i++){
  const game = games[i];
  host_games[game.key] = game.host;
  player_games[game.key] = game.player;
}

export {games, host_games, player_games}