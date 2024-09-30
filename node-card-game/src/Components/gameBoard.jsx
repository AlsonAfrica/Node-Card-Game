// src/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import Card from './card';
import "../Styles/gameBoard.css"

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Fetch and initialize the cards with their content hidden when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/cards')
      .then((res) => res.json())
      .then((data) => {
        // Initialize cards with flipped state set to false (hidden)
        const initializedCards = data.cards.map((card) => ({
          ...card,
          flipped: false,
        }));
        setCards(initializedCards);
        setMoves(data.moves);
      });
  }, []);

  // Handle card click
  const handleCardClick = (clickedCard) => {
    if (isChecking || flippedCards.length === 2 || flippedCards.includes(clickedCard.id) || clickedCard.flipped) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);

      const [firstCardId, secondCardId] = newFlippedCards;

      fetch('http://localhost:5000/api/check-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstCardId, secondCardId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMoves(data.moves);
          if (data.match) {
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: true } : card
              )
            );
            if (data.gameWon) {
              setGameWon(true);
            }
          } else {
            setTimeout(() => {
              setCards((prevCards) =>
                prevCards.map((card) =>
                  card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card
                )
              );
            }, 1000);
          }
          setFlippedCards([]);
          setIsChecking(false);
        });
    }
  };

  const resetGame = () => {
    fetch('http://localhost:5000/api/reset', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        const resetCards = data.cards.map((card) => ({
          ...card,
          flipped: false, // Make sure to reset all cards to their hidden state
        }));
        setCards(resetCards);
        setMoves(0);
        setFlippedCards([]);
        setGameWon(false);
      });
  };

  return (
    <div>
      <div className="game-info">
        <h2>Moves: {moves}</h2>
        <button onClick={resetGame}>Reset Game</button>
        {gameWon && <h2>Congratulations, You Won!</h2>}
      </div>
      <div className="grid-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlipped={flippedCards.includes(card.id) || card.flipped}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
