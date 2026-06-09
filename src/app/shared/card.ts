/** The four French-deck suits. */
export type Suit = 'diamonds' | 'spades' | 'hearts' | 'clubs';

/** The thirteen pip/court ranks present in every suit. */
export type PipRank =
  | 'ace'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'jack'
  | 'queen'
  | 'king';

/** Every rank that maps to a rule — the pip ranks plus the joker. */
export type RuleRank = PipRank | 'joker';

/**
 * Identifier for a single card. Doubles as the CSS class that positions the
 * card face within the sprite sheet (see `styles/cards.scss`).
 */
export type CardId = `${Suit}_${PipRank}` | 'joker_black' | 'joker_color';

export const SUITS: readonly Suit[] = ['diamonds', 'spades', 'hearts', 'clubs'];

export const PIP_RANKS: readonly PipRank[] = [
  'ace',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'jack',
  'queen',
  'king',
];

/** All rule ranks in display order (joker first, then ace → king). */
export const RANKS: readonly RuleRank[] = ['joker', ...PIP_RANKS];

/** A full 54-card deck: two jokers plus every suit/rank combination. */
export const DECK: readonly CardId[] = [
  'joker_black',
  'joker_color',
  ...SUITS.flatMap((suit) => PIP_RANKS.map((rank) => `${suit}_${rank}` as CardId)),
];

/** A representative card to illustrate each rule rank (used by Rules/Settings). */
export const REPRESENTATIVE_CARD: Readonly<Record<RuleRank, CardId>> = {
  joker: 'joker_black',
  ace: 'spades_ace',
  two: 'spades_two',
  three: 'spades_three',
  four: 'spades_four',
  five: 'spades_five',
  six: 'spades_six',
  seven: 'spades_seven',
  eight: 'spades_eight',
  nine: 'spades_nine',
  ten: 'spades_ten',
  jack: 'spades_jack',
  queen: 'spades_queen',
  king: 'spades_king',
};

/** Maps a card to the rule rank it triggers (both jokers share the joker rule). */
export function rankOf(cardId: CardId): RuleRank {
  if (cardId.startsWith('joker')) {
    return 'joker';
  }
  return cardId.split('_')[1] as PipRank;
}
