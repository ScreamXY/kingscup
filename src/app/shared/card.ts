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

const PIP_RANKS: readonly PipRank[] = [
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

/** A representative card to illustrate a rule rank (used by Rules/Settings). */
function representativeCard(rank: RuleRank): CardId {
  return rank === 'joker' ? 'joker_black' : `spades_${rank}`;
}

/** Every rule rank paired with its representative card, in display order. */
export const RULE_CARDS: readonly { rank: RuleRank; card: CardId }[] = RANKS.map((rank) => ({
  rank,
  card: representativeCard(rank),
}));

function isPipRank(value: string): value is PipRank {
  return PIP_RANKS.some((rank) => rank === value);
}

/** Maps a card to the rule rank it triggers (both jokers share the joker rule). */
export function rankOf(cardId: CardId): RuleRank {
  const [, rank = ''] = cardId.split('_');
  return isPipRank(rank) ? rank : 'joker';
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Human-readable card name for accessible labels, e.g. "King of Spades". */
export function displayName(cardId: CardId): string {
  if (cardId === 'joker_black') {
    return 'Black Joker';
  }
  if (cardId === 'joker_color') {
    return 'Color Joker';
  }
  const [suit = '', rank = ''] = cardId.split('_');
  return `${capitalize(rank)} of ${capitalize(suit)}`;
}
