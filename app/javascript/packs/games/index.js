import number from './guess_number.jsx'
import trivia from './trivia.jsx'
import look from './look.jsx'
import give from './give_points.jsx'
import capitalism from "./capitalism.jsx"
import grenade from "./grenade.jsx"
import first_press from "./first_press.jsx"

const games = [
  number,
  trivia,
  look,
  give,
  capitalism,
  grenade,
  first_press
]

var host_games = {};
var player_games = {};

for(var i = 0; i < games.length; i++){
  const game = games[i];
  host_games[game.key] = game.host;
  player_games[game.key] = game.player;
}

export {games, host_games, player_games}