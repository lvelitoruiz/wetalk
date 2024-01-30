<!-- eslint-disable vue/require-default-prop -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: String,
    size: String,
    navigation: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    wide: {
      type: String,
      default: '',
    },
    padding: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<template>
  <div
    :class="[
      {
        'pt-[22px] pb-[22px] z-[1] px-7': padding,
      },
    ]"
    class="bg-white shadow-[0_10px_6px_0_rgba(0,0,0,0.05)] rounded-[14px] w-full min-h-[40px] relative"
  >
    <div
      :class="[
        {
          'bg-[#039C6D]': color === 'green',
          'bg-[#9DE7D6]': color === 'greenLigth',
          'bg-[#FFDF00]': color === 'yellow',
          'bg-[#699A8F]': color === 'cyan',
          'bg-[#5598FF]': color === 'blueLigth',
          'bg-[#E50A17]': color === 'red',
          'bg-[#FEB6C2]': color === 'pink',
          'bg-[#191919]': color === 'black',
          'bg-[#AACCFF]': color === 'blueVariant',
        },
      ]"
      class="h-2 w-full absolute left-0 top-0 rounded-t-[14px] overflow-hidden"
    >
      <div
        v-if="navigation"
        class="h-full bg-blue-700 rounded-r-full"
        :class="[
          {
            'w-[0%]': wide === 'initial',
            'w-[33%]': wide === 'first',
            'w-[66%]': wide === 'second',
            'w-[100%]': wide === 'third',
          },
        ]"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>
<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.green-scroll::-webkit-scrollbar-thumb {
  background-color: #039c6d;
  border-radius: 6px;
}

.greenLigth-scroll::-webkit-scrollbar-thumb {
  background-color: #9de7d6;
  border-radius: 6px;
}

.yellow-scroll::-webkit-scrollbar-thumb {
  background-color: #ffdf00;
  border-radius: 6px;
}

.cyan-scroll::-webkit-scrollbar-thumb {
  background-color: #699a8f;
  border-radius: 6px;
}

.blueLigth-scroll::-webkit-scrollbar-thumb {
  background-color: #5598ff;
  border-radius: 6px;
}

.red-scroll::-webkit-scrollbar-thumb {
  background-color: #e50a17;
  border-radius: 6px;
}

.pink-scroll::-webkit-scrollbar-thumb {
  background-color: #feb6c2;
  border-radius: 6px;
}

.black-scroll::-webkit-scrollbar-thumb {
  background-color: #191919;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Set the color of the thumb on hover */
}
</style>
