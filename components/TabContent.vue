<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { ref, defineProps, getCurrentInstance } from 'vue';
import { arrow_right_gray } from '../assets/index';
import { useSizeMedia } from '../utils/utils';

const props = defineProps({
  tabs: {
    type: Array as PropType<any[]>,
    required: true,
  },
  optionAll: {
    type: Boolean,
    default: false,
    required: false,
  },
  colorActive: {
    type: String,
    default: '',
  },
});

const sizeMedia = useSizeMedia();
const tabActive = ref(props.optionAll ? 'tab-all' : 'tab-0');
const instance = getCurrentInstance();

const shouldShowScrollButton = () => {
  return (
    (props.tabs.length > 5 && sizeMedia.screenWidth.value > 1024) ||
    (props.tabs.length >= 10 && sizeMedia.screenWidth.value < 1024)
  );
};

const handleActiveTab = (tab: string, value: boolean | null) => {
  tabActive.value = tab;
  const isActive = tab === tabActive.value;
  instance?.emit('tabChange', value ?? tab);
};

const scrollTabs = (direction: 'left' | 'right') => {
  const tabsList = instance?.refs.tabsList as HTMLElement | undefined;

  if (tabsList) {
    const scrollAmount = 200;

    if (direction === 'left') {
      tabsList.scrollLeft -= scrollAmount;
    } else {
      tabsList.scrollLeft += scrollAmount;
    }
  }
};
</script>

<template>
  <div class="flex overflow-x-auto tabs-box">
    <ul
      ref="tabsList"
      v-bind="$attrs"
      class="tabs-container flex items-center gap-4 overflow-x--auto md:overflow-x-hidden"
    >
      <li v-if="optionAll">
        <button
          @click="handleActiveTab('tab-all', null)"
          :class="[
            { black: props.colorActive === 'black' && tabActive === `tab-all` },
            {
              'bg-[#FFDAE1] text-[#B70812]': tabActive === `tab-all`,
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
          @click="handleActiveTab(`tab-${i}`, tab.value)"
          :class="[
            {
              black: props.colorActive === 'black' && tabActive === `tab-${i}`,
            },
            {
              'bg-[#FFDAE1] text-[#B70812]': tabActive === `tab-${i}`,
            },
            { 'bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-${i}` },
          ]"
          class="py-1 px-3 rounded font-medium font-zizou-bold text-[16px]"
        >
          {{ tab.texto }}
        </button>
      </li>
    </ul>
    <button
      v-if="shouldShowScrollButton()"
      @click="scrollTabs('right')"
      class="px-[10px] block md:hidden"
    >
      <img :src="arrow_right_gray" alt="Icon Arrow Right" />
    </button>
    <div>
      <slot :tab-selected="tabActive" />
    </div>
  </div>
</template>

<style>
.tabs-container {
  display: flex;
  align-items: center;
}

.tab-button {
  background-color: #f2f2f2;
  color: #595959;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 16px;
}

.scroll-button {
  background-color: #f2f2f2;
  color: #595959;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
}

.black {
  background: #191919;
  color: #ffffff;
}
</style>
