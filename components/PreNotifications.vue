<script setup ts>
import { useMenuStore } from "../stores/menu";
import { watchEffect, defineEmits } from "vue";

const notifications = ref(null);

const emit = defineEmits(['close']);

const menuStore = useMenuStore();

watchEffect(async () => {
    const notifData = menuStore.getNotificationItems;
    if (notifData) {
        notifications.value = notifData;
    }
});

function closeNotifications() {
  emit('close');
}
</script>
<template>
    <div class="absolute left-[-25px] top-[70px]">
        <div class="ml-[25px] triangulo-up"></div>
        <div class="bg-white relative rounded-lg px-6 py-4 shadow-[0_0_20px_0_rgba(77,39,37,0.25)] min-w-[312px]">
            <p class="text-sm text-[#191919] mb-2">Tienes nuevas notificaciones</p>
            <div class="flex items-center gap-2">
                <div v-for="(notification, index) in notifications"
                    class="p-1 flex items-center gap-1 rounded cursor-pointer"
                    :class="{ 'bg-[#FFF4AA]': index % 2 === 0, 'bg-[#F0B27C]': index % 2 !== 0 }">
                    <i class="text-[#554A00] text-xs icon-book-open"></i>
                    <span class="text-[#554A00] text-xs leaning-none">{{ notification.category }} ({{ notification.count
                    }})</span>
                </div>


                <!-- <div class="bg-[#FFF4AA] p-1 flex items-center gap-1 rounded cursor-pointer">
                    <i class="text-[#554A00] text-xs icon-book-open"></i>
                    <span class="text-[#554A00] text-xs leaning-none">Mi curso (1)</span>
                </div>
                <div class="bg-[#F0B27C] p-1 flex items-center gap-1 rounded cursor-pointer">
                    <i class="text-[#803900] text-xs icon-book-open"></i>
                    <span class="text-[#803900] text-xs leaning-none">Networking (1)</span>
                </div> -->
            </div>
            <i class="text-[#35158C] absolute right-6 top-4 text-xs icon-book-open cursor-pointer"
                @click="closeNotifications"></i>
    </div>
</div></template>