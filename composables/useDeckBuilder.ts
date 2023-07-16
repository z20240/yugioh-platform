import { Deck, deckStringToDeck, parseURL, toDeckCode } from '@/utils';
import { useDeckStore } from '@/stores/deck';

enum ShareOptionKey {
  ShareToUrl = 'ShareToUrl',
  SaveAsImage = 'saveAsImage',
  SaveAsPdf = 'saveAsPdf',
}

export const shareDeckOptions = [
  { name: '分享URL', icon: 'link', value: ShareOptionKey.ShareToUrl },
  { name: '存成圖片', icon: 'photo', value: ShareOptionKey.SaveAsImage },
  { name: '存成 pdf', icon: 'weapp-qrcode', value: ShareOptionKey.SaveAsPdf },
];

const shareToUrl = (host: string) => (deck: Deck) => {
  const deckCode = toDeckCode(deck);
  const shareUrl = `${host}/deck/${deckCode}`;
  navigator.clipboard.writeText(shareUrl);
  showSuccessToast('URL 已複製到剪貼簿! 趕快分享給朋友吧!');
};

const saveAsPdf = (deck: Deck) => {};

const saveAsImage = (deck: Deck) => {};

export function useDeckBuilder() {
  const url = useRequestURL();
  const { setDeck, getDeck } = useDeckStore();
  const deck = computed(() => getDeck());

  const shareAction = {
    [ShareOptionKey.ShareToUrl]: shareToUrl(url.host),
    [ShareOptionKey.SaveAsImage]: saveAsImage,
    [ShareOptionKey.SaveAsPdf]: saveAsPdf,
  };

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

  const handleShareSelect = (option: { name: string; icon: string; value: ShareOptionKey }) => shareAction[option.value](deck.value as Deck);

  return {
    deck,
    setDeck,
    handleFilePreProcess,
    parseDeckFromYdke,
    handleShareSelect,
  };
}
