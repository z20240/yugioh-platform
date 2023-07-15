import { Deck } from './constants';
export * from './ydke';
export * from './constants';

export const deckStringToDeck = (strDeck: string, name?: string): Deck => {
  const deckName = name?.split('.ydk')[0];
  const lines = strDeck.split('\n').filter((line) => line);

  let authorLine, createBy;
  if ((authorLine = lines.find((line) => line.includes('#created')))) {
    const match = authorLine?.match(/#created by (.*)/);
    createBy = match?.[1];
  }

  const side = lines.splice(lines.indexOf('!side'), lines.length);
  side.shift();
  const extra = lines.splice(lines.indexOf('#extra'), lines.length);
  extra.shift();
  const main = lines.splice(lines.indexOf('#main'), lines.length);
  main.shift();

  const deck: Deck = {
    name: deckName || 'Untitled',
    createdBy: createBy || 'unknown author',
    main,
    side,
    extra,
  };

  return deck;
};
