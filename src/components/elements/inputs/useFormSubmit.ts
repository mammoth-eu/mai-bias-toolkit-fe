import { useState } from 'react';

export interface Validation {
   isValid: (value: any) => boolean;
   message: string;
}

// UPDATED_STATE is a state after the INITIAL_STATE.
// IMPORTANT: when resetting we put INITIAL_STATE and not the UPDATE_STATE
export function useFormSubmit<T>(INITIAL_STATE: T, VALIDATION: any, UPDATED_STATE?: any) {
   const [form, setForm] = useState(UPDATED_STATE ? UPDATED_STATE : INITIAL_STATE);
   const [validation, setValidation] = useState(VALIDATION);
   const [errors, setErrors] = useState({});

   const update = (event: any) => {
      setForm({
         ...form,
         [event.target.name]: event.target.value
      });
   };

   const updateNumber = (event: any) => {
      setForm({
         ...form,
         [event.target.name]: Number(event.target.value)
      });
   };

   const updateSimple = (name: string, value: any) => {
      setForm({
         ...form,
         [name]: value
      });
   };

   const updateSelect = (event: any, name: string) => {
      console.log(name);
      console.log(event);
      setForm({
         ...form,
         [name]: event.value
      });
   };

   const updateCheck = (event: any) => {
      setForm({
         ...form,
         [event.target.name]: event.target.checked
      });
   };

   const bulkUpdate = (m: NonNullable<T>) => {
      setForm({
         ...form,
         ...m
      });
   };

   const reset = () => {
      setForm(INITIAL_STATE);
      setErrors({});
   };

   return {
      form,
      setForm,
      validation,
      setValidation,
      errors,
      setErrors,
      update,
      updateNumber,
      updateSelect,
      updateCheck,
      bulkUpdate,
      updateSimple,
      reset
   };
}
