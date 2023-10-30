<script setup ts>
import { useMenuStore } from "../stores/menu";
import { watchEffect } from "vue";

const notifications = ref(null);
const total = ref(0);

const menuStore = useMenuStore();

watchEffect(async () => {
    const notifData = menuStore.getNotificationItems;
    if (notifData) {
        notifications.value = notifData;
        console.log('information about notifications: ', notifData);
    }

    const totalNotifs = notifications.value.reduce((total, item) => total + item.data.length, 0);
    total.value = totalNotifs;
});

</script>
<template>
    <button class="relative">
        <i class="text-3xl text-[#191919] icon-bell"></i>
        <span
            class="flex items-center justify-center w-[15px] h-[15px] rounded-full bg-[#E50A17] font-bold text-[10px] text-white absolute top-0 right-0">{{ total }}</span>
    </button>
</template>