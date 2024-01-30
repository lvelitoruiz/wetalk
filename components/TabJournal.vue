<template>
  <div class="overflow-x-auto">
    <ul v-bind="$attrs" class="flex items-center gap-4">
      <li v-for="(tab, i) in tabs" :key="i" class="flex-shrink-0">
        <button
          @click="handleActiveTab(`tab-${i}`, tab.value)"
          :class="[
            {
              'bg-[#E6F0FF] text-[#0043AA]': tabActive === `tab-${i}`,
            },
            { 'bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-${i}` },
          ]"
          class="py-1 px-4 rounded font-bold font-zizou-bold text-sm capitalize leading-6"
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
import { ref, defineProps, getCurrentInstance } from 'vue';

const props = defineProps({
  tabs: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

const tabActive = ref(`tab-${props.tabs.length - 1}`);
const instance = getCurrentInstance();

const handleActiveTab = (tab: string, value: boolean) => {
  tabActive.value = tab;
  const isActive = tab === tabActive.value;
  // console.log(value);
  instance?.emit('tabChange', value);
};
</script> 