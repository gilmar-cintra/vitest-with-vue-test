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

test("Deve retornar erro de nome caso o nome for undefined", () => {
  const form = {
    name: undefined,
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});

test("Deve retornar erro de email caso o email for undefined", () => {
  const form = {
    name: "Nome",
    email: undefined,
  };
  
  expect(validateForm(form)).toEqual({ email: "Email é obrigatório" });
});


test("Deve retornar erro de nome se o nome for espaço vazio", () => {
  const form = {
    name: " ",
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});

test("Deve retornar erro de email se o email for espaço vazio", () => {
  const form = {
    name: "Nome",
    email: " ",
  };
  
  expect(validateForm(form)).toEqual({ email: "Email é obrigatório" });
});

test("Deve retornar erro de nome se o nome for vários espaços vazios", () => {
  const form = {
    name: "     ",
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});

test("Deve retornar erro de email se o email for vários espaços vazios", () => {
  const form = {
    name: "Nome",
    email: "     ",
  };
  
  expect(validateForm(form)).toEqual({ email: "Email é obrigatório" });
});


test("Deve retornar erro de nome se o nome for null", () => {
  const form = {
    name: null,
    email: "email@email.com",
  };
  
  expect(validateForm(form)).toEqual({ name: "Nome é obrigatório" });
});

test("Deve retornar erro de email se o email for null", () => {
  const form = {
    name: "Nome",
    email: null,
  };
  
  expect(validateForm(form)).toEqual({ email: "Email é obrigatório" });
});


