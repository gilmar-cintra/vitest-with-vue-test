# vitest-with-vue-test

Esse projeto tem como objetivo o aprendizado do Vitest com Vue para testes unitários de frontend.

## Capitulo 0 - Inicio

Iniciamos um projeto com Vue CLI vazio

```sh
npm create vue@latest
``` 

Não escolhemos nenhuma opção de configuração, apenas o básico e agora instalamos as dependências.


```sh
npm install
```

Agora podemos rodar o projeto com o comando abaixo.

```sh
npm run dev
```

## Capitulo 1 - Testando uma função simples

Na filosofia TDD, antes de escrevermos o código, escreveremos o teste. No entanto a titulo de aprendizado, iremos escrever o código primeiro e depois o teste.

criamos um formulário simples na pagina App.vue

```html
<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
});

const handleForm = () => {
  //validação do formulario
  if (!form.value.name) {
    alert("Nome é obrigatório");
    return;
  }
  if (!form.value.email) {
    alert("Email é obrigatório");
    return;
  }
  //enviar formulario
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

```

Não tem problema desenvolver um projeto com a validação no próprio componente, entretando é melhor organizar o código em arquivos separados. Então vamos criar uma pasta chamada **src/utils** e dentro dela criamos um arquivo chamado **validateForm.js**. Seu conteudo será

```js
export const validateForm = (form) => {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = "Nome é obrigatório";
  }
  if (!form.email.trim()) {
    errors.email = "Email é obrigatório";
  }
  return errors;
};
```

Melhoramos o processo de validação, verificando cada campo e personalizando a mensagem de erro. Agora podemos melhorar o componente App.vue importando a função de validação e usando ela no lugar da validação manual.

```html
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
```

Agora que temos o código pronto, podemos começar a escrever os testes. Para rodar os testes, usaremos o comando abaixo.

```sh
npm run test
```

No entanto para usar ele é necessário informar no package.json o script de teste e instalar o vitest.

```json
"scripts": {
  "test": "vitest"
}
```

```sh
npm install vitest -D
```

Agora podemos rodar os testes com o comando abaixo. 

```sh
npm run test
```

No entanto como não temos arquivos de testes o comando dará erro. Vamos criar um arquivo de teste para a função de validação do formulário.

Dentro da pasta src/utils criamos um arquivo chamado validateForm.test.js e vamos iniciar a montagem do test. Primeiramente importamos algumas bibliotecas que serão usadas no teste.

```js
import { test, expect } from "vitest";
import { validateForm } from "./validateForm";
```

A primeira função test serve para criar um teste. Ela recebe dois parâmetros, o primeiro é o nome do teste e o segundo é uma função que contém o teste em si.  A função expect serve para fazer asserções. Ela recebe um parâmetro que é o valor que será testado e retorna um objeto com vários métodos para fazer asserções. 

Preciso ter claro que a função validateForm retorna um objeto com os erros, se existirem e vazia se não houverem erros. 

Logo temos algums casos a serem testados.

- retorno com erro de nome
- retorno com erro de email
- retorno com erro de nome e email
- retorno vazio

Vamos começar pelo primeiro caso. Para isso temos que ter ideia de qual é o retorno nesse caso, que logo será { name: "Nome é obrigatório" }, logo escrevemos o teste.

```js
test("Deve retornar erro de nome quando o nome não for preenchido", () => {
  const form = {
    name: "",
    email: "email@email.com",
  };
  const errorsEsperado = { name: "Nome é obrigatório" };
  const errors = validateForm(form);
  expect(errors).toEqual(errorsEsperado);
});
```
Podemos otimizar o código, removendo o objeto errorsEsperado e colocando o valor direto no expect.

```js
test("Deve retornar erro de nome quando o nome não for preenchido", () => {
  const form = {
    name: "",
    email: "email@email.com",
  };
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});
```

Agora podemos rodar os testes com o comando abaixo. 

```sh
npm run test
```

Agora podemos fazer os outros testes com a mesma lógica.

```js
import { test, expect } from "vitest";
import { validateForm } from "./validateForm";

test("Deve retornar erro de nome quando o nome não for preenchido", () => {
  const form = {
    name: "",
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});

test("Deve retornar erro de email quando o email não for preenchido", () => {
  const form = {
    name: "Nome",
    email: "",
  };
  
  expect(validateForm(form)).toEqual({ email: "Email é obrigatório" });
});

test("Deve retornar erro de nome e email quando os dois não forem preenchidos", () => {
  const form = {
    name: "",
    email: "",
  };
  
  expect(validateForm(form)).toEqual({
    name: "Nome é obrigatório",
    email: "Email é obrigatório",
  });
});

test("Deve retornar objeto vazio quando os dois forem preenchidos", () => {
  const form = {
    name: "Nome",
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({});
});
```

Uma das coisas que podemos incrementar em nossa função é a validação é utilizar expressões regulares, por exemplo para validar e-mails, telefone e etc. A seguir segue um exemplo para validar um telefone

```js
export const validateForm = (form) => {
  const errors = {};
  if (!form.name || !form.name.trim()) {
    errors.name = "Nome é obrigatório";
  }
  if (!form.email || !form.email.trim()) {
    errors.email = "Email é obrigatório";
  }
  if (!form.phone || !form.phone.trim()) {
    errors.phone = "Telefone é obrigatório";
  } else if (!form.phone.match(/\d{2}\d{4,5}\d{4}/)) {
    errors.phone = "Telefone inválido";
  }
  return errors;
};
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


