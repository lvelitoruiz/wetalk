<template>
  <div>
    <ul v-bind="$attrs" class="flex items-center gap-4 mb-[22px]">
      <li>
        <button @click="handleActiveTab('tab-all', null)" 
          :class="[
            {'black' : props.colorActive === 'black' && tabActive === `tab-all`},
            {
              'bg-[#FFDAE1] text-[#B70812]':
                tabActive === `tab-all`,
            },
            { 'bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-all` },
          ]"
          class="py-1 px-3 rounded font-medium font-zizou-bold text-[16px]"
        >
          Todo
        </button>
      </li>
      <li v-for="(tab, i) in tabs" :key="i" class="flex-shrink-0">
        <button
          @click="handleActiveTab(`tab-${i}`,tab.value)"
          :class="[
            {'black' : props.colorActive === 'black' && tabActive === `tab-${i}`},
            {
              'bg-[#FFDAE1] text-[#B70812]':
                tabActive === `tab-${i}`,
            },
            { 'bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-${i}` },
          ]"
          class="py-1 px-3 rounded font-medium font-zizou-bold text-[16px]"
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

<style>
  .black {
    background: #191919;
    color: #FFFFFF;
  }
</style>

<script setup lang="ts">
import { ref, defineProps, getCurrentInstance } from "vue";

const props = defineProps({
  tabs: {
    type: Array as PropType<any[]>,
    required: true,
  },
  colorActive: {
      type: String,
      default: "",
    },
});

const tabActive = ref("tab-all");
const instance = getCurrentInstance();

const handleActiveTab = (tab: string,value: boolean | null) => {
  tabActive.value = tab;
  const isActive = tab === tabActive.value;
  instance?.emit("tabChange", value ?? tab);
};

</script>
