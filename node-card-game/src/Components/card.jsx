// src/components/Card.js
import React from 'react';
import "../Styles/Card.css";

const Card = ({ card, handleClick, isFlipped, isMatched }) => {
  const handleCardClick = () => {
    if (!isFlipped && !isMatched) {
      handleClick(card);
    }
  };

  return (
    <div className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        <div className="card-front">{card.value}</div>
        <div className="card-back">
          <img src={card.image} alt={card.value} className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;




