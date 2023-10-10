<script setup>
const props = defineProps({
  label: String,
  primary: Boolean,
  secundary: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const getButtonClasses = () => {
  return {
    'bg-[#E50A17] text-white transition-all duration-300 ease-in-out hover:bg-[#B70812]': props.primary && !props.disabled,
    'bg-transparent text-[#808080] border border-[#808080] transition-all duration-300 ease-in-out': props.secundary && props.disabled,
    'bg-transparent text-[#E50A17] border border-[#E50A17] transition-all duration-300 ease-in-out hover:text-[#B70812] hover:border-[#B70812]': props.secundary && !props.disabled,
    'bg-[#808080] text-white transition-all duration-300 ease-in-out': props.disabled && props.primary,
  };
};

const getBorderClass = () => {
  return {
    'border-[#808080]': props.disabled && props.primary,
    'border-[#E50A17]': !props.disabled && (props.secundary || props.primary),
    'border border-[#808080]': props.disabled && props.secundary,
  };
};
</script>

<template>
  <button :disabled="props.disabled" class="display inline-block w-auto pr-1 pb-1 relative">
    <span
      class="inline-block p-2.5 leading-6 font-zizou-bold text-normal relative z-10"
      :class="getButtonClasses()"
    >
      {{ props.label }}
    </span>
    <span
      class="inline-block p-2.5 leading-6 font-zizou-bold text-normal text-white border box-border absolute h-[calc(100%-4px)] w-[calc(100%-4px)] right-0 bottom-0 z-0"
      :class="getBorderClass()"
    ></span>
  </button>
</template>
