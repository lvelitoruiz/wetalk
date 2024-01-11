<template>
    <div class="overflow-x-auto">
      <ul v-bind="$attrs" class="flex items-center gap-4">
        <li v-for="(tab, i) in tabs" :key="i" class="flex-shrink-0">
          <button
            @click="handleActiveTab(`tab-${i}`,tab.value)"
            :class="[
              {
                'bg-[#E6F0FF] text-[#0043AA]':
                  tabActive === `tab-${i}`,
              },
              { 'bg-white text-[#404040]': tabActive !== `tab-${i}` },
            ]"
            class="border border-[#A6A6A6] py-1 px-3 rounded font-bold font-zizou-bold text-base capitalize leading-6"
          >
            {{ tab.texto }}
          </button>
        </li>
      </ul>
      <div>
        <slot :tabSelected="tabActive" />
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, defineProps, getCurrentInstance } from "vue";
  
  const props = defineProps({
    tabs: {
      type: Array as PropType<any[]>,
      required: true,
    },
  });
  
  const tabActive = ref(`tab-${props.tabs.length - 1}`);
  const instance = getCurrentInstance();
  
  const handleActiveTab = (tab: string,value: boolean) => {
    tabActive.value = tab;
    const isActive = tab === tabActive.value;
    // console.log(value);
    instance?.emit("tabChange", value);
  };
  
  </script>
  