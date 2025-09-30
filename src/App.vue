<script setup>
import { ref } from "vue";
import { validateForm } from "./utils/validateForm";
import Logo from "@/components/Logo.vue";

const form = ref({
  name: "",
  email: "",
});

const errors = ref({});

const handleForm = () => {
  const retorno = validateForm(form.value);
  if (Object.keys(retorno).length > 0) {
    errors.value = retorno;
    return;
  }
};
</script>

<template>
  <h1>Projeto Vitest com Vue</h1>
  <Logo />
  <div class="formulario">
    <form @submit.prevent="handleForm">
      <input type="text" name="nome" id="nome" v-model="form.name" />
      <input type="email" name="email" id="email" v-model="form.email" />
      <button type="submit">Enviar</button>
    </form>

    <p class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </p>
  </div>
</template>

<style scoped></style>
