import React from "react";

const numerical = (value, handleChange) => (<input type="number" value={value} onChange={handleChange}/>)
const text = (value, handleChange) => (<input type="text" value={value} onChange={handleChange}/>)

const radio = (options) => {
  return (value, handleChange) => {
    const buttons = options.map((option) => {
      return (<React.Fragment key={option.value}>
        <input type='radio' value={option.value} onChange={handleChange} checked={value == option.value}/>
        {option.text}<br/>
      </React.Fragment>);
    });
    return (<React.Fragment>{buttons}</React.Fragment>);
  }
}

const empty = () => <React.Fragment></React.Fragment>

const players = (value, handleChange, props) => {
  console.log("Props received by player", props)
  if(props.host_info){
    const buttons = props.host_info.players.map((p) => {
    return (<React.Fragment key={p.name}>
      <input type="radio" value={p.name} onChange={handleChange} check={value == p.name} />
      {p.name}<br/>
      </React.Fragment>);
    });
    return (<React.Fragment>{buttons}</React.Fragment>);
  }else{
    return empty();
  }
}

export {numerical, text, radio, players, empty}