import React from 'react';
import { connect } from 'react-redux'

class FormDisplay extends React.Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.props.setGuess(event.target.value)
  }

  handleSubmit(event){
    this.props.channel.perform('send_message', {type: "ANSWER", answer: this.props.guess, name: this.props.name});
    event.preventDefault();
    this.props.wait();
    return false;
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type={this.props.type || 'text'} value={this.props.guess} onChange={this.handleChange}></input>
          <input type="submit" value={this.props.buttonText || "SUBMIT"}/>
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

const AnswerForm = connect(mapState, mapDispatch)(FormDisplay);
export default AnswerForm;