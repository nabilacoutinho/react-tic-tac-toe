import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      step: 0,
      xIsNext: true,
      isMultiplayer: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length -1];
    let squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = (this.state.xIsNext) ? "X" : "O";

    this.setState({
      history: history.concat([{squares}]),
      step: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      step: step,
      xIsNext: (step % 2) === 0,
    });
  }

  newGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: !this.xIsNext,
      step: 0,
    });
  }

  changePlayerConfig() {
    this.setState({
      isMultiplayer: !this.state.isMultiplayer,
    });
  }

  playNextTime() {
    const history = this.state.history;
    const current = history[history.length -1];
    const finishedGame = current.squares.indexOf(null) === -1;
    if (this.state.isMultiplayer || finishedGame) {
      return;
    }

    let nextMove;

    while (nextMove === undefined) {
      const randMove = Math.floor(Math.random() * 10);
      if (current.squares[randMove] == null) {
        nextMove = randMove;
      }
    }

    this.handleClick(nextMove);
  }

  renderMoves(history) {
    return history.map((_step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      let buttonClass = "list-group-item list-group-item-action ";
      if (move === this.state.step) {
        buttonClass += "bg-dark text-light";
      }

      return (
        <button
          key={move}
          className={buttonClass}
          onClick={() => this.jumpTo(move)}>
            {desc}
        </button>
      );
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];

    const moves = this.renderMoves(history);

    let status = "";
    let headerClass = "display py-3 text-light text-center ";
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = "Winner " + winner;
      headerClass += (this.state.xIsNext) ? "bg-danger" : "bg-info";
    } else {
      const finishedGame = history[history.length -1].squares.indexOf(null) === -1;
      const player = (this.state.xIsNext) ? "X" : "O";
      status = (finishedGame) ? "No one won!" : 'Next player: ' + player;
      headerClass += "bg-dark";
    }

    if (!this.state.xIsNext && !this.state.isMultiplayer) {
      this.playNextTime();
    }

    return (
      <div className="game">

        <div className={headerClass}>
            <h1>
              Tic Tac Toe Game <br/>
              <small>{status}</small>
            </h1>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="game-board col-md-6 pr-5">
              <div className="text-right my-3 col-md-7 offset-md-5 pr-1 pl-3">
                <div className="btn-group btn-group-lg btn-block" role="group" aria-label="Multiplayer options">
                  <button
                    className={(!this.state.isMultiplayer) ? "btn btn-dark active" : "btn btn-dark "}
                    onClick={() => this.changePlayerConfig()}>
                    One Player
                  </button>
                  <button
                      className={(this.state.isMultiplayer) ? "btn btn-dark active" : "btn btn-dark "}
                      onClick={() => this.changePlayerConfig()}>
                      Two Players
                  </button>
                </div>
              </div>
              <div className="clearfix"></div>
              <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
              />
              <div className="clearfix"></div>
              <div className="text-right my-3 col-md-7 offset-md-5 pr-1 pl-3">
                <button
                  className="btn btn-block btn-lg btn-dark"
                  onClick={() => this.newGame()}>
                  New Game
                </button>
              </div>
            </div>
            <div className="game-info col-md-4">
              <ul className="list-group">{moves}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
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

export default Game;
