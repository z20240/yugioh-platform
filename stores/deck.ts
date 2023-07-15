import { defineStore } from 'pinia';

export interface Deck {
  name: string;
  createdBy: string;
  mainCards: string[];
  sideCards: string[];
  extraCards: string[];
}

export const useDeckStore = defineStore('deck', () => {
  const deck = ref<Deck>();
  const decks = ref<Deck[]>([]);

  const addDeck = (deck: Deck) => {
    decks.value.push(deck);
  };

  const removeDeck = (deck: Deck) => {
    decks.value.splice(decks.value.indexOf(deck), 1);
  };

  const getDeck = (name: string) => {
    return decks.value.find((deck) => deck.name === name);
  };

  const getDecks = () => {
    return decks.value;
  };

  return {
    deck,
    decks,
    addDeck,
    removeDeck,
    getDeck,
    getDecks,
  };
});
