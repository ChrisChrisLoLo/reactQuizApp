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
    this.state = {quesIndex: 0,
                  score: 0,
                  correct: null,
                  finished: false};
  }

  nextQues(){
    const newIndex = this.state.quesIndex + 1;
    this.setState({
      quesIndex: newIndex
    })
    console.log(newIndex);
  }

  scoreUp(){
    const newScore = this.state.score + 1;
    this.setState({score:newScore});
  }

  render(){
    const newQuestion = questionQueue[this.state.quesIndex];
    return(
      <div>
        <h2>Score: {this.state.score}</h2>
        <QuesBox question={newQuestion.question} correctAns={newQuestion.corAns} allAns={newQuestion.posAns}
        nextQues={this.nextQues} scoreUp={this.scoreUp} />
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
    this.state = {answer: 'nullAns' ,
                  correct: null,
                  finished: false
                  };
  }

  giveAns(newAns){
    //This will probably fail as its calling upon QuesBox props
    if (this.state.finished){
      return;
    }
    const correct = (newAns === this.props.correctAns);
    console.log(correct)
    if (correct) {
      this.props.scoreUp()
    }
    this.setState({
      answer: newAns,
      correct: correct,
      finished: true,
    });
  }

  handleOnClickNext(){
    this.props.nextQues();

  }

  render() {
    //Display button to proceed to next question once question has been answered
    const buttonNext = (this.state.correct == null ? null:<button onClick={this.handleOnClickNext}>Next</button>);
    return (
    <div>
      <h1>{this.props.question}</h1>
      <h2>{this.state.answer}</h2>
      <h2>{this.state.correct ? "Correct":"Wrong"}</h2>
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
