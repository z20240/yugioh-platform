<script lang="ts" setup>
import { useDeckStore } from '@/stores/deck';
import { useUserStore } from '@/stores/user';
import { useDeckBuilder } from '@/composables/useDeckBuilder';

const OptionKey = {
  uploadYDK: 'upload_ydk',
  importFromUrl: 'import_from_url',
  importFormMine: 'import_from_mine',
};

const dropDownMenu = ref([
  { text: '從 .ydk 檔匯入', value: OptionKey.uploadYDK },
  { text: '載入 url', value: OptionKey.importFromUrl },
  { text: '建立牌組', value: OptionKey.importFormMine },
]);

const { deck } = useDeckStore();
const { user } = useUserStore();
const { parseDeckFromYdk } = useDeckBuilder();

if (user) {
  dropDownMenu.value.push({ text: '載入我的牌組', value: OptionKey.importFormMine });
}

const getDeckMethod = ref(OptionKey.uploadYDK);
</script>

<template>
  <van-nav-bar title="牌組" />

  <van-dropdown-menu active-color="#ee0a24">
    <van-dropdown-item v-model="getDeckMethod" :options="dropDownMenu" />
  </van-dropdown-menu>

  <div v-if="!deck" class="">
    <van-uploader
      v-if="getDeckMethod === OptionKey.uploadYDK"
      accept="ydk"
      upload-icon="back-top"
      max-size="2000000"
      max-count="1"
      reupload
      :before-read="(file) => parseDeckFromYdk(file as File)"
    />
  </div>

  <van-empty v-if="!deck" description="empty" />
</template>

<style scoped></style>
