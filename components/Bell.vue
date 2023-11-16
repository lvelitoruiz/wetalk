<script setup ts>
import { useMenuStore } from "../stores/menu";
import { watchEffect, defineEmits } from "vue";
import { apiUrlAlter } from "../consts";

const notifications = ref(null);
const total = ref(0);
const codUser = localStorage.getItem("codUser")

const emit = defineEmits(['show']);

const menuStore = useMenuStore();

watchEffect(async () => {
    const notifData = menuStore.getNotificationItems;
    let totalNotifs = 0;
    if (notifData) {
        notifications.value = notifData;
        console.log('information about notifications: ', notifData);
    }

    notifications.value.map((item) => {
        totalNotifs += item.count;
    });

    // const totalNotifs = notifications.value.reduce((total, item) => total + item.data.length, 0);
    total.value = totalNotifs;
});

async function showNotifications() {
    emit('show');

    if(total.value > 0) {
        const notificationItems = notifications.value
            .flatMap(notification => notification.data)
            .map(notification => ({
                id: notification.id,
                tipo: notification.tipo
            }));

        const notificationData = {
            codAlumno: codUser,
            notificaciones: notificationItems
        };
        
        const cantidadNotificaciones = total.value - await menuStore.registerNotificationData(apiUrlAlter, notificationData);
        total.value = cantidadNotificaciones;
    }
}

</script>
<template>
    <button class="relative" @click="showNotifications">
        <i class="text-3xl text-[#191919] icon-bell"></i>
        <span v-if="total > 0"
            class="flex items-center justify-center w-[18px] h-[18px] p-1 rounded-full bg-[#E50A17] font-bold text-[10px] text-white absolute top-0 right-0">{{
                total > 9 ? "+9" : total }}</span>
    </button>
</template>