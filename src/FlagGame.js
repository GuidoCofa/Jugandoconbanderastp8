import React, { useState, useEffect } from 'react';
import './FlagGame.css';

const FlagGame = ({ playerName, onNextPlayer }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const spanishCountries = data.map(country => ({
          name: country.translations.spa.common,
          flag: country.flags.png
        }));
        setCountries(spanishCountries);
        selectRandomCountry(spanishCountries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleIncorrectGuess();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCountry]);

  const selectRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setSelectedCountry(countries[randomIndex]);
    setTimeLeft(15);
    setHint('');
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      setScore(score + 10 + timeLeft);
    } else {
      setScore(score - 1);
    }
    setGuess('');
    setAttempts(attempts + 1);
    if (attempts + 1 >= 10) {
      setGameOver(true);
    } else {
      selectRandomCountry(countries);
    }
  };

  const handleHint = () => {
    const firstLetter = selectedCountry.name.charAt(0);
    const lastLetter = selectedCountry.name.charAt(selectedCountry.name.length - 1);
    setHint(`${firstLetter}...${lastLetter}`);
    setTimeLeft(timeLeft - 2);
  };

  const handleIncorrectGuess = () => {
    setScore(score - 1);
    setAttempts(attempts + 1);
    if (attempts + 1 >= 10) {
      setGameOver(true);
    } else {
      selectRandomCountry(countries);
    }
  };

  const handleNextPlayer = () => {
    onNextPlayer();
  };

  return (
    <div className="flag-game">
      {!gameOver ? (
        <>
          <h1>Bienvenido, {playerName}!</h1>
          <div className="flag-container">
            <img src={selectedCountry?.flag} alt="Bandera del país" className="flag-image" />
          </div>
          <div className="input-container">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Adivina el país"
            />
            <button onClick={handleGuess}>Enviar</button>
            <button onClick={handleHint}>Pista</button>
          </div>
          {hint && <p>Pista: {hint}</p>}
          <p>Tiempo restante: {timeLeft}s</p>
          <p>Puntuación: {score}</p>
          <p>Banderas restantes: {10 - attempts}</p>
        </>
      ) : (
        <div className="final-score">
          <h1>Juego Terminado</h1>
          <p>Puntuación Final: {score}</p>
          <button onClick={handleNextPlayer}>Siguiente Jugador</button>
        </div>
      )}
    </div>
  );
};

export default FlagGame;
