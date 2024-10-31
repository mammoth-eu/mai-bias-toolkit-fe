import { Component, Domain, SelectionsForm } from './model-steps/model';
import { SelectOption } from '../elements/inputs/model';
import { ReactNode } from 'react';
import TextFormInput from '../elements/inputs/TextFormInput';
import NumberFormInput from '../elements/inputs/NumberFormInput.tsx';
import BooleanFormInput from '../elements/inputs/BooleanFormInput.tsx';

export const getSelectList = (res: Component[] | Domain[]): SelectOption[] => {
   const o: SelectOption[] = [];
   res.forEach((r) => o.push({ label: r.name, value: r.id }));
   return o;
};

export const getSelectListValue = (res: SelectOption[], value: number | string): SelectOption | undefined => {
   const v = res.find((r) => r.value === value);
   if (!v) return undefined;
   return v;
};

export const isAtLeastOneSelected = (form: SelectionsForm): boolean => {
   return (
      Object.keys(form).find((key) => {
         return key !== 'uuid' && key !== 'step' && !key.endsWith('_parameters_value') && form[key];
      }) !== undefined
   );
};

export const printIsoDate = (date: string): string => {
   const d: Date = new Date(date);
   return d.toDateString() + ' ' + d.toLocaleTimeString();
};

export function renderSwitchInputForm(
   type: string,
   name: string,
   field: string,
   formSubmit: any,
   isDecimal?: boolean
): ReactNode {
   switch (type) {
      case 'string':
         return (
            <TextFormInput
               key={name}
               name={name}
               label={name}
               value={formSubmit.form[field][name]}
               update={(event) => formSubmit.updateField(field, event)}
               errors={formSubmit.errors}
               placeholder={name}
            />
         );
      case 'number':
         return (
            <NumberFormInput
               key={name}
               name={name}
               label={name}
               value={formSubmit.form[field][name]}
               update={(event) => formSubmit.updateNumberField(field, event)}
               errors={formSubmit.errors}
               placeholder={name}
               step={isDecimal ? 0.1 : 1}
            />
         );
      case 'boolean':
         return (
            <BooleanFormInput
               key={name}
               name={name}
               label={name}
               errors={formSubmit.errors}
               checked={!!formSubmit.form[field][name]}
               update={(event) => formSubmit.updateCheckField(field, event)}
            />
         );
      default:
         return;
   }
}
