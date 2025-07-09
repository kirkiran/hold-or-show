import { useState } from 'react';

function App() {
  const [hand, setHand] = useState([
    { id: 1, value: '6♥️' },
    { id: 2, value: '7♦️' },
    { id: 3, value: '9♥️' },
    { id: 4, value: '9♣️' },
  ]);

  const [discardPile, setDiscardPile] = useState([{ id: 5, value: '3♦️' }, { id: 6, value: '3♥️' }]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  const handleDiscard = () => {
    if (selectedCardId) {
      const cardToDiscard = hand.find((card) => card.id === selectedCardId);
      setDiscardPile([...discardPile, cardToDiscard]);
      setHand(hand.filter((card) => card.id !== selectedCardId));
      setSelectedCardId(null);
    }
  };

  const handleDrawFromDeck = () => {
    const newCard = { id: Date.now(), value: '🃏' };
    setHand([...hand, newCard]);
  };

  const handleDrawFromDiscard = () => {
    if (discardPile.length > 0) {
      const topCard = discardPile[discardPile.length - 1];
      setHand([...hand, topCard]);
      setDiscardPile(discardPile.slice(0, -1));
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Hold or Show</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400 }}>
        <div>
          <h3>Discard Pile</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {discardPile.slice(-2).map((card) => (
              <div key={card.id} style={{ width: 40, height: 60, border: '1px solid black', textAlign: 'center' }}>
                {card.value}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Draw</h3>
          <div style={{ width: 40, height: 60, border: '1px solid black', backgroundColor: '#ccc', textAlign: 'center' }}>
            🂠
          </div>
        </div>
      </div>
      <p>Hmm... I might go for it...</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {hand.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              width: 50,
              height: 70,
              border: '2px solid',
              borderColor: selectedCardId === card.id ? 'red' : '#999',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            {card.value}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => alert('Show logic here')}>Show</button>
        <button onClick={handleDrawFromDiscard} style={{ marginLeft: 10 }}>Draw from Discard</button>
        <button onClick={handleDrawFromDeck} style={{ marginLeft: 10 }}>Draw from Deck</button>
        <button onClick={handleDiscard} style={{ marginLeft: 10 }}>Discard</button>
      </div>
      <div style={{ marginTop: 10 }}>Hand Total: {calculateHandValue(hand)}</div>
    </div>
  );
}

function calculateHandValue(hand) {
  return hand.reduce((sum, card) => {
    const value = card.value[0];
    if (value === 'A') return sum + 1;
    if (value === 'J') return sum + 11;
    if (value === 'Q') return sum + 12;
    if (value === 'K') return sum + 13;
    if (!isNaN(parseInt(value))) return sum + parseInt(value);
    return sum;
  }, 0);
}

export default App;
