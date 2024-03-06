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
   let isAtLeastOneSelected = false;
   const keys = Object.keys(form);
   for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'uuid' && !keys[i].endsWith('_parameters_value') && form[keys[i]]) {
         isAtLeastOneSelected = true;
         break;
      }
   }
   return isAtLeastOneSelected;
};
