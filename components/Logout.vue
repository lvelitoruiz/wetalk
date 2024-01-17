<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/await-thenable -->
<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -->
<script setup>
import { useNuxtApp } from '#app';

const { $msal } = useNuxtApp();
const $config = useRuntimeConfig();

const logout = async () => {
  if ($config.public.stage !== 'prod') {
    localStorage.clear();
    location.reload();
  }

  if ($msal().isAuthenticated()) {
    await $msal().signOut($msal().getAccounts()[0]?.homeAccountId);
  }
};
</script>
<template>
  <button @click="logout">Cerrar sesión</button>
</template>
