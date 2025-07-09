import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function HoldOrShowWireframe() {
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
    <div className="flex flex-col items-center p-4 min-h-screen bg-amber-100 font-sans">
      <h1 className="text-2xl font-bold mb-4">Hold or Show</h1>

      <div className="flex justify-between w-full max-w-md mb-2">
        <div>
          <h2 className="text-sm text-center">Discard Pile</h2>
          <div className="flex gap-1">
            {discardPile.slice(-2).map((card) => (
              <div key={card.id} className="w-12 h-16 border rounded bg-white flex items-center justify-center">
                {card.value}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm text-center">Draw</h2>
          <div className="w-12 h-16 border rounded bg-gray-300 flex items-center justify-center">
            🂠
          </div>
        </div>
      </div>

      <div className="my-4">
        <p className="italic">Hmm... I might go for it...</p>
      </div>

      <div className="flex gap-2 mb-4">
        {hand.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-14 h-20 border-2 rounded flex items-center justify-center cursor-pointer ${
              selectedCardId === card.id ? 'border-red-500 bg-white' : 'border-gray-400 bg-white'
            }`}
          >
            {card.value}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button className="bg-orange-400 text-white" onClick={() => alert('Show logic here')}>Show</Button>
        <Button className="bg-blue-700 text-white" onClick={handleDrawFromDiscard}>Draw from Discard</Button>
        <Button className="bg-green-700 text-white" onClick={handleDrawFromDeck}>Draw from Deck</Button>
      </div>

      <div className="mt-4 text-sm">Hand Total: {calculateHandValue(hand)}</div>
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
