//Importamos o componente App
import App from "./App.vue";
//Importamos o vitest e o vue test utils
import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";

test("Deve renderizar o contador com 0/150", () => {
  //Monto o componente
  const wrapper = mount(App);

  //Busco o elemento p com a class contador e pego o texto
  const cotador = wrapper.find(".contador").text();

  //Faço a asserção
  expect(cotador).toBe("0/150");
});

test("Deve renderizar o contador com 150/150", async () => {
  //Monto o componente
  const wrapper = mount(App);

    //Busco o elemento textarea e seto o valor
  const textareaElement = wrapper.find("textarea");

   // O await é necessário para que o setValue aguarde o evento de input ser disparado
  await textareaElement.setValue('a'.repeat(150));

  //Busco o elemento p com a class contador e pego o texto
  const contator = wrapper.find(".contador").text();
 
  //Faço a asserção
  expect(contator).toBe("150/150");
});



