class PlayerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_channel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    ActionCable.server.broadcast(
      "host_channel_#{params[:room]}",
      data
    )
  end
end
