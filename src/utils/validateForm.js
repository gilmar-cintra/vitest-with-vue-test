export const validateForm = (form) => {
  const errors = {};
  if (!form.name) {
    errors.name = "Nome é obrigatório";
   
  }
  if (!form.email) {
    errors.email = "Email é obrigatório";    
  }
  return errors;
};
