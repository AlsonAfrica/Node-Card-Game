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
        <div className="card-front">
          <img src={card.image}  className="card-image" />
        </div>
        <div className="card-back">
          <span className="card-number">{card.value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;



