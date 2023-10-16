<script setup>
 const { $msal } = useNuxtApp();

 async function logout() {
    // await $msal().signOut();
        console.log($msal().getAccounts())
        console.log($msal().isAuthenticated())
        console.log($msal().acquireTokenSilent())
        // await $msal().signOut('67287b0b-38a4-4201-b19a-b5c1906b2001')
    // console.log($msal().signOut('ef14064f-69bf-4ba5-8501-f8847ad654f9'), 'logout')
    // await $msal().signOut('ef14064f-69bf-4ba5-8501-f8847ad654f9')
}
</script>
<template>
    <div>
        <p class="text-center mt-[20px]">Validando Sesión</p>
        <div class="flex items-center w-full justify-center mt-5">
            <button type="submit"
            class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            @click="logout">
            <span>Cerrar sesión</span>
            </button>
        </div>
    </div>
</template>
