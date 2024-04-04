import { Component, Domain, SelectionsForm } from './model-steps/model';
import { SelectOption } from '../elements/inputs/model';

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
