import { Deck } from 'stores/deck';

export const deckStringToDeck = (strDeck: string, name?: string): Deck => {
  const lines = strDeck.split('\n');
  const createBy = lines.find((line) => line.startsWith('#created by'));

  const extraCards = lines.splice(lines.indexOf('#extra'), lines.length);
  extraCards.shift();
  const sideCards = lines.splice(lines.indexOf('!side'), lines.length);
  sideCards.shift();
  const mainCards = lines.splice(lines.indexOf('#main'), lines.length);
  mainCards.shift();

  const deck: Deck = {
    name: name || 'Untitled',
    createdBy: createBy || '#created by ...',
    mainCards,
    sideCards,
    extraCards,
  };

  return deck;
};
