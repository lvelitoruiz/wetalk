<!-- eslint-disable @typescript-eslint/comma-dangle -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { useUserStore } from '../../../stores/auth';
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { ref, watchEffect, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuStore = useMenuStore();
const userStore = useUserStore();
const dataU = userStore.getUserData;
const interestedData = ref({
  value: [],
});
const itemTitle = ref(null);
const itemFirstQuestions = ref(null);
const itemSecondQuestions = ref(null);
const itemAlternatives = ref({
  value: [],
});
const itemTopicAlternatives = ref({
  value: [],
});

const manageableData = ref(null);
const idTitle = 5;
const idFirstQuestions = 6;
const idSecondQuestions = 7;
const nameToFind = 'beyond';

const fetchData = async () => {
  await menuStore.fetchManageableData(apiUrl, 'beyond');
  await menuStore.fetchInterestData(apiUrl, 'beyond');
};

const goBack = () => {
  router.go(-1);
};

const getFirstName = (fullName) => {
  const words = fullName.split(' ');
  return words.length > 0 ? words[0] : '';
};

const selectedIntereses = ref([]);
const selectedTopics = ref([]);

const handleSelectionChange = (selectedItems) => {
  selectedTopics.value = selectedItems;
};

const saveInterested = async () => {
  try {
    const selectedInteresesArray = Object.values(selectedIntereses.value);
    const selectedTopicsArray = selectedTopics.value.map((item) => item.id);

    const registerData = {
      // student_code: dataU.codUser,
      student_code: 'N10000005',
      course_code: 'CONEJOS1',
      component_name: 'beyond',
      answers: [
        {
          contenido_dinamico_id: idFirstQuestions,
          answer: selectedTopicsArray.join(','),
        },
        {
          contenido_dinamico_id: idSecondQuestions,
          answer: selectedInteresesArray.join(','),
        },
      ],
    };

    console.log(registerData);
    // const registerCount = await menuStore.registerInterestedData(
    //   apiUrl,
    //   registerData
    // );
  } catch (error) {
    console.error('Error al intentar registrar:', error);
  }
};

watchEffect(() => {
  const interested = menuStore.getInterestedItems;
  const manageable = menuStore.getManageableItems;

  if (interested) {
    const interestedDataValue = interested.map((item) => {
      return {
        contenido_dinamico_id: item.contenido_dinamico_id,
        answer: item.answer.split(',').map(Number),
      };
    });

    interestedData.value = {
      value: interestedDataValue,
      total: interestedDataValue.length,
    };
    selectedIntereses.value = interestedDataValue[1].answer;
  }

  if (manageable) {
    manageableData.value = manageable;

    itemTitle.value = manageableData.value.find(
      (item) => item.id === idTitle && item.nombre === nameToFind
    );
    itemFirstQuestions.value = manageableData.value.find(
      (item) => item.id === idFirstQuestions && item.nombre === nameToFind
    );
    itemSecondQuestions.value = manageableData.value.find(
      (item) => item.id === idSecondQuestions && item.nombre === nameToFind
    );
    itemAlternatives.value = manageableData.value.find(
      (item) => item.id === idSecondQuestions && item.nombre === nameToFind
    );
    itemTopicAlternatives.value = manageableData.value.find(
      (item) => item.id === idFirstQuestions && item.nombre === nameToFind
    );
  }
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="black">
        <div class="flex items-baseline justify-between pb-2">
          <div class="flex items-baseline justify-between pb-[15px]">
            <div
              @click="goBack()"
              class="md:flex hidden items-center gap-2 cursor-pointer"
            >
              <i class="icon-arrow-right text-[#404040] rotate-180" />
              <span class="text-[#404040] font-bold font-zizou-bold text-sm">
                Atrás
              </span>
            </div>
          </div>
        </div>
        <div class="md:mx-[60px] mx-0">
          <h3 class="text-[#404040] text-center">
            <span class="uppercase font-bold font-solano text-2xl">
              {{ getFirstName(dataU.name) }},
            </span>
            <span class="uppercase font-bold font-solano text-[1.3rem]">
              {{ itemTitle?.texto }}
            </span>
          </h3>
          <div
            class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px]"
          >
            <div class="relative">
              <p
                class="mt-[20px] font-bold md:text-[16px] text-[12px] font-publicSans"
              >
                {{ itemFirstQuestions?.texto }}
                <span class="text-[#E50A17]">*</span>
              </p>
              <MultiSelect
                :data="itemTopicAlternatives?.alternativas"
                :selected="interestedData.value[0]"
                @on-selection-change="handleSelectionChange"
              />
            </div>
            <div class="relative">
              <p
                class="mt-[20px] mb-[10px] font-bold md:text-[16px] text-[12px] font-publicSans"
              >
                {{ itemSecondQuestions?.texto }}
                <span class="text-[#E50A17]">*</span>
              </p>
              <label
                v-for="alternativa in itemAlternatives?.alternativas"
                :key="alternativa.id"
                class="checkbox mb-[8px]"
              >
                <input
                  class="checkbox-input"
                  type="checkbox"
                  :value="alternativa.id"
                  v-model="selectedIntereses"
                />
                <span class="checkbox-checkmark-box">
                  <span class="checkbox-checkmark"></span>
                </span>
                <span class="ml-[10px] md:text-[14px] text-[12px]">{{
                  alternativa.nombre
                }}</span>
              </label>
              <div class="mx-auto mb-[20px] text-center">
                <div @click="saveInterested">
                  <Button label="Enviar" primary class="mt-[35px] !w-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<style>
.checkbox-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 20px;
}

.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}
.checkbox:hover .checkbox-checkmark {
  border: 2px solid #e50a17;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox-input:focus ~ .checkbox-checkmark-box {
  border-color: #e50a17;
}
.checkbox-input:checked ~ .checkbox-checkmark-box .checkbox-checkmark:after {
  display: block;
}
.checkbox-input:checked ~ .checkbox-checkmark-box .checkbox-checkmark {
  background-color: #e50a17;
  border: 2px solid #e50a17;
}
.checkbox-input:disabled ~ .checkbox-checkmark-box .checkbox-checkmark {
  border: 2px solid #b0b0b0;
  cursor: not-allowed;
}
.checkbox-input:disabled:checked ~ .checkbox-checkmark-box .checkbox-checkmark {
  background-color: #b0b0b0;
}
.checkbox-input:disabled:checked
  ~ .checkbox-checkmark-box
  .checkbox-checkmark:after {
  background: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.8866 9.91722L0.0873348 5.36761C0.0596566 5.34137 0.037692 5.31018 0.0227039 5.27582C0.00771585 5.24146 0 5.20461 0 5.1674C0 5.13019 0.00771585 5.09335 0.0227039 5.05899C0.037692 5.02463 0.0596566 4.99343 0.0873348 4.96719L1.29893 3.81086C1.41471 3.70049 1.60183 3.70049 1.71761 3.81086L4.87718 6.80501C4.99296 6.91538 5.18143 6.91409 5.2972 6.80372L12.2787 0.0839022C12.3945 -0.0277526 12.5829 -0.0277526 12.7001 0.0826188L13.913 1.23895C14.0288 1.34932 14.0288 1.52771 13.9143 1.63809L6.30821 8.95468L6.30956 8.95597L5.30662 9.91722C5.19085 10.0276 5.00238 10.0276 4.8866 9.91722Z' fill='%2374767B'/%3E%3C/svg%3E%0A")
    no-repeat center;
  background-size: contain;
}

.checkbox-checkmark-box {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 4px;
}

.checkbox-checkmark {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #404040;
  border-radius: 4px;
  cursor: pointer;
}
.checkbox-checkmark:after {
  content: '';
  display: none;
  background: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.8866 9.91722L0.0873348 5.36761C0.0596566 5.34137 0.037692 5.31018 0.0227039 5.27582C0.00771585 5.24146 0 5.20461 0 5.1674C0 5.13019 0.00771585 5.09335 0.0227039 5.05899C0.037692 5.02463 0.0596566 4.99343 0.0873348 4.96719L1.29893 3.81086C1.41471 3.70049 1.60183 3.70049 1.71761 3.81086L4.87718 6.80501C4.99296 6.91538 5.18143 6.91409 5.2972 6.80372L12.2787 0.0839022C12.3945 -0.0277526 12.5829 -0.0277526 12.7001 0.0826188L13.913 1.23895C14.0288 1.34932 14.0288 1.52771 13.9143 1.63809L6.30821 8.95468L6.30956 8.95597L5.30662 9.91722C5.19085 10.0276 5.00238 10.0276 4.8866 9.91722Z' fill='white'/%3E%3C/svg%3E%0A")
    no-repeat center;
  width: 24px;
  height: 20px;
  background-size: contain;
}
</style>
