<script setup>
//  import { logout } from '../utils/authHeaders';
const { $msal} = useNuxtApp();
const $config = useRuntimeConfig();

const logout = async ()=> {
    if($config.public.stage != 'prod') {
        localStorage.clear();
        location.reload();
    } 
      
    if($msal().isAuthenticated()){
        await $msal().signOut($msal().getAccounts()[0]?.homeAccountId)
    }
}


    
</script>
<template>
    <button @click="logout"> Cerrar sesión</button>
</template>
