import { defineStore } from 'pinia';
import { Deck } from 'utils';

export const useDeckStore = defineStore('deck', () => {
  const deck = ref<Deck | null>();
  const decks = ref<Deck[]>([]);

  const setDeck = (newDeck: Deck | null) => {
    deck.value = newDeck;
  };

  const getDeck = () => {
    return deck.value;
  };

  const addToDecks = (deck: Deck) => {
    decks.value.push(deck);
  };

  const removeFromDecks = (deck: Deck) => {
    decks.value.splice(decks.value.indexOf(deck), 1);
  };

  const getDeckByName = (name: string) => {
    return decks.value.find((deck) => deck.name === name);
  };

  const getDecks = () => {
    return decks.value;
  };

  return {
    getDeck,
    setDeck,
    addToDecks,
    removeFromDecks,
    getDeckByName,
    getDecks,
  };
});
