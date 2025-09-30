import { expect, test } from "vitest";
import Logo from "./Logo.vue";

import { mount } from '@vue/test-utils'

test("Deve renderizar o componente Logo", () => {

  //Monto o componente
  const wrapper = mount(Logo);

  //Busco o elemento p e pego o texto (busco e pego o que quero)
  const retorno = wrapper.find("p").text();
 
  //Faço a asserção
  expect(retorno).toBe("Casa da Salada");
});