import React, { useState, useEffect } from 'react';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  const addPlayer = (name, score) => {
    const newPlayer = { name, score };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  return (
    <div className="score-board">
      <h2>Tabla de Puntuaciones</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}: {player.score} puntos</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
