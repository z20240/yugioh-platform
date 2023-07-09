<script lang="ts" setup>
const { signWithGoogle, signWithEmail } = useFirebaseClient();
const email = ref("");
</script>

<template>
  <div>Login</div>
  <button @click="signWithGoogle">Login with Google</button>

  <hr />

  <input type="email" v-model="email" />
  <button @click="signWithEmail(email)">Login with email</button>
</template>

<style scoped></style>
