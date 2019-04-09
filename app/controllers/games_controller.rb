class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def create
    game = Game.new
    game.save
    redirect_to game
  end

  def show
    @game = Game.find(params[:id])
  end
end
