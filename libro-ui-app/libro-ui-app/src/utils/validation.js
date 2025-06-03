export const validateRequired = (value) => {
  return value && value.trim() !== '' ? null : 'Este campo es obligatorio';
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength
    ? null
    : `La longitud mínima es de ${minLength} caracteres`;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength
    ? null
    : `La longitud máxima es de ${maxLength} caracteres`;
};

export const validateForm = (fields, validations) => {
  const errors = {};

  for (const field in validations) {
    for (const validation of validations[field]) {
      const error = validation(fields[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
};