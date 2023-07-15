<script setup lang="ts">
const TabName = {
  ydk_to_pdf: 'ydk_to_pdf',
  deck_analysis: 'deck_analysis',
  small_world_related: 'small_world_related',
};

const dropDownMenu = ref([
  { text: 'YDK轉PDF比賽表格', value: TabName.ydk_to_pdf },
  { text: '蒙地卡羅展開機率計算器', value: TabName.deck_analysis },
  { text: '微小世界卡片關係網', value: TabName.small_world_related },
]);

const handleChange = (value: string) => {
  console.log(value);
};

const step = ref(0);
const action = ref(TabName.ydk_to_pdf);

const afterRead = (file: any) => {
  console.log(file);
  return true;
};
const beforeRead = (file: any) => {
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = () => {
    console.log('--->', fileReader.result);
  };

  return true;
};
</script>

<template>
  <van-nav-bar title="遊戲王 牌組小工具" />

  <van-steps direction="vertical" :active="step">
    <van-step>
      <h3>載入 ydk 牌組清單 (或從儲存牌組選擇)</h3>

      <van-button @click="step += 1">下一步</van-button>
    </van-step>
    <van-step v-if="step === 1">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="action" :options="dropDownMenu" @change="" />
      </van-dropdown-menu>
    </van-step>
    <van-step v-if="step === 2">
      <h3>快件已发货</h3>
      <p>2016-07-10 09:30</p>
    </van-step>
  </van-steps>
</template>

<style scoped></style>
