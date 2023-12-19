import React from 'react';

/**
 * @param {string} boardString
 * @returns {string[][]}
 */
function stringToBoard(boardString) {
  let board = Array(15);
  for (let i = 0; i < 15; i++) {
    board[i] = [...boardString.substring(i * 15, (i + 1) * 15)];
  }
  return board;
}

/**
 * @param {number} i 
 * @param {number} j 
 * @param {string} l
 * @returns {style}
 */
function BoardCell(i, j, l) {
  const defaultCellStyle = {
    border: '1px solid #000',
    textAlign: 'center',
    width: '30px',
    height: '30px',
    margin: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dabc94',
  };

  const tileStyle = {
   ...defaultCellStyle,
    fontSize: '18px',
    backgroundColor: '#ffe5bd',
  };

  const doubleWordStyle = {
    ...defaultCellStyle,
    fontSize: '12px',
    backgroundColor: '#ffbcda',
  };

  const tripleWordStyle = {
    ...defaultCellStyle,
    fontSize: '12px',
    backgroundColor: '#ff4444',
  };

  const doubleLetterStyle = {
    ...defaultCellStyle,
    fontSize: '12px',
    backgroundColor: '#aaddff',
  };

  const tripleLetterStyle = {
    ...defaultCellStyle,
    fontSize: '12px',
    backgroundColor: '#5588cc',
  };

  if (l !== ' ') {
    return <div key={j} style={tileStyle}> {l} </div>;
  }

  let ri = i > 7 ? 14 - i : i;
  let rj = j > 7 ? 14 - j : j;
  if (ri > rj) {
    let tmp = ri;
    ri = rj;
    rj = tmp;
  }

  if ((ri === 0 && rj === 0) || (ri === 0 && rj === 7)) {
    return <div key={j} style={tripleWordStyle}> {'TW'} </div>;
  }

  if (
    (ri === 0 && rj === 3) || 
    (ri === 2 && rj === 6) || 
    (ri === 3 && rj === 7) || 
    (ri === 6 && rj === 6)
  ) {
    return <div key={j} style={doubleLetterStyle}> {'DL'} </div>;
  }

  if ((ri === 1 && rj === 5) || (ri === 5 && rj === 5)) {
    return <div key={j} style={tripleLetterStyle}> {'TL'} </div>;
  }

  if (ri === rj) {
    return <div key={j} style={doubleWordStyle}> {'DW'} </div>;
  }

  return <div key={j} style={defaultCellStyle}> {''} </div>;
}

function Board() {
  let boardString = '         word';
  while (boardString.length < 15 * 15) {
    boardString += ' ';
  }

  let board = stringToBoard(boardString);

  const boardContainerStyle = {
    maxWidth: '600px', // Set a maximum width for the board container
    margin: '0 auto', // Center the board container horizontally
  };

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(15, 1fr)',
    alignItems: 'center', // Center the board horizontally
    justifyContent: 'center', // Center the board vertically
  };

  return (
    <div style={boardContainerStyle}>
      <div style={boardStyle}>
        {board.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((l, j) => BoardCell(i, j, l))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Rack() {
  let rackString = 'letters';

  let rack = [...rackString];

  const cellStyle = {
    border: '1px solid #000',
    textAlign: 'center',
    width: '30px',
    height: '30px',
    margin: '4px',
    backgroundColor: '#ffe5bd',
  };

  const rackStyle = {
    display: 'flex',
    alignItems: 'center', // Center the rack horizontally
    justifyContent: 'center', // Center the rack vertically
  };

  return (
    <div style={rackStyle}>
      {rack.map((letter, colIndex) => (
        <div key={colIndex} style={cellStyle}>
          {letter}
        </div>
      ))}
    </div>
  );
}

function BoardView() {
  const boardViewStyle = {
    background: '#222', // Dark background color
    padding: '20px', // Add some padding for spacing
  };

  return (
    <div className="board-view" style={boardViewStyle}>
      <Board />
      <br />
      <Rack />
    </div>
  );
}


export default BoardView;
