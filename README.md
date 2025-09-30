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

Agora que temos os testes e erros podemos até mostrar para o usuário os erros. Primeiramente criamos uma variável para armazenar os erros, depois criamos uma div para mostrar os erros.

```html
<script setup>
import { ref } from "vue";
import { validateForm } from "./utils/validateForm";

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

```

## Capitulo 2 - Testando componentes simples

Crie um componente simples chamado Logo.vue com o seguinte conteúdo.

```html
<template>RG Academia</template>

<script setup>
</script>

<style>
</style>
```

Importamos esse component no App.vue

```html
<template>
  <h1>Projeto Vitest com Vue</h1>
  <Logo />
</template>
```

Agora podemos criar o arquivo Logo.test.js na pasta src/components. No entanto como se trata de um componente, precisamos de uma biblioteca para renderizar o componente. Para isso usaremos a biblioteca @vue/test-utils.

```sh
npm install @vue/test-utils -D
```

Agora podemos criar o arquivo de teste e usar a função mount para renderizar o componente.

```js
import { expect, test } from "vitest";
import Logo from "./Logo.vue";

import { mount } from "@vue/test-utils";

test("Deve renderizar o componente Logo", () => {
  const wrapper = mount(Logo);
  expect(wrapper.text()).toContain("RG Academia");
});
```
No entanto ainda teremos o erro 

```sh
ReferenceError: document is not defined
 ❯ mount node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js:8401:14
```
Isso porque ainda precisamos de uma biblioteca para simular o DOM (simular o navegador e não apenas montar o componente). Para isso usaremos a biblioteca jsdom.

```sh
npm install jsdom -D
```
Depois de instalar a biblioteca, precisamos configurar o vitest para usar ela. Para isso editamos o arquivo chamado vitest.config.js na raiz do projeto adicionando o seguinte conteúdo.

```js
export default defineConfig({
  ...
  test: {
    environment: "jsdom",
  },
});
```

Fazemos isso porque existem outros tipos de simuladores de DOM, como o happy-dom e o node.

Agora temos um código de teste que roda sem erros.

```js
import { expect, test } from "vitest";
import Logo from "./Logo.vue";

import { mount } from "@vue/test-utils";

test("Deve renderizar o componente Logo", () => {
  const wrapper = mount(Logo);
  expect(wrapper.text()).toContain("RG Academia");
});
```

### Métodos Mais Usados do Vue Test Utils

| Método | Descrição | Casos de Uso |
|--------|-----------|--------------|
| **`mount()`** | Monta o componente de forma completa (com componentes filhos) | Teste de componentes de forma realista |
| **`shallowMount()`** | Monta o componente isoladamente (stubs componentes filhos) | Teste unitário focado apenas no componente |
| **`find()`** | Encontra um elemento no DOM ou componente filho | Verificar se elemento existe ou buscar elementos |
| **`findAll()`** | Encontra todos os elementos que correspondem ao seletor | Listas, múltiplos elementos do mesmo tipo |
| **`get()`** | Similar ao find() mas lança erro se não encontrar | Quando o elemento deve existir obrigatoriamente |
| **`trigger()`** | Dispara eventos no elemento | Testar clicks, submits, inputs |
| **`setValue()`** | Define valor em inputs, selects e textareas | Testar formulários e two-way binding |
| **`setProps()`** | Atualiza as props do componente | Testar reatividade a mudanças de props |
| **`setData()`** | Modifica o data do componente | Testar mudanças no estado interno |
| **`emitted()`** | Verifica eventos emitidos pelo componente | Testar `this.$emit()` e comunicação |
| **`html()`** | Retorna o HTML renderizado | Verificar estrutura do DOM |
| **`text()`** | Retorna o texto content | Verificar conteúdo textual |
| **`isVisible()`** | Verifica se elemento está visível | Testar v-show, v-if |
| **`classes()`** | Retorna classes do elemento | Testar binding de classes |
| **`exists()`** | Verifica se elemento/componente existe | Condicionais de renderização |

### Exemplos Práticos:

```javascript
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

// Mount vs ShallowMount
const wrapper = mount(MyComponent, {
  props: { title: 'Hello' },
  data() { return { count: 0 } }
})

// Buscar elementos
const button = wrapper.find('button')
const inputs = wrapper.findAll('input')

// Disparar eventos
await button.trigger('click')
await input.trigger('keyup.enter')

// Trabalhar com formulários
await input.setValue('novo valor')

// Verificar emissão de eventos
expect(wrapper.emitted('submit')).toBeTruthy()
expect(wrapper.emitted('submit')[0]).toEqual(['dados'])

// Verificar props e data
await wrapper.setProps({ title: 'Novo Título' })
await wrapper.setData({ count: 5 })

// Verificar visibilidade e classes
expect(button.isVisible()).toBe(true)
expect(button.classes()).toContain('active')
```

### Quando Usar Cada Um:

- **`mount()`**: Testes de integração, componentes com filhos reais
- **`shallowMount()`**: Testes unitários puros, isolamento completo
- **`find()`/`get()`**: Busca condicional vs obrigatória
- **`trigger()`**: Interações do usuário
- **`setValue()`**: Formulários e inputs
- **`emitted()`**: Comunicação entre componentes


## Capitulo 3 - Testando componentes com interações

Para esse capitulo criaremos uma textarea que ao digitar, terá o contador de caracteres atualizado e limitado em 150 caracteres.

1º No componente App.vue incluimos o campo de texto e o contador.

```html
<textarea
  name="message"
  id="message"
  v-model="form.message"
  maxlength="150"
></textarea>
<p class="contador">{{ form.message.length }}/150</p>
```

2º Criamos o arquivo de teste. App.test.js e fazemos o importe do App.vue e do vitest e do vue test utils.

```js
//Importamos o componente App
import App from "./App.vue";
//Importamos o vitest e o vue test utils
import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
```


3º Agora iniciaremos o teste, testando a condição inicial do contador que tem que mostrar 0/150.

```js
test("Deve renderizar o contador com 0/150", () => {
  //Monto o componente
  const wrapper = mount(App);

  //Busco o elemento p com a class contador e pego o texto
  const retorno = wrapper.find(".contador").text();

  //Faço a asserção
  expect(retorno).toBe("0/150");
});
```

Nesse segundo teste iremos simular a digitação de um texto na textarea e verificar se o contador foi atualizado. Para isso usaremos o método setValue() do vue test utils.

```js
test("Deve renderizar o contador com 150/150", async () => {
  //Monto o componente
  const wrapper = mount(App);

  //Busco o elemento textarea e seto o valor
  const textareaElement = wrapper.find("textarea");
  await textareaElement.setValue("a".repeat(150));

  //Busco o elemento p com a class contador e pego o texto
  const retorno = wrapper.find(".contador").text();

  //Faço a asserção
  expect(retorno).toBe("150/150");
});
```




