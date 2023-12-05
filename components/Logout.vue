<script setup>
 const { $msal, $config, $router } = useNuxtApp();
 const userStore = useUserStore();



async function logout() {
    if($config.public.stage != 'prod') {
        localStorage.clear();
        location.reload();
        // setTimeout(function(){
        //     navigateTo("/login", { replace: true });
        // }, 2000)
        
        // navigateTo("/", { replace: true });
    } else {
        if($msal().isAuthenticated()){
            await $msal().signOut($msal().getAccounts()[0]?.homeAccountId)
        }
    }

}
</script>
<template>
    <button @click="logout"> Cerrar sesión</button>
</template>
