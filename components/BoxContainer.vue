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
  <!-- <div
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
  > -->

  <div
    :class="[{
       'pt-[22px] pb-[22px] px-7': padding
    }] "
    class="bg-white shadow-[0_10px_6px_0_rgba(0,0,0,0.05)] rounded-[14px] w-full min-h-[40px] relative"
  >
    <div :class="[{
       'bg-[#039C6D]' : color === 'green',
       'bg-[#9DE7D6]' : color === 'greenLigth',
       'bg-[#FFDF00]' : color === 'yellow',
       'bg-[#699A8F]' : color === 'cyan',
       'bg-[#5598FF]' : color === 'blueLigth',
       'bg-[#E50A17]' : color === 'red',
       'bg-[#FEB6C2]' : color === 'pink',
       'bg-[#191919]' : color === 'black',
    }] "
    class="h-2 w-full absolute left-0 top-0 rounded-t-[14px]"></div>
    <slot></slot>
  </div>
</template>
