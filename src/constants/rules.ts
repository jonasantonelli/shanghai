import type { Round } from '../types/shanghai';

export const SHANGHAI_ROUNDS: Round[] = [
  {
    id: 1,
    name: 'Round 1',
    contracts: [{ type: 'Set', count: 3 }, { type: 'Set', count: 3 }],
    description: '2 Sets (3 cards each)'
  },
  {
    id: 2,
    name: 'Round 2',
    contracts: [{ type: 'Set', count: 3 }, { type: 'Run', count: 4 }],
    description: '1 Set (3) & 1 Run (4)'
  },
  {
    id: 3,
    name: 'Round 3',
    contracts: [{ type: 'Run', count: 4 }, { type: 'Run', count: 4 }],
    description: '2 Runs (4 cards each)'
  },
  {
    id: 4,
    name: 'Round 4',
    contracts: [{ type: 'Set', count: 3 }, { type: 'Set', count: 3 }, { type: 'Set', count: 3 }],
    description: '3 Sets (3 cards each)'
  },
  {
    id: 5,
    name: 'Round 5',
    contracts: [{ type: 'Set', count: 3 }, { type: 'Set', count: 3 }, { type: 'Run', count: 4 }],
    description: '2 Sets (3) & 1 Run (4)'
  },
  {
    id: 6,
    name: 'Round 6',
    contracts: [{ type: 'Run', count: 4 }, { type: 'Run', count: 4 }, { type: 'Set', count: 3 }],
    description: '2 Runs (4) & 1 Set (3)'
  },
  {
    id: 7,
    name: 'Round 7',
    contracts: [{ type: 'Run', count: 4 }, { type: 'Run', count: 4 }, { type: 'Run', count: 4 }],
    description: '3 Runs (4 cards each)'
  }
];

export const SCORING = {
  '2-9': 5,
  '10-K': 10,
  'A': 15,
  'Joker': 20
};

export const BUY_LIMIT = 3;
export const BUY_PENALTY = 0; // Per user choice: no extra cards drawn.
