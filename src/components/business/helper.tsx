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
         return (
            key !== 'uuid' && key !== 'step' && key !== 'addedFields' && !key.endsWith('_parameters_value') && form[key]
         );
      }) !== undefined
   );
};

export const printIsoDate = (date: string): string => {
   const d: Date = new Date(date);
   return d.toDateString() + ' ' + d.toLocaleTimeString();
};

export const getDescription = (description: string) => {
   if (!description) {
      return description;
   }
   const index = description.indexOf('Args:');
   if (index === -1) {
      return description;
   }
   return description.slice(0, index).trim();
};

export const getAttributesDescription = (description: string) => {
   const result: { [key: string]: string } = {};
   if (!description) {
      return result;
   }
   const startIndex = description.indexOf('Args:');
   const endIndex = description.indexOf('Options:');
   let argsSection = '';
   if (startIndex === -1) {
      return result;
   } else if (startIndex !== -1 && (endIndex === -1 || (endIndex !== -1 && endIndex <= startIndex))) {
      argsSection = description.slice(startIndex + 'Args:'.length).trim();
   } else if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
      argsSection = description.slice(startIndex + 'Args:'.length, endIndex).trim();
   }
   const lines = argsSection.split('\n');
   for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
         const match = trimmedLine.match(/^(\w+):\s*(.+)$/);
         if (match) {
            result[match[1]] = match[2];
         }
      }
   }
   return result;
};

export const getOptionsDescription = (description: string) => {
   const result: { [key: string]: string[] } = {};
   if (!description) {
      return result;
   }
   const index = description.indexOf('Options:');
   if (index === -1) {
      return result;
   }
   const optionsSection = description.slice(index + 'Options:'.length).trim();
   const lines = optionsSection.split('\n');
   for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
         const match = trimmedLine.match(/^(\w+):\s*(.+)$/);
         if (match) {
            result[match[1]] = match[2].split(',').map((value) => value.trim());
         }
      }
   }
   return result;
};

export const getParametersInfo = (loaders: Component[], id: string) => {
   return loaders.find((l) => l.id === id)!.parameter_info;
};

export function renderSwitchInputForm(
   type: string,
   name: string,
   field: string,
   formSubmit: any,
   isDecimal?: boolean,
   tooltip?: string,
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
               tooltip={tooltip}
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
               tooltip={tooltip}
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
               tooltip={tooltip}
            />
         );
      default:
         return;
   }
}
