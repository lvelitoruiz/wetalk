<template>
  <div>
    <ul v-bind="$attrs" class="flex items-center gap-4 mb-[22px]">
      <li v-for="(tab, i) in tabs" :key="i" class="flex-shrink-0">
        <button
          @click="handleActiveTab(`tab-${i}`,tab.value)"
          :class="[
            {
              'py-2 px-4 bg-[#FFDAE1] text-[#B70812]':
                tabActive === `tab-${i}`,
            },
            { 'py-2 px-4 bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-${i}` },
          ]"
          class="py-2 px-4 rounded font-medium font-zizou-bold text-[16px]"
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

const tabActive = ref("tab-0");
const instance = getCurrentInstance();

const handleActiveTab = (tab: string,value: boolean) => {
  tabActive.value = tab;
  const isActive = tab === tabActive.value;
  // console.log(value);
  instance?.emit("tabChange", value);
};

</script>
