// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let cards = [];
let matchedCards = [];
let moves = 0;

// Shuffle and generate card deck
const generateCards = () => {
  const cardValues = Array.from({ length: 18 }, (_, i) => i + 1);
  cards = [...cardValues, ...cardValues]
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({ id: index, value, flipped: false }));
  matchedCards = [];
  moves = 0;
};

// Initialize cards
generateCards();

// Get shuffled cards
app.get('/api/cards', (req, res) => {
  res.json({ cards, moves });
});

// Check if two cards match
app.post('/api/check-match', (req, res) => {
  const { firstCardId, secondCardId } = req.body;

  const firstCard = cards.find(card => card.id === firstCardId);
  const secondCard = cards.find(card => card.id === secondCardId);

  if (!firstCard || !secondCard || firstCard.flipped || secondCard.flipped) {
    return res.status(400).json({ error: 'Invalid cards selected' });
  }

  moves++;

  if (firstCard.value === secondCard.value) {
    // Mark as matched
    firstCard.flipped = true;
    secondCard.flipped = true;
    matchedCards.push(firstCard.id, secondCard.id);

    // Check if game is won
    if (matchedCards.length === cards.length) {
      return res.json({ match: true, gameWon: true, moves });
    }
    return res.json({ match: true, gameWon: false, moves });
  }

  return res.json({ match: false, moves });
});

// Reset the game
app.post('/api/reset', (req, res) => {
  generateCards();
  res.json({ message: 'Game reset', cards, moves });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
