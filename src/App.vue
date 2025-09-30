<script setup>
import { ref } from "vue";
import { validateForm } from "./utils/validateForm";

const form = ref({
  name: "",
  email: "",
});

const handleForm = () => {
  const errors = validateForm(form.value);
  if (Object.keys(errors).length) {
    alert(errors[Object.keys(errors)[0]]);
    return;
  }
  alert("Formulario enviado com sucesso");
};
</script>

<template>
  <h1>Projeto Vitest com Vue</h1>
  <div class="formulario">
    <form @submit.prevent="handleForm">
      <input type="text" name="nome" id="nome" v-model="form.name" />
      <input type="email" name="email" id="email" v-model="form.email" />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<style scoped></style>
