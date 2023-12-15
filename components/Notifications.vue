<script setup ts>
import { ref, watchEffect, defineEmits } from "vue";
import { useMenuStore } from "../stores/menu";

const emit = defineEmits(["close"]);

const notifications = ref(null);
const categorizedItems = ref(null);

const finalItems = ref(null);

const generalItems = ref(null);
const personalItems = ref(null);

const menuStore = useMenuStore();

const convert = (element) => {
  let elements = [[], []];

  categorizedItems.value[element][0].map((item) => {
    const antiguedad = item.antiguedad;
    const valor = parseInt(antiguedad);

    if (antiguedad.includes("d")) {
      if (valor > 6) {
        elements[0].push(item);
      } else {
        elements[1].push(item);
      }
    } else if (antiguedad.includes("h") || antiguedad.includes("m")) {
      elements[1].push(item);
    }
  });
  return elements;
};

watchEffect(async () => {
  const notifData = menuStore.getNotificationItems;
  if (notifData) {
    notifData.map((item, index) => {
      if (index === 1) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    notifications.value = notifData;
  }

  let items = {};

  notifications.value.forEach((item) => {
    const category = item.category;
    if (!items[category]) {
      items[category] = [];
    }
    items[category].push(item.data);
  });

  categorizedItems.value = items;

  if (categorizedItems.value["General"].length) {
    generalItems.value = convert("General");
  }

  if (categorizedItems.value["Personal"].length) {
    personalItems.value = convert("Personal");
    finalItems.value = convert("Personal");
  }
});

function closeNotifications() {
  emit("close");
}

const changeItems = (value) => {
  notifications.value.map((item) => {
    if (item.category === value) {
      item.active = true;
    } else {
      item.active = false;
    }
    if (value === "Personal") {
      finalItems.value = personalItems.value;
    } else {
      finalItems.value = generalItems.value;
    }
  });
  if(dataLayer){
        dataLayer.push({
            event: 'Evento_Click_Category_Notification',
            'name': 'Click_Category_Notification',
            'categoria': value,
        })
    }
};

const eventClickCardNotification = (text, type, titulo, url, id, campania, registros, poblacion) => {
    if(dataLayer){
        dataLayer.push({
            event: 'Click_Card_Notification',
            'name': 'Evento_Click_Card_Notification',
            'text': text,
            'type': type,
            'titulo': titulo,
            'url': url,
            'id': id,
            'codCampania': campania,
            'registrosTotales': registros,
            'poblacionFija': poblacion
        })
    }
};
</script>
<template>
  <div class="fixed top-[68px] lg:absolute lg:left-[-40px] lg:top-[70px] z-50 left-[0]">
    <div class="hidden lg:block lg:ml-[40px] ml-[180px] triangulo-up z-10"></div>
    <div
      class="bg-white relative rounded-none lg:rounded-lg py-4 lg:shadow-[0_0_20px_0_rgba(77,39,37,0.25)] min-h-screen lg:min-h-[40px] min-w-[249px] w-screen lg:min-w-[390px] lg:max-w-[400px]">
      <div class="px-4 py-2 flex items-center justify-between">
        <p class="font-medium text-[#191919] text-base font-zizou-bold">
          Notificaciones
        </p>
        <i class="text-[#35158C] text-xs icon-close cursor-pointer leading-none" @click="closeNotifications"></i>
      </div>
      <div class="flex items-center gap-3 px-4 py-2">
        <div v-for="(notification, index) in notifications.slice().reverse()" :key="index">
          <div class="rounded-full flex items-center gap-1 cursor-pointer" :class="[
            {
              'bg-[#E50A17] px-4 py-1 text-white': notification.active,
              'border border-[#191919] px-4 py-1 text-[#191919]':
                !notification.active,
            },
          ]" @click="changeItems(notification.category)">
            <p class="text-xs font-bold uppercase font-solano">
              {{ notification.category }}
            </p>
            <p class="rounded-full w-[18px] h-[18px] flex items-center justify-center" :class="[
              {
                'bg-[#E50A17]': !notification.active,
                'bg-[#fff]': notification.active,
              },
            ]">
              <span class="font-medium text-sm" :class="[
                {
                  'text-[#E50A17]': notification.active,
                  'text-[#fff]': !notification.active,
                },
              ]">{{ notification.count }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="black-scroll overflow-y-auto max-h-[350px]">
        <div v-if="finalItems !== null">
          <p v-if="finalItems[1].length > 0" class="uppercase text-[#191919] text-sm font-bold px-4 py-2 font-solano">
            Esta semana
          </p>
          <div v-for="item in finalItems[1]" :key="item">
            <div @click="eventClickCardNotification(item.mensaje, item.tipo, item.titulo, item.url, item.id, item.codigo_campania, item.registros_totales, item.poblacion_fija)" class="py-2 flex items-center px-4 cursor-pointer gap-5 border-b border-white"
              :class="{ 'bg-[#D7E9FB]': item.status }">
              <span class="min-w-[12px] min-h-[12px] bg-[#E50A17] rounded-full"></span>
              <div>
                <p class="text-sm mb-1">{{ item.mensaje }}</p>
                <div class="flex items-center gap-1">
                  <div class="p-1 flex items-center gap-1 rounded cursor-pointer" :class="[
                    {
                      'bg-[#FFF4AA] text-[#554A00]':
                        item.tipo === 'Mis estudios' ||
                        item.tipo === 'NUEVO' ||
                        item.tipo === 'Mis trámites' ||
                        item.tipo === 'Mi curso',
                      'bg-[#EFB3EF] text-[#8F00A8]':
                        item.tipo === 'Pagos' || item.tipo === 'Mis finanzas',
                      'bg-[#F0B27C] tetx-[#803900]':
                        item.tipo === 'Networking' ||
                        item.tipo === 'Reservas',
                      'bg-[#7AD6CF] text-[#135D59]':
                        item.tipo === 'Beyond Wetalk' ||
                        item.tipo === 'Eventos',
                      'bg-[#CEBDFF] text-[#5624E0]':
                        item.tipo === 'General' ||
                        item.tipo === 'Informativos' ||
                        item.tipo === 'App',
                    },
                  ]">
                    <i class="text-sm" :class="[
                      {
                        'icon-book-open':
                          item.tipo === 'Mis estudios' ||
                          item.tipo === 'NUEVO' ||
                          item.tipo === 'Mis trámites' ||
                          item.tipo === 'Mi curso',
                        'icon-creditcard': item.tipo === 'Pagos',
                        'icon-user-chat': item.tipo === 'Networking',
                        'icon-puzzle': item.tipo === 'Beyond Wetalk',
                        'icon-general': item.tipo === 'General',
                      },
                    ]"></i>
                    <span class="text-xs font-publicSans font-medium leaning-none">{{
                      item.tipo
                    }}</span>
                  </div>
                  <span class="text-[#0043AA] text-xs">•</span>
                  <p class="text-[#0043AA] text-xs">
                    Hace {{ item.antiguedad }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p v-if="finalItems[0].length > 0" class="uppercase text-[#191919] text-sm font-bold px-4 py-2 font-solano">
            Anteriores
          </p>
          <div v-for="item in finalItems[0]" :key="item">
            <div @click="eventClickCardNotification(item.mensaje, item.tipo, item.titulo, item.url, item.id, item.codigo_campania, item.registros_totales, item.poblacion_fija)" class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5 border-b border-white">
              <span class="min-w-[12px] min-h-[12px] bg-[#E50A17] rounded-full"></span>
              <div>
                <p class="text-sm mb-1">{{ item.mensaje }}</p>
                <div class="flex items-center gap-1">
                  <div class="bg-[#FFF4AA] p-1 flex items-center gap-1 rounded cursor-pointer">
                    <i class="text-[#554A00] text-sm icon-book-open"></i>
                    <span class="text-[#554A00] text-sm leaning-none">{{
                      item.tipo
                    }}</span>
                  </div>
                  <span class="text-[#0043AA] text-xs">•</span>
                  <p class="text-[#0043AA] text-xs">
                    Hace {{ item.antiguedad }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-[#191919] text-sm p-4">
            No tienes notificaciones por el momento.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>