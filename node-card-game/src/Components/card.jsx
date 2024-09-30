// src/components/Card.js
import React from 'react';
import "../Styles/Card.css"

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {isFlipped ? (
        <div className="card-front">{card.content}</div>
      ) : (
        <div className="card-back">?</div> // Display the card as hidden (facedown)
      )}
    </div>
  );
};

export default Card;



