<script lang="ts" setup>
definePageMeta({ layout: "empty" });

const { signWithGoogle, signWithEmail } = useFirebaseClient();
const email = ref("");

const alert = () => showToast("提示");
</script>

<template>
  <div>Login</div>
  <button @click="signWithGoogle">Login with Google</button>
  <van-button type="default" size="small" @click="alert">button</van-button>

  <hr />

  <input type="email" v-model="email" />
  <button @click="signWithEmail(email)">Login with email</button>
</template>

<style scoped></style>
