export type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs' | 'Joker';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'Joker';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  isJoker: boolean;
}

export type ContractType = 'Set' | 'Run';

export interface ContractRequirement {
  type: ContractType;
  count: number; // e.g., 3 cards for a Set, 4 for a Run
}

export interface Round {
  id: number;
  name: string;
  contracts: ContractRequirement[];
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
