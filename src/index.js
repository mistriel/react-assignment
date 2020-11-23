import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {
  constructor(props){
		super(props);
		this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isXnext: true,
      theWinner: null,
      stepNumber: 0,
		}
	}
	render() {
   
    let status;
    if (this.state.theWinner !== null) {
      status = 'Winner: ' + this.state.theWinner;
    } else {
      status = 'Next player: ' + (this.state.isXnext ? 'X' : 'O');
    }

    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move  + ' of player:' + (((move % 2) === 0) ? 'X' : 'O' ):
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

		return (
      
			<div className="game">
        
        <div className="game-info">
          <div>{ status }</div>
				</div>

				<div className="game-board">
					<Board  boardSquares={current.squares} 
                  theWinner={this.state.theWinner} 
                  onClickSquare={(i)=> this.handleClick(i)}/>
				</div>
        <div className="game-info">
          <ol>{moves}</ol>
				</div>
				
			</div>
		);
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(this.state.theWinner !== null){
      return;
    }
		if(squares[i] == null){
      squares[i] =  this.state.isXnext ? 'X' : 'O';
      const winner = calculateWinner(squares);
			this.setState({history: history.concat([{squares: squares}]), isXnext: !this.state.isXnext, theWinner: winner, stepNumber: history.length});
		}
  }

  jumpTo(step) {
    if(step === this.state.stepNumber){
      return;
    }
    this.setState({
      stepNumber: step,
      isXnext: (step % 2) === 0,
      theWinner: null,
    });
  }
}


class Board extends React.Component {

  renderSquare(i) {
    // passing two properties to the square function 'squareVal' and a function 'onClickSquare'
    return <Square squareVal={this.props.boardSquares[i]} onClickSquare={() => this.props.onClickSquare(i)}/>; 
  }
  
	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClickSquare()}>
      {props.squareVal}
    </button>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
