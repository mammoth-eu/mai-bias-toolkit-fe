const hasError = (errorFields: any, name: any) => {
  if (!errorFields) {
    return false;
  }
  return !!errorFields[name as keyof typeof errorFields]?.length;
};

const renderFieldError = (errorFields: any, name: any) => {
  if (!errorFields) {
    return "";
  }
  if (!errorFields[name as keyof typeof errorFields]?.length) {
    return "";
  }

  return errorFields[name as keyof typeof errorFields][0].message;
};

const renderFieldErrorClass = (errorFields: any, name: string) => {
  if (!errorFields) {
    return "";
  }
  if (!errorFields[name as keyof typeof errorFields]?.length) {
    return "";
  }
  return " is-danger ";
};

const getErrorFields = (form: any, VALIDATION: any) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key as keyof typeof VALIDATION]) return acc;

    const errorsPerField = VALIDATION[key as keyof typeof VALIDATION]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation: any) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField: any) => !errorPerField.isValid);
    return { ...acc, [key]: errorsPerField };
  }, {});

export { hasError, renderFieldError, renderFieldErrorClass, getErrorFields };
