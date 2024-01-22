<script setup>
const props = defineProps({
  totalItems: {
    type: Number,
    required: false,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 8,
  },
  onClickHandler: {
    type: Function,
    required: true,
  },
});

const currentPageRef = toRef(props, 'currentPage');

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const next = () => {
  if (currentPageRef.value < totalPages.value) {
    props.onClickHandler(currentPageRef.value + 1);
  }
};
const prev = () => {
  if (currentPageRef.value > 1) {
    props.onClickHandler(currentPageRef.value - 1);
  }
};
const goTo = (val) => {
  if (val > 0 && val <= totalPages.value) {
    props.onClickHandler(val);
  }
};

const showPage = (val) => {
  if (totalPages.value <= 5) return true;
  if (val === currentPageRef.value) return true;
  if (val === currentPageRef.value + 1 && val !== 3) return true;
  if (
    val === currentPageRef.value - 1 &&
    (val === 1 || currentPageRef.value === totalPages.value)
  )
    return true;
};

const showDot = (val) => {
  if (val === 2 && totalPages.value > 5) return false;
  if (
    val > 3 &&
    val === currentPageRef.value + 1 &&
    val !== totalPages.value - 1
  )
    return false;
  return true;
};
</script>

<template>
  <nav>
    <ul class="flex items-center justify-center font-solano text-[#A6A6A6]">
      <li class="relative mr-3">
        <Button
          iconLeft
          secundary
          @click.prevent="goTo(1)"
          :disabled="currentPageRef === 1"
        />
      </li>
      <li
        v-if="currentPage >= totalPages - 2 && totalPages > 5"
        class="flex gap-[2px] justify-center"
        aria-hidden="true"
      >
        <template v-for="(_, i) in new Array(3)" :key="`d1${i}`">
          <span class="w-[4px] h-[4px] rounded-full text-primary"></span>
        </template>
      </li>
      <template v-for="(item, i) in new Array(totalPages - 1)" :key="`p${i}`">
        <li
          v-if="showPage(i + 1)"
          class="flex items-center justify-center relative text-[#595959]"
          :class="{
            'text-primary': currentPageRef === i + 1,
          }"
        >
          <button
            class="w-[40px]"
            @click.prevent="goTo(i + 1)"
            :aria-label="`${i + 1}`"
          >
            {{ i + 1 }}
          </button>
          <div
            class="w-[4px] h-[4px] rounded-full bg-primary absolute right-[-2.5px]"
          ></div>
        </li>
      </template>
      <li
        class="flex gap-[2px] justify-center"
        v-if="totalPages > 5 && currentPageRef <= totalPages - 3"
        aria-hidden="true"
      >
        <template v-for="(_, i) in new Array(3)" :key="`d2${i}`">
          <span class="w-[4px] h-[4px] rounded-full text-primary"></span>
        </template>
      </li>
      <li
        class="flex items-center justify-center text-[#595959]"
        :class="{
          'text-primary': currentPageRef === totalPages,
        }"
      >
        <button
          class="w-[40px]"
          @click.prevent="goTo(totalPages)"
          :aria-label="`${totalPages}`"
        >
          {{ totalPages }}
        </button>
      </li>

      <li class="btn-container ml-2">
        <Button
          class="btn-pag"
          @click.prevent="next"
          :disabled="currentPageRef === totalPages"
          aria-label="Ir a la siguiente página"
          iconRight
          secundary
        >
        </Button>
      </li>
      <!-- Go to last Page -->
      <li class="btn-container ml-3" v-if="totalPages > 5">
        <Button
          @click.prevent="goTo(totalPages)"
          :disabled="currentPageRef === totalPages"
          aria-label="Ir a la última página"
          iconRight
          secundary
        />
      </li>
    </ul>
  </nav>
</template>


