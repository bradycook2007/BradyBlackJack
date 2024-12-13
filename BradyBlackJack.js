// Define the deck of cards
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const deck = [];

// 4 copies of each card value (no suits included)
for (let i = 0; i < 4; i++) {
  values.forEach(value => deck.push(value));
}

// Shuffle function 
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }
}

//Function to calculate the score
function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;

  hand.forEach(card => {
    if (['J', 'Q', 'K'].includes(card)) {
      score += 10;
    } else if (card === 'A') {
      score += 11;
      aceCount++;
    } else {
      score += parseInt(card);
    }
  });

  // Adjust for aces if the score exceeds 21
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}

//  the dealer's turn
function dealerTurn(dealerHand) {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop()); // Dealer hits until they reach 17
  }
}

// Function to play a round of Blackjack
function playBlackjack() {
  // Shuffle the deck before starting
  shuffleDeck();

  // Deal initial cards
  const userHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];

  // Display the user's and dealer's hands
  console.log(`Your hand: ${userHand.join(', ')} (Score: ${calculateScore(userHand)})`);
  console.log(`Dealer's hand: ${dealerHand[0]}, ?`);

  // User's turn
  let userScore = calculateScore(userHand);
  let userDecision;
  while (userScore < 21) {
    userDecision = prompt("Do you want to hit or stand? (hit/stand)");

    if (userDecision.toLowerCase() === 'hit') {
      userHand.push(deck.pop());
      userScore = calculateScore(userHand);
      console.log(`You drew a ${userHand[userHand.length - 1]}. Your new hand: ${userHand.join(', ')} (Score: ${userScore})`);
    } else if (userDecision.toLowerCase() === 'stand') {
      break;
    } else {
      console.log("please choose 'hit' for hit or 'stand' for stand.");
    }
  }

  // Check if user busted
  if (userScore > 21) {
    console.log("You busted! Dealer wins.");
    return;
  }

  // Dealer's turn
  console.log(`Dealer's hand: ${dealerHand.join(', ')} (Score: ${calculateScore(dealerHand)})`);
  dealerTurn(dealerHand);
  const dealerScore = calculateScore(dealerHand);

  // Determine the winner
  if (dealerScore > 21) {
    console.log("Dealer busted! You win.");
  } else if (userScore > dealerScore) {
    console.log("You win!");
  } else if (userScore < dealerScore) {
    console.log("Dealer wins.");
  } else {
    console.log("It's a tie!");
  }
}

// Play the game
playBlackjack();