<script setup ts>
import { useMenuStore } from "../stores/menu";
import { watchEffect, defineEmits } from "vue";

const notifications = ref(null);

const emit = defineEmits(["close"]);

const menuStore = useMenuStore();

watchEffect(async () => {
  const notifData = menuStore.getNotificationItems;
  if (notifData) {
    let notifDataMapping = notifData
      .flatMap(({ data }) => data)
      .filter(({ status }) => status)
      .map(({ tipo }) => ({ tipo }));

    //Adding new fields
    notifDataMapping.map((notificacion, _, self) => {
      notificacion.count = self.filter(
        (x) => x.tipo == notificacion.tipo
      ).length;
    });

    // Distinct for unique values
    notifDataMapping = [
      ...new Map(
        notifDataMapping.map((notificacion) => [
          notificacion.tipo,
          notificacion,
        ])
      ).values(),
    ];
    notifications.value = notifDataMapping;
  }
});

function closeNotifications() {
  emit("close");
}
</script>
<template>
  <div class="absolute right-[-25px] xl:left-[-25px] top-[70px]">
    <div class="ml-[25px] triangulo-up"></div>
    <div
      class="bg-white relative rounded-lg px-6 py-4 shadow-[0_0_20px_0_rgba(77,39,37,0.25)] min-w-[312px]"
    >
      <p v-if="notifications.length > 0" class="text-sm text-[#191919] mb-2">
        Tienes nuevas notificaciones
      </p>
      <p v-else class="text-sm text-[#191919] mb-0 font-zizou-bold">
        No tienes nuevas notificaciones
      </p>
      <div class="flex items-center gap-2">
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="p-1 flex items-center gap-1 rounded cursor-pointer"
          :class="{
            'bg-[#FFF4AA]':
              notification.tipo === 'Mis estudios' ||
              notification.tipo === 'NUEVO' ||
              notification.tipo === 'Mis trámites' ||
              notification.tipo === '' ||
              notification.tipo === 'Mi curso',
            'bg-[#EFB3EF]': notification.tipo === 'Pagos',
            'bg-[#F0B27C]': notification.tipo === 'Networking',
            'bg-[#7AD6CF]': notification.tipo === 'Beyond Wetalk',
            'bg-[#CEBDFF]': notification.tipo === 'GENERAL',
          }"
        >
          <i
            class="text-[#554A00] text-xs"
            :class="[
              {
                'icon-book-open':
                  notification.tipo === 'Mis estudios' ||
                  notification.tipo === 'NUEVO' ||
                  notification.tipo === 'Mis trámites' ||
                  notification.tipo === '' ||
                  notification.tipo === 'Mi curso',
                'icon-creditcard': notification.tipo === 'Pagos',
                'icon-user-chat': notification.tipo === 'Networking',
                'icon-puzzle': notification.tipo === 'Beyond Wetalk',
                'icon-home': notification.tipo === 'GENERAL',
              },
            ]"
          ></i>
          <span class="text-[#554A00] hidden lg:block  text-xs leaning-none"
            >{{ notification.tipo || 'General' }} ({{ notification.count }})</span
          >
          <span class="text-[#554A00] lg:hidden  text-xs leaning-none"
            > {{ notification.count }}</span
          >
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
      <i
        class="text-[#35158C] absolute right-6 top-4 text-xs icon-close cursor-pointer"
        @click="closeNotifications"
      ></i>
    </div>
  </div>
</template>