import React, { Component } from 'react';
import Letter from './components/Letter'
import Board from './components/Board'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.getEmptyBoard(),
      attempt: 0,
      maxAttempts: 5,
      word: '',
      wordlist: [],
      win: false,
      warning: '',
      usedLetters: []
    };
  }
  componentWillMount() {
    fetch("/words.txt")
        .then(res => res.json())
        .then(
            (result) => {
              const randWord = result[Math.floor((Math.random() * result.length))];
              this.setState({...this.state, wordlist: result, word: randWord});
            });
  }

  getEmptyBoard = () => {
    return [0,1,2,3,4,5].map(row => {
      const letters = [];
      [0,1,2,3,4].map(row => {
        letters.push({letter:'', color:''})
      });
      return letters;
    })
  }

  cantPlay = () => {
    return (this.state.win || (this.state.attempt > 5));
  }

  selectLetter = (name) => {
    if (this.cantPlay()) return;
    const newboard = this.state.board;
    const emptyLetter = newboard[this.state.attempt].find(l => l.letter === '');
    if (emptyLetter) {
      emptyLetter.letter = name;
    }
    this.setState({...this.state, board: newboard});
  }

  backLetter = (name) => {
    if (this.cantPlay()) return;

    const newboard = this.state.board;
    const filled = newboard[this.state.attempt].filter(l => l.letter !== '');
    if (filled.length) {
      filled[filled.length-1].letter = '';
    }
    this.setState({...this.state, board: newboard});
  }

  newGame = () => {
    const randWord = this.state.wordlist[Math.floor((Math.random() * this.state.wordlist.length))];
    this.setState({...this.state, word: randWord, attempt: 0, win: false, warning: '', usedLetters: [],  board: this.getEmptyBoard()});
  }


  completeWord = async () => {
    let warning = '';
    if (this.cantPlay()) return;

    const newboard = this.state.board;
    const usedLetters = this.state.usedLetters;
    const currentBoard = newboard[this.state.attempt];
    const emptyLetter = currentBoard.filter(l => l.letter === '');
    if (emptyLetter.length) {
      return;
    }
    const word = currentBoard.map(l => l.letter).join('').toLowerCase();
    const exist = this.state.wordlist.find(w => w === word)
    if (!exist) {
      warning = `${word}  - this word does not exist`;
    } else {
      let letter;
      for (let index = 0; index < word.length; index++) {
      letter = word[index];
      await new Promise(resolve => setTimeout(resolve, 100));
      if (letter === this.state.word[index]) {
        currentBoard[index].color = 'toGreenAnim';
      } else {
        const words = this.state.word.split('');
        const otherPlace = words.find(w => w === letter)
        currentBoard[index].color = (otherPlace) ? 'toYellowAnim' : 'grey';
        if (!otherPlace) {
          usedLetters.push(letter);
        }
      }
      this.setState({...this.state, board: newboard});
    }
  }
  const win = word === this.state.word;
  const attempt = exist ? this.state.attempt + 1 : this.state.attempt ;

  if(attempt > 5) {
    warning = `You lost. Word: ${this.state.word.toUpperCase()}`;
  }
  if(win) {
    warning = 'You won!';
  }
  this.setState({...this.state, board: newboard, attempt: attempt, win: win, warning: warning, usedLetters: usedLetters});
  }

  render() {
    return (
        <div className="App">
          <h2>Wordle</h2>
          <h3>{this.state.warning}</h3>
          {(this.cantPlay()) && <Letter name={'New game'} onClickFunc={this.newGame} usedLetters={[]}/>}
          {[0,1,2,3,4,5].map(row => <Board letters={this.state.board[row]}/>)}
          <div className={'letters'}>
            <div>
              {['Q','W','E','R','T','Y','U','I','O', 'P'].map(l =><Letter name={l} onClickFunc={this.selectLetter} usedLetters={this.state.usedLetters}/>)}
            </div>
            <div>
              {['A','S','D','F','G','H','J','K','L'].map(l =><Letter name={l} onClickFunc={this.selectLetter} usedLetters={this.state.usedLetters}/>)}
            </div>
            <div>
              {['Z','X','C','V','B','N','M'].map(l =><Letter name={l} onClickFunc={this.selectLetter} usedLetters={this.state.usedLetters}/>)}
            </div>
            <div>
              <Letter name={'back'} onClickFunc={this.backLetter} usedLetters={[]}/>
              <Letter name={'complete'} onClickFunc={this.completeWord} usedLetters={[]}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
