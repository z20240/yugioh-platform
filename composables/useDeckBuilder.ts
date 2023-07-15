import { Deck, deckStringToDeck, parseURL, toURL } from '@/utils';
import { useDeckStore } from '@/stores/deck';

enum ShareOptionKey {
  CopyToUrl = 'copyToUrl',
  SaveAsImage = 'saveAsImage',
  SaveAsPdf = 'saveAsPdf',
}
export const shareDeckOptions = [
  { name: '複製牌組碼', icon: 'link', value: ShareOptionKey.CopyToUrl },
  { name: '存成圖片', icon: 'photo', value: ShareOptionKey.SaveAsImage },
  { name: '存成 pdf', icon: 'weapp-qrcode', value: ShareOptionKey.SaveAsPdf },
];

const shareAction = {
  [ShareOptionKey.CopyToUrl]: (deck: Deck) => {
    const url = toURL(deck);
    navigator.clipboard.writeText(url);
    console.log('🚀 ~ file: useDeckBuilder.ts:14 ~ url:', url);
    showSuccessToast('牌組碼複製成功! 已複製到剪貼簿');
  },
  [ShareOptionKey.SaveAsImage]: (deck: Deck) => {},
  [ShareOptionKey.SaveAsPdf]: (deck: Deck) => {},
};

export function useDeckBuilder() {
  const { setDeck, getDeck } = useDeckStore();
  const deck = computed(() => getDeck());

  const handleFilePreProcess = (file: any) => {
    if (!(file as File).name.includes('.ydk')) {
      showFailToast('上傳失敗 (非 ydk 檔)');
      return false;
    }

    return parseDeckFromYdk(file as File);
  };

  const parseDeckFromYdk = (file: File) => {
    const fileReader = new FileReader();
    const name = file.name;
    fileReader.readAsText(file);
    fileReader.onload = () => {
      const deck = deckStringToDeck(fileReader.result as string, name);
      setDeck(deck);
    };

    return true;
  };

  const parseDeckFromYdke = (str: string) => {
    const deck = parseURL(str);
    setDeck(deck);
    return deck;
  };

  const handleShareSelect = (option: { name: string; icon: string; value: ShareOptionKey }) => {
    console.log('🚀 ~ file: useDeckBuilder.ts:42 ~ handleShareSelect ~ option:', option);
    shareAction[option.value](deck.value as Deck);
  };

  return {
    deck,
    setDeck,
    handleFilePreProcess,
    parseDeckFromYdke,
    handleShareSelect,
  };
}
