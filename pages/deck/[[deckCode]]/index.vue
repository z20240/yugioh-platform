<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useDeckBuilder, shareDeckOptions } from '@/composables/useDeckBuilder';
const route = useRoute();
const { user } = useUserStore();
const { handleFilePreProcess, parseDeckFromYdke, deck, setDeck, handleShareSelect } = useDeckBuilder();

const deckCode = route.params.deckCode as string | undefined;
if (deckCode) parseDeckFromYdke(deckCode);

enum ImportMethodOptionKey {
  uploadYDK = 'upload_ydk',
  importFormMine = 'import_from_mine',
}

const importMethodOption = ref([
  { text: '從.ydk檔匯入', value: ImportMethodOptionKey.uploadYDK },
  { text: '建立牌組', value: ImportMethodOptionKey.importFormMine },
]);

if (user) importMethodOption.value.push({ text: '載入我的牌組', value: ImportMethodOptionKey.importFormMine });

const getDeckMethod = ref(ImportMethodOptionKey.uploadYDK);
const deckUrl = ref('');
const showShare = ref(false);
</script>

<template>
  <van-nav-bar title="牌組" />

  <van-dropdown-menu active-color="#ee0a24">
    <van-dropdown-item v-model="getDeckMethod" :options="importMethodOption" @change="setDeck(null)" />
  </van-dropdown-menu>

  <van-grid v-if="!deck" :column-num="1" class="empty-panel">
    <van-grid-item>
      <van-uploader
        v-if="getDeckMethod === ImportMethodOptionKey.uploadYDK"
        accept="ydk"
        max-size="2000000"
        max-count="1"
        reupload
        result-type="text"
        :before-read="handleFilePreProcess"
      >
        <van-empty description="empty" />
      </van-uploader>
    </van-grid-item>
  </van-grid>

  <div v-else>
    <van-cell :title="deck.name">
      <template #value>
        <van-space>
          <!-- 儲存 -->
          <van-button type="primary" size="small" plain round>
            <van-icon>
              <span class="iconfont icon-save" />
            </van-icon>
          </van-button>
          <!-- 分享 -->
          <van-button type="primary" size="small" plain round class="mr-2" @click="showShare = true">
            <van-icon name="share-o" />
          </van-button>
          <h2 class="p-0 m-0 truncate">{{ deck.createdBy }}</h2>
        </van-space>
      </template>
    </van-cell>

    <van-space direction="vertical" class="mt-1 deck-list-panel">
      <van-cell-group inset>
        <van-cell :title="`主卡組 (${deck.main.length})`">
          <template #label>
            {{ deck.main }}
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset>
        <van-cell :title="`副卡組 (${deck.side.length})`">
          <template #label> {{ deck.side }} </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset class="mb-12">
        <van-cell :title="`額外卡組 (${deck.extra.length})`">
          <template #label> {{ deck.extra }} </template>
        </van-cell>
      </van-cell-group>
    </van-space>
  </div>

  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="shareDeckOptions"
    @select="
      (option) => {
        handleShareSelect(option);
        showShare = false;
      }
    "
  />
</template>

<style scoped lang="scss">
.empty-panel {
  height: calc(100vh - (46px + 48px + 50px));
  overflow: hidden;
  background-color: $default-background;
}

.deck-list-panel {
  height: calc(100vh - (46px + 48px + 50px + 53px + 44px));
  overflow: scroll;
  background-color: $default-background;
}
</style>
