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
       'bg-[#AACCFF]' : color === 'blueVariant'
    }] "
    class="h-2 w-full absolute left-0 top-0 rounded-t-[14px]"></div>
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
  background-color: #039C6D; 
  border-radius: 6px; 
}

.greenLigth-scroll::-webkit-scrollbar-thumb {
  background-color: #9DE7D6; 
  border-radius: 6px; 
}

.yellow-scroll::-webkit-scrollbar-thumb {
  background-color: #FFDF00; 
  border-radius: 6px; 
}

.cyan-scroll::-webkit-scrollbar-thumb {
  background-color: #699A8F; 
  border-radius: 6px; 
}

.blueLigth-scroll::-webkit-scrollbar-thumb {
  background-color: #5598FF; 
  border-radius: 6px; 
}

.red-scroll::-webkit-scrollbar-thumb {
  background-color: #E50A17; 
  border-radius: 6px; 
}

.pink-scroll::-webkit-scrollbar-thumb {
  background-color: #FEB6C2; 
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
