/* eslint-disable @typescript-eslint/space-before-function-paren */
import { ref, onMounted, onUnmounted } from 'vue';

export function useSizeMedia() {
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);

  const updateWindowSize = () => {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWindowSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize);
  });

  return { screenWidth, screenHeight };
}
