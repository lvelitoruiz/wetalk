<script setup>
 const { $msal } = useNuxtApp();



async function logout() {
       if($msal().isAuthenticated()){
           await $msal().signOut($msal().getAccounts()[0]?.homeAccountId)
       }
}
</script>
<template>
    <button @click="logout"> Cerrar sesión</button>
</template>
