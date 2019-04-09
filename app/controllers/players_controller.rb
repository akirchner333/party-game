class PlayersController < ApplicationController
  def create
    game = Game.find_by(code: params[:player][:code])
    name = params[:player][:name]
    ActionCable.server.broadcast(
      "host_channel_#{game.id}",
      {type: "ADD_PLAYER", name: name}
    )
    session[:name] = name
    redirect_to player_path(game)
  end

  def show
    @game = Game.find(params[:id])
    @name = session[:name]
  end
end
