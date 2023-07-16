import { defineStore } from 'pinia';
import { Deck } from 'utils';

export const useDeckStore = defineStore(
  'deck',
  () => {
    const deck = ref<Deck | null>();
    const decks = ref<Deck[]>([]);
    const deckCookie = useCookie<Deck | null>('deck');
    const decksCookie = useCookie<Deck[]>('decks');

    const setDeck = (newDeck: Deck | null) => {
      deckCookie.value = newDeck;
      deck.value = newDeck;
    };

    const getDeck = () => {
      return deck.value || deckCookie.value;
    };

    const addToDecks = (deck: Deck) => {
      decksCookie.value = [...decksCookie.value, deck];
      decks.value = [...decks.value, deck];
    };

    const removeFromDecks = (deck: Deck) => {
      decksCookie.value.splice(
        decks.value.findIndex((d) => d.name === deck.name),
        1
      );
      decks.value.splice(
        decks.value.findIndex((d) => d.name === deck.name),
        1
      );
    };

    const getDeckByName = (name: string) => {
      return decks.value.find((deck) => deck.name === name) || decksCookie.value.find((deck) => deck.name === name);
    };

    const getDecks = () => {
      return decks.value.length ? decks.value : decksCookie.value;
    };

    return {
      getDeck,
      setDeck,
      addToDecks,
      removeFromDecks,
      getDeckByName,
      getDecks,
    };
  },
  {
    persist: true,
  }
);
