import { deckStringToDeck } from '@/utils';
import { useDeckStore } from 'stores/deck';

export function useDeckBuilder() {
  //
  const parseDeckFromYdk = (file: File) => {
    const fileReader = new FileReader();
    const name = file.name;
    fileReader.readAsText(file);
    fileReader.onload = () => {
      console.log('--->', fileReader.result);
      const deck = deckStringToDeck(fileReader.result as string, name);
      console.log('🚀 ~ file: useDeckBuider.ts:13 ~ parseDeckFromYdk ~ deck:', deck);
    };

    return true;
  };

  return {
    parseDeckFromYdk,
  };
}
