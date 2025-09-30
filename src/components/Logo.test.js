import { expect, test } from "vitest";
import Logo from "./Logo.vue";

import { mount } from '@vue/test-utils'

test("Deve renderizar o componente Logo", () => {
  const wrapper = mount(Logo);
  expect(wrapper.text()).toContain("Casa da Salada");
});