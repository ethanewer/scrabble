import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import axios from 'axios';

  function StatusBar() {
    const navigate = useNavigate();
    const { setLoggedIn, setAccountName, setAccountEmail } = useContext(AppContext);

    function handleLogout() {
      setLoggedIn(false);
      setAccountName('');
      setAccountEmail('');
      navigate('/login');
    };

    return (
      <div className="status-bar d-flex justify-content-between align-items-center bg-dark text-light p-2">
        <div>Status Bar</div>
        <button type='submit' className='btn btn-success w-10 rounded-0' onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  function GameTable() {
    const { accountEmail } = useContext(AppContext);
    const [games, setGames] = useState([]);
  
    useEffect(() => {
      // Make a GET request to fetch games
      axios.get(`http://localhost:3001/games?email=${accountEmail}`)
        .then(response => {
          setGames(response.data);
        })
        .catch(error => {
          console.error('Error fetching games:', error);
        });
    }, [accountEmail]); // re-fetch when email changes
  
    return (
      <div className="game-table d-flex flex-column justify-content-center align-items-center w-75 mb-5">
        <h2 className="mb-3">Your Games</h2>
        <ul className="d-flex justify-content-around flex-wrap w-75">
          {games.map(game => (
            <div key={game._id}>{`${game.email1} vs ${game.email2}`}</div>
          ))}
        </ul>
      </div>
    );
  }

  function NewGameButton() {
    const { accountEmail } = useContext(AppContext);
    console.log(accountEmail)
    function newGame() {
      axios.post('http://localhost:3001/newgame', { email1: accountEmail, email2: 'test@email.com' })
        .catch(err => console.log(err));
    }

    return <button className="btn btn-success new-game-button" onClick={newGame}>New Game</button>
  };

function Home() {
  const { isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="home-page">
      <StatusBar />
      <div className="d-flex flex-column justify-content-center align-items-center vw-100 mt-5">
        <GameTable />
        <NewGameButton />
      </div>
    </div>
  );
}

export default Home;