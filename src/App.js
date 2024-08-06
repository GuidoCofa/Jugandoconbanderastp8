import React, { useState } from 'react';
import FlagGame from './FlagGame';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, newPlayerName]);
      setNewPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      setGameStarted(true);
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>¡Bienvenidos al Juego de Banderas!</h1>
          <img src="https://i.pinimg.com/originals/f2/c7/f6/f2c7f62b7cfa21d1e92088c855aa3bd4.gif" alt="Welcome gif" className="welcome-gif"/>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Ingresa el nombre del jugador"
          />
          <button onClick={handleAddPlayer}>Agregar Jugador</button>
          <button onClick={handleStartGame} disabled={players.length === 0}>Comenzar Juego</button>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      ) : (
        currentPlayerIndex < players.length ? (
          <FlagGame playerName={currentPlayer} onNextPlayer={handleNextPlayer} />
        ) : (
          <div className="final-screen">
            <h1>¡El juego ha terminado!</h1>
            <p>Gracias por jugar.</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
