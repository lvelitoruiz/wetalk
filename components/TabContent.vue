<template>
  <div>
    <ul v-bind="$attrs" class="flex items-center gap-4 mb-[22px]">
      <li v-for="(tab, i) in tabs" :key="i" class="flex-shrink-0">
        <button
          @click="handleActiveTab(`tab-${i}`)"
          :class="[
            {
              'py-2 px-4 bg-[#FFDAE1] text-[#B70812]':
                tabActive === `tab-${i}`,
            },
            { 'py-2 px-4 bg-[#F2F2F2] text-[#595959]': tabActive !== `tab-${i}` },
          ]"
          class="py-2 px-4 rounded font-medium font-zizou-bold text-[16px]"
        >
          {{ tab }}
        </button>
      </li>
    </ul>
    <div>
      <slot :tabSelected="tabActive" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    tabs: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup() {
    const tabActive = ref("tab-0");

    const handleActiveTab = (tab: string) => {
      tabActive.value = tab;
    };

    return {
      tabActive,
      handleActiveTab,
    };
  },
});
</script>
