export const validateForm = (form) => {
  const errors = {};
  if (!form.name || !form.name.trim()) {
    errors.name = "Nome é obrigatório";
   
  }


  if (!form.email || !form.email.trim()) {
    errors.email = "Email é obrigatório";    
  }
  return errors;
};
