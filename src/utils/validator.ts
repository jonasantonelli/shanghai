import type { Card, Rank, ValidationResult } from '../types/shanghai';

const rankToValue = (rank: Rank): number[] => {
  switch (rank) {
    case 'A': return [1, 14];
    case '2': return [2];
    case '3': return [3];
    case '4': return [4];
    case '5': return [5];
    case '6': return [6];
    case '7': return [7];
    case '8': return [8];
    case '9': return [9];
    case '10': return [10];
    case 'J': return [11];
    case 'Q': return [12];
    case 'K': return [13];
    default: return [0]; // Joker is handled separately
  }
};

export const isValidSet = (cards: Card[], requiredCount: number): ValidationResult => {
  if (cards.length < requiredCount) {
    return { isValid: false, errors: [`A set must have at least ${requiredCount} cards.`] };
  }

  const nonJokers = cards.filter(c => !c.isJoker);
  if (nonJokers.length === 0) {
    return { isValid: true, errors: [] }; // All jokers is technically a set
  }

  const rank = nonJokers[0].rank;
  const allSameRank = nonJokers.every(c => c.rank === rank);

  if (!allSameRank) {
    return { isValid: false, errors: ['All cards in a set must be of the same rank.'] };
  }

  return { isValid: true, errors: [] };
};

export const isValidRun = (cards: Card[], requiredCount: number): ValidationResult => {
  if (cards.length < requiredCount) {
    return { isValid: false, errors: [`A run must have at least ${requiredCount} cards.`] };
  }

  const nonJokers = cards.filter(c => !c.isJoker);
  if (nonJokers.length === 0) {
    return { isValid: true, errors: [] }; // All jokers is technically a run
  }

  // Suited check
  const suit = nonJokers[0].suit;
  if (!nonJokers.every(c => c.suit === suit)) {
    return { isValid: false, errors: ['A run must be of the same suit.'] };
  }

  // Sequence check
  // This is tricky because of Jokers and Aces (High/Low).
  // We'll try to find a valid sequence for the given cards.
  
  // Sort non-jokers by rank
  // Since an Ace can be 1 or 14, we need to check both possibilities.
  
  const checkSequence = (targetValues: number[]): boolean => {
    // A sequence is valid if the distance between the smallest and largest 
    // values fits within the card count, and there are no duplicates.
    const sorted = [...new Set(targetValues)].sort((a, b) => a - b);
    if (sorted.length !== targetValues.length) return false; // Duplicate ranks not allowed in a run
    
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    
    // The span of the sequence (max - min + 1) must be <= total cards (including jokers)
    return (max - min + 1) <= cards.length;
  };

  // Generate all possible value sets for non-jokers (handling Aces)
  const nonJokerValues: number[][] = nonJokers.map(c => rankToValue(c.rank));
  
  // Helper to get all combinations
  const getCombinations = (arrays: number[][]): number[][] => {
    return arrays.reduce((acc, curr) => {
      const res: number[][] = [];
      acc.forEach(a => curr.forEach(c => res.push([...a, c])));
      return res;
    }, [[]] as number[][]);
  };

  const combinations = getCombinations(nonJokerValues);
  const hasValidSequence = combinations.some(checkSequence);

  if (!hasValidSequence) {
    return { isValid: false, errors: ['Cards must be in a valid sequence (no wrap-around).'] };
  }

  return { isValid: true, errors: [] };
};
