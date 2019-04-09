import React from 'react';
import { connect } from 'react-redux'

class FormDisplay extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    this.props.channel.perform('send_message', {type: "ANSWER", answer: true, name: this.props.name});
    this.props.setGuess(true);
    event.preventDefault();
    this.props.wait();
    return false;
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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

const EmptyForm = connect(mapState, mapDispatch)(FormDisplay);
export default EmptyForm;