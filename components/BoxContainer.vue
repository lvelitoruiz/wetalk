<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    width: String,
    size: String,
    color: {
      type: String,
      default: "",
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
});
</script>

<template>
  <!-- <div
    :style="`height: ${size + 'px'}; width: ${width + '%'}`"
    :class="[{
       'border-[#039C6D]' : color === 'green',
       'border-[#9DE7D6]' : color === 'greenLigth',
       'border-[#FFDF00]' : color === 'yellow',
       'border-[#699A8F]' : color === 'cyan',
       'border-[#5598FF]' : color === 'blueLigth',
       'border-[#E50A17]' : color === 'red',
       'border-[#FEB6C2]' : color === 'pink',
       'border-[#191919]' : color === 'black'
    }] "
    class="bg-white shadow-[0_10px_6px_0_rgba(0,0,0,0.05)] rounded-[14px] border-t-[8px] pt-[14px] pb-[22px] px-7"
  >
    <slot></slot>
  </div> -->
  <div
    :class="[{
       'border-[#039C6D]' : color === 'green',
       'border-[#9DE7D6]' : color === 'greenLigth',
       'border-[#FFDF00]' : color === 'yellow',
       'border-[#699A8F]' : color === 'cyan',
       'border-[#5598FF]' : color === 'blueLigth',
       'border-[#E50A17]' : color === 'red',
       'border-[#FEB6C2]' : color === 'pink',
       'border-[#191919]' : color === 'black',
       'pt-[14px] pb-[22px] px-7': padding
    }] "
    class="bg-white shadow-[0_10px_6px_0_rgba(0,0,0,0.05)] rounded-[14px] border-t-[8px] w-full min-h-[40px]"
  >
    <slot></slot>
  </div>
</template>
