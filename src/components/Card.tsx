import { type FC } from 'react';
import type { Card as CardType } from '../types/shanghai';

interface Props {
  card: CardType;
  onClick?: () => void;
  className?: string;
}

export const Card: FC<Props> = ({ card, onClick, className }) => {
  const isRed = card.suit === 'Hearts' || card.suit === 'Diamonds';
  
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'Spades': return '♠';
      case 'Hearts': return '♥';
      case 'Diamonds': return '♦';
      case 'Clubs': return '♣';
      default: return '★';
    }
  };

  return (
    <div 
      className={`playing-card ${card.isJoker ? 'joker' : ''} ${isRed ? 'red' : ''} ${className || ''}`}
      onClick={onClick}
    >
      <div className="rank">{card.rank === 'Joker' ? 'JK' : card.rank}</div>
      <div className="suit" style={{ textAlign: 'center' }}>
        {getSuitSymbol(card.suit)}
      </div>
      <div className="rank" style={{ transform: 'rotate(180deg)' }}>
        {card.rank === 'Joker' ? 'JK' : card.rank}
      </div>
    </div>
  );
};
