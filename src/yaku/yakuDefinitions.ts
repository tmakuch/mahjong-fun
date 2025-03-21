import { Hand, Meld, Tile } from '../hand';
import Yaku from '@/yaku/Yaku';

//TODO: -------- one han closed --------
export function isRiichi(hand: Hand): Yaku | null {
  //TODO: riichi has been declared
  //TODO: ippatsu here or separate function?
  //Special condition?
  const name = 'Riichi';

  if (hand.conditions?.isRiichi) {
    return { name, han: 1, occurrences: 1 };
  }
  return null;
}

export function isMenzenTsumo(hand: Hand): Yaku | null {
  const name = 'Menzen tsumo';
  //TODO: win by self-draw on closed hand
  if (
    // hand.conditions?.isTsumo &&
    hand.melds.every((meld: Meld) =>
      meld.tiles.every((tile: Tile) => tile.isConcealed),
    )
  ) {
    return { name, han: 1, occurrences: 1 };
  }

  return null;
}

export function isPinfu(hand: Hand): Yaku | null {
  //TODO: all sequences, pair is not yakuhai, ryanmen wait (open wait) at tenpai
  const name = 'Pinfu';
  const ryanmenRegex = /([^1]\*\d\d)|(\d\d[^9]\*)/g;

  const chowCount = hand.melds.filter(
    (meld: Meld) => meld.type === 'chow',
  ).length;
  const pairCount = hand.melds.filter(
    (meld: Meld) => meld.type === 'pair',
  ).length;
  const isConcealed = hand.melds.every((meld: Meld) => meld.isConcealed);
  const isRyanmenWait = hand.melds.some((meld: Meld) =>
    ryanmenRegex.test(
      meld.tiles
        .map((tile) => `${tile.value}${tile.isLastTile ? '*' : ''}`)
        .join(''),
    ),
  );

  if (chowCount === 4 && pairCount === 1 && isRyanmenWait && isConcealed) {
    return { name, han: 1, occurrences: 1 };
  }
  return null;
}

function isIppeikou() {
  //TODO: two identical sequences
}

//TODO: -------- One han --------
function isHaitei(hand: Hand) {
  //TODO: Haitei raoyue - win by drawing last tile from the wall or last discard (Houtei raoyui)
  //Special condition?
  //May be open
  const name = 'Haitei';
  return hand.conditions?.isHaitei;
}

function isRinshan() {
  //TODO: Rinshan kaihou - win on a tile from the dead wall, win is possible by drawing a tile after a kan
  //Special condition?
  //May be open
}

function isChankan() {
  //TODO: Chankan - Robbing a kan, win by on opponent melding a kan with a tile needed to win
  //May be open
}

export function isTanyao(hand: Hand): Yaku | null {
  //TODO: Tanyao - no 1's, no 9's, no honors
  //May be open, in some rulesets can only be closed
  const name = 'Tanyao';

  const isFreeOfTerminals = hand.melds.every((meld: Meld) =>
    meld.tiles.every((tile) => tile.value !== (1 || 9)),
  );
  const isFreeOfHonors = hand.melds.every(
    (meld: Meld) => meld.suit !== 'wind' && meld.suit !== 'dragon',
  );

  if (isFreeOfTerminals && isFreeOfHonors) {
    return { name, han: 1, occurrences: 1 };
  }
  return null;
}

function isYakuhai() {
  //TODO: Yakuhai - meld of dragons, seat wind or round wind, hand can have multiple of those
}

//TODO: -------- two han --------
function isDoubleRiichi() {
  //TODO: Double Riichi is a riichi on first discard
  //Special condition?
}

function isChanta() {
  //TODO: Chantaiyao - all sets contain at least one terminal or honor
}

function isSanshokuDoujun() {
  const name = 'Sanshoku doujun';

  //TODO: Sanshoku doujun -three sequences with the same numbers
}

function isIttsu() {
  //TODO: Ittsu - one set from 1 to 9 (Straight)
  //May be open - -1 han if open
}

function isToitoi() {
  //TODO: Toitoi - all pons and/or kans
  //May be open
}

function isSanankou() {
  //TODO: Sanankou - three closed pons and/or kans
  //Hand may be open but Sanankou must be closed
}

function isShanshokuDoukou() {
  //TODO: Sanshoku doukou -three triplets or quads with the same number
  //May be open
}

function isSankantsu() {
  //TODO: Sankantsu - three kans open or closed
  //May be open
}

function isChiitoitsu() {
  //TODO: Chitoitsu - seven pairs. For this to work the hand should only be interpreted as seven pairs. Ryanpeikou overrides chitoi as it's a more valuable hand that yields more points.
  //closed only
}

function isHonroutou() {
  //TODO: Honroutou - eash tile is either terminal or honor
}

function isShousangen() {
  //TODO: Shousangen - two pons/kans of dragons and a pair of dragons
}

//TODO: -------- three han --------
function isHonitsu() {
  //TODO: Honitsu - one set with honors (Half flush)
  //May be open, -1 han if open
}

function isJunchan() {
  //TODO: Junchan - teminal in each meld
  //May be open, -1 han if open
}

function isRyanpeikou() {
  //TODO: two sets of ippeikou. Does not combine with chiitoi!!!
}

//TODO -------- five han --------
function isRenho() {
  //TODO: Renho - win on first discard ()
}

function isChinitsu() {
  //TODO: Chinitsu - one suit no honors
  //May be open, +1 han if closed
}

//TODO: -------- yakumans --------
