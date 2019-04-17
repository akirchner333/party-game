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

export {numerical, text, radio, empty}