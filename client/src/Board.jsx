import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import axios from 'axios';

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


function Board() {
  let boardString = '__________________________cock';
  while (boardString.length < 15 * 15) {
    boardString += '_';
  }
  
  let board = stringToBoard(boardString);

  return (
    <Container>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((letter, colIndex) => (
            <Col key={colIndex} className="cell border border-dark text-center">
              {letter}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default Board;