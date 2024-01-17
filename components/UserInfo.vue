<template>
  <UserName
    :name="name"
    :code="code"
  />
  <AcademicInfo
    :inst="inst"
    :mod="mod"
    :level="level"
    :carr="carr"
    :mail="mail"
    :dni="dni"
  />
  <ContactInformation
    :pmail="pmail"
    :number="number"
  />
</template>

<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref, watchEffect } from 'vue'

const name = ref('')
const code = ref('')

const inst = ref('')
const level = ref('')
const mod = ref('')
const carr = ref('')
const mail = ref('')
const dni = ref('')
const pmail = ref('')
const number = ref('')

const props = defineProps({
  userInfo: Object
})

watchEffect(async () => {
  const alumnData = props.userInfo
  if (alumnData) {
    console.log('the alumn data here: ', alumnData)
    code.value = alumnData.codAlumno
    name.value = alumnData.nombresImag
    inst.value = alumnData.institucion
    mod.value = alumnData.codModalidadEstActual
    carr.value = alumnData.desProducto
    level.value = alumnData.descCurso
    mail.value = alumnData.usuarioEmail
    dni.value = alumnData.documenIdentida
    pmail.value = alumnData.usuarioEmailPersonal
    number.value = alumnData.telefono
  }
  console.log('the user information: ', props.userInfo)
})
</script>
