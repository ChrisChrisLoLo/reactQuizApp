import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <Game/>
      </div>
    );
  }
}

//a list where questions and their properties resign. time currently doesnt work.
//Eventually this should become a JSON file
function quesItem(question,posAns,corAns,time){
  this.question = question;
  this.posAns = posAns;
  this.corAns = corAns;
  this.time = time;
}

var questionQueue = [
  new quesItem("1 + 1 = ?",["10","2","11","0"],"2",null),
  new quesItem("How many letters in MNMNMNMNMMNMNMNMNMNMNMNM?",["24","25","23","19"],"24",null),
  new quesItem("What is the meaning of life",["42","24","9","25"],"9",null),
  new quesItem("Who is Steve Jobs?",["A Rich Guy","Founder of Apple","Tech Inventor","GENIUS HERO INSPIRATION SAVIOR WHO SHOT HUMANITY AMONG THE STARS"],"GENIUS HERO INSPIRATION SAVIOR WHO SHOT HUMANITY AMONG THE STARS",null),

];

class Game extends Component{
  constructor(props){
    super(props);
    this.nextQues = this.nextQues.bind(this);
    this.scoreUp = this.scoreUp.bind(this);
    this.answerQues = this.answerQues.bind(this);
    this.resetQuestionState = this.resetQuestionState.bind(this);
    this.state = {quesIndex: 0,
                  score: 0,
                  correct: null,
                  finished: false,
                  answer: null};
  }

  nextQues(){
    const newIndex = this.state.quesIndex + 1;
    this.setState({
      quesIndex: newIndex
    })
    console.log(newIndex);
  }

  answerQues(correct,answer){
    this.setState({correct : correct,
                  finished : true,
                  answer: answer
    });
  }

  scoreUp(){
    const newScore = this.state.score + 1;
    this.setState({score:newScore});
  }

  //Reset the state of the question after "Next has been clicked on"
  resetQuestionState(){
    this.setState({correct: null,
                  finished: false,
                  answer: null});
  }
  render(){
    const newQuestion = questionQueue[this.state.quesIndex];
    return(
      <div>
        <h2>Score: {this.state.score}</h2>
        <QuesBox question={newQuestion.question} correctAns={newQuestion.corAns} allAns={newQuestion.posAns}
        nextQues={this.nextQues} scoreUp={this.scoreUp} answerQues={this.answerQues} correct={this.state.correct}
        finished={this.state.finished} answer={this.state.answer} resetQuestionState={this.resetQuestionState}/>
      </div>
    )
  }
    //return <QuesBox question='who is cool' correctAns='Spiddyman' allAns={['Spiddyman','Dwyan Rockson','Noobert','FBI']}/>

}

class QuesBox extends Component{
  constructor(props){
    super(props);
    this.giveAns = this.giveAns.bind(this);
    this.handleOnClickNext = this.handleOnClickNext.bind(this);
  }
  giveAns(newAns){
    if (this.props.finished){
      return;
    }
    const correct = (newAns === this.props.correctAns);
    console.log(correct)
    if (correct) {
      this.props.scoreUp()
    }
    this.props.answerQues(correct,newAns);
  }

  handleOnClickNext(){
    this.props.nextQues();
    this.props.resetQuestionState();
  }

  render() {
    //Display button to proceed to next question once question has been answered
    //Forgive me for bordeline spaghetti code
    //the two consts will be null and NOT displayed until the question has been answered.
    const buttonNext = (this.props.correct == null ? null:<button onClick={this.handleOnClickNext}>Next</button>);
    const displayCorrect = (this.props.correct == null ? null:(this.props.correct ? "Correct":"Wrong"));
    return (
    <div>
      <h1>{this.props.question}</h1>
      <h2>{this.props.answer}</h2>
      <h2>{displayCorrect}</h2>
      <div>
        <AnsButton ans={this.props.allAns[0]} onClick={this.giveAns}/>
        <AnsButton ans={this.props.allAns[1]} onClick={this.giveAns}/>
      </div>
      <div>
        <AnsButton ans={this.props.allAns[2]} onClick={this.giveAns}/>
        <AnsButton ans={this.props.allAns[3]} onClick={this.giveAns}/>
      </div>
      {buttonNext}
    </div>
    )
  }
}

class AnsButton extends Component{
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(){
    this.props.onClick(this.props.ans);
  }
  render(){
    return(
      <button onClick={this.handleOnClick}>{this.props.ans}</button>
    )
  }
}

export default App;
