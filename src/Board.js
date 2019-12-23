import React from 'react';
import Square from './Square.js';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)} />
    );
  }

  renderRow(rowNumber) {
    return(
      <div className="board-row float-right">
        {this.renderSquare(rowNumber + 0)}
        {this.renderSquare(rowNumber + 1)}
        {this.renderSquare(rowNumber + 2)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
      </div>
    );
  }
}

export default Board;
