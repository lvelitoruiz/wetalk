<script setup>
const { $msal } = useNuxtApp();

async function login() {
    // console.log($msal().signIn(), 'login')
    await $msal().signIn();
    // await $msal().acquireTokenSilent()
}

async function logoutPopup() {
    // await $msal().signOut();
        console.log($msal().getAccounts())
        console.log($msal().isAuthenticated())
        console.log($msal().acquireTokenSilent())
    // console.log($msal().signOut('ef14064f-69bf-4ba5-8501-f8847ad654f9'), 'logout')
    // await $msal().signOut('ef14064f-69bf-4ba5-8501-f8847ad654f9')
}
</script>
<template>
    <div class="flex gap-4 mx-auto w-[400px] my-10">
        <button type="submit"
            class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            @click="login">
            <span>Login con Microsoft 365</span>
        </button>
        <button type="submit"
            class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            @click="logoutPopup">
            <span>Logout</span>
        </button>
    </div>
</template>
<style lang="scss" scoped>
</style>