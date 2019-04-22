import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Waiting from "./waiting.jsx"
import {text} from "./inputs.jsx"


class FormDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {finished: false}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.props.setGuess(event.target.value)
  }

  handleSubmit(event){
    this.props.channel.perform('send_message', {type: "ANSWER", answer: this.props.guess || this.props.answer(), name: this.props.name});
    event.preventDefault();
    this.setState({finished: true})
    return false;
  }

  render(){
    if(!this.state.finished){
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.props.input(this.props.guess, this.handleChange, this.props)}
            <input type="submit" value={this.props.buttonText}/>
          </form>
        </div>
      );
    }else{
      return (<Waiting />);
    }
    
  }
}

FormDisplay.defaultProps = {
  answer: () => true,
  buttonText: "SUBMIT",
  input: text
}

FormDisplay.propTypes = {
  answer: PropTypes.func,
  input: PropTypes.func,
  buttonText: PropTypes.string
}

const mapState = (state) => {
  return {
    guess: state.guess,
    channel: state.channel,
    name: state.name,
    host_info: state.host_info
  }
}

const mapDispatch = (dispatch) => {
  return {
    setGuess: (guess) => dispatch({type: "SET_GUESS", guess}),
  };
}

const AnswerForm = connect(mapState, mapDispatch)(FormDisplay);
export default AnswerForm;