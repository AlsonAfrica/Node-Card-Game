import React, { useState, useEffect } from 'react';
import Card from './card';
import "../Styles/gameBoard.css";
import Modal from './winPopup';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch cards
  const fetchCards = async () => {
    const res = await fetch('http://localhost:5000/api/cards');
    const data = await res.json();
    setCards(data.map(card => ({ ...card, isMatched: false })));
  };

  // Fetch cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  // Handle card click
  const handleClick = (card) => {
    if (flippedCards.length === 2 || card.isMatched || flippedCards.includes(card)) return;
    setFlippedCards(prev => [...prev, card]);
  };

  // Check for matching cards
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.value === secondCard.value) {
        setCards(prev =>
          prev.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  // Reset the game
  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs(0);
    fetchCards(); // Fetch new cards to reshuffle the deck
  };

  useEffect(()=>{
    if(matchedPairs === 18){
      setShowModal(true);
    }
  }, [matchedPairs]);

  const handleCloseModal = () =>{
    setShowModal(false);
    resetGame();
  }

  return (
    <div className="game-container">
      {/* User Panel at the Top */}
      <div className="user-panel">
        <div className="game-info">
          <h2>Card Matching Game</h2>
          <p>Score: {matchedPairs} / 18</p>
        </div>
        <div className="user-actions">
          <button onClick={resetGame}>Reset Game</button>
          <div className="user-image">
            <img src="/default-user.png" alt="User" className="user-img" />
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="game-board">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            isFlipped={flippedCards.includes(card)}
            isMatched={card.isMatched}
          />
        ))}
      </div>

      {/* Game Win Message */}
      {showModal && <Modal message="You Won The Game!" onClose={handleCloseModal}/>}
    </div>
  );
};

export default GameBoard;
