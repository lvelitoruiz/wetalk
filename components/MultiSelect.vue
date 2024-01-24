<template>
  <div>
    <div class="max-w-[489px]">
      <div
        class="select-btn mt-[10px] md:min-h-[46px] min-h-[0]"
        @click="toggleOpen"
        :class="{ open: isOpen }"
      >
        <div class="flex items-center">
          <span
            class="btn-text flex items-center flex-wrap md:text-[14px] text-[12px]"
          >
            <template v-if="selectedItems.length > 0">
              <span
                v-for="item in selectedItems"
                :key="item"
                class="px-[8px] py-[4px] bg-[#F2F2F2] rounded-[12px] flex items-center mr-[7px] mb-[5px] md:text-[15px] text-[12px] font-publicSans"
              >
                {{ item.nombre }}
                <span
                  class="selected-item"
                  @click.stop="removeSelectedItem(item.nombre)"
                >
                  <img
                    :src="icon_close_black"
                    alt="Icon Arrow Select"
                    class="ml-[5px] w-[10px]"
                  />
                </span>
              </span>
            </template>
            <span v-else> Selecciona </span>
          </span>
        </div>
        <span class="arrow-dwn">
          <img :src="arrow_bottom_black" alt="Icon Arrow Select" />
        </span>
      </div>
      <ul class="list-items" v-show="isOpen">
        <li
          class="item"
          :class="{ checked: item.checked }"
          v-for="(item, index) in items"
          :key="index"
          @click="toggleChecked(index)"
        >
          <span class="checkbox">
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text md:text-[14px] text-[12px]">{{
            item.nombre
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<!-- eslint-disable @typescript-eslint/comma-dangle -->
<script setup>
import {
  defineProps,
  onMounted,
  ref,
  onUnmounted,
  defineEmits,
  watchEffect,
} from 'vue';
import { arrow_bottom_black, icon_close_black } from '../assets/index';

const selectBtn = ref(null);
const isOpen = ref(false);
const selectedItems = ref([]);
const props = defineProps({
  data: Array,
  selected: Object,
  onSelectionChange: Function,
});

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const items = ref(props.data?.map((item) => ({ ...item, checked: false })));
const emits = defineEmits(['onSelectionChange']);

const toggleChecked = (index) => {
  const item = items.value[index];
  item.checked = !item.checked;

  if (item.checked) {
    selectedItems.value.push(item);
  } else {
    const selectedIndex = selectedItems.value.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (selectedIndex !== -1) {
      selectedItems.value.splice(selectedIndex, 1);
    }
  }

  emits('onSelectionChange', selectedItems.value);

  if (props.onSelectionChange) {
    const selectedIds = selectedItems.value.map(
      (selectedItem) => selectedItem.id
    );
    props.onSelectionChange(selectedIds);
  }
};

const removeSelectedItem = (item) => {
  const itemIndex = items.value.findIndex((i) => i.nombre === item);
  if (itemIndex !== -1) {
    items.value[itemIndex].checked = false;
  }

  const selectedItemIndex = selectedItems.value.findIndex(
    (selectedItem) => selectedItem.nombre === item
  );

  if (selectedItemIndex !== -1) {
    selectedItems.value.splice(selectedItemIndex, 1);
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  markSelectedOptions();
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});

const markSelectedOptions = () => {
  if (props.selected && Array.isArray(props.selected.answer)) {
    const answerIds = props.selected.answer;

    answerIds.forEach((selectedItem) => {
      const itemIndex = items.value?.findIndex(
        (item) => item.id === selectedItem
      );

      if (itemIndex && itemIndex !== -1) {
        items.value[itemIndex].checked = true;

        const selectedOptionIndex = selectedItems.value.findIndex(
          (selectedItem) => selectedItem.id === selectedItem
        );

        if (selectedOptionIndex === -1) {
          selectedItems.value.push(items.value[itemIndex]);
        }
      }

      emits('onSelectionChange', selectedItems.value);
    });
  }
};

const handleDocumentClick = (event) => {
  const clickedElement = event.target;
  if (selectBtn.value && !selectBtn.value.contains(clickedElement)) {
    isOpen.value = false;
  }
};
</script>

<style>
.select-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 4px 16px;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
}
.select-btn .btn-text {
  font-weight: 400;
  color: #333;
}
.select-btn .arrow-dwn {
  display: flex;
  height: 21px;
  width: 21px;
  color: #fff;
  font-size: 14px;
  border-radius: 50%;
  background: transparent;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}
.selected-item {
  display: inline-block;
}
.list-items {
  position: absolute;
  width: 100%;
  z-index: 100;
  max-height: 200px;
  overflow: overlay;
  margin-top: 5px;
  border-radius: 8px;
  padding: 10px 15px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.select-btn.open ~ .list-items {
  display: block;
}
.list-items .item {
  display: flex;
  align-items: center;
  list-style: none;
  height: 35px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 8px;
}
.list-items .item:hover {
  background-color: #e7edfe;
}
.item .item-text {
  font-weight: 400;
  color: #333;
}
.item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 4px;
  margin-right: 12px;
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}
.item.checked .checkbox {
  background-color: #e50a17;
  border-color: #e50a17;
}
.checkbox .check-icon {
  color: #fff;
  font-size: 11px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
}
.item.checked .check-icon {
  transform: scale(1);
}
</style>
