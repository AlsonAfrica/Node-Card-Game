// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Define your card data with images
const cardImages = [
  { value: 1, image: '/images/card1.png' },
  { value: 2, image: '/images/card2.png' },
  { value: 3, image: '/images/card3.png' },
  { value: 4, image: '/images/card4.png' },
  { value: 5, image: '/images/card5.png' },
  { value: 6, image: '/images/card6.png' },
  { value: 7, image: '/images/card7.png' },
  { value: 8, image: '/images/card8.png' },
  { value: 9, image: '/images/card9.png' },
  { value: 10, image: '/images/card10.png' },
  { value: 11, image: '/images/card11.png' },
  { value: 12, image: '/images/card12.png' },
  { value: 13, image: '/images/card13.png' },
  { value: 14, image: '/images/card14.png' },
  { value: 15, image: '/images/card15.png' },
  { value: 16, image: '/images/card16.png' },
  { value: 17, image: '/images/card17.png' },
  { value: 18, image: '/images/card18.png' }
];

// Example route to get game data
app.get('/api/cards', (req, res) => {
  // Create an array of card values (18 pairs) and shuffle them
  const values = cardImages.map(card => card.value).flat();
  const cards = [...values, ...values].sort(() => Math.random() - 0.5);

  // Map to include image data
  const shuffledCards = cards.map(value => {
    const cardData = cardImages.find(card => card.value === value);
    return {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      value,
      image: cardData.image
    };
  });

  res.json(shuffledCards);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
