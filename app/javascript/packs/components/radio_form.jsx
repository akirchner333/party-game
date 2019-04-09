import React from 'react'
import { connect } from 'react-redux'

class FormDisplay extends React.Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => this.props.setGuess(event.target.value)

  handleSubmit(event){
    this.props.channel.perform('send_message', {type: "ANSWER", answer: this.props.guess, name: this.props.name});
    event.preventDefault();
    this.props.wait();
    return false;
  }

  render(){
    var option = {value: "yeah", text: "yeah"}
    const buttons = this.props.options.map((option) => <div key={option.value}><input type='radio' value={option.value} onChange={this.handleChange} checked={this.props.guess == option.value}/>{option.text}</div>);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {buttons}
          <input type="submit" value={"SUBMIT"}/>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    guess: state.guess,
    channel: state.channel,
    name: state.name
  }
}
const mapDispatch = (dispatch) => {
  return {
    setGuess: (guess) => dispatch({type: "SET_GUESS", guess}),
    wait: () => dispatch({type: "SET_STATE", state: 'wait'})
  };
}
const RadioForm = connect(mapState, mapDispatch)(FormDisplay);
export default RadioForm;