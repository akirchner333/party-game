function playerChannel(id, store){
  return App.cable.subscriptions.create(
    {
      channel: "PlayerChannel",
      room: id
    },{
      connected: () => {console.log("Connected!")},
      disconnected: () => {console.log("disconnected")},
      received: (msg) => {
        console.log("Msg received", msg);
        store.dispatch(msg);
      },
      rejected: () => console.log("rejected")
    }
  );
}