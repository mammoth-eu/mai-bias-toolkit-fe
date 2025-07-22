import { Component, Domain, SelectionsForm } from './model-steps/model';
import { SelectOption } from '../elements/inputs/model';
import { ReactNode } from 'react';
import TextFormInput from '../elements/inputs/TextFormInput';
import NumberFormInput from '../elements/inputs/NumberFormInput.tsx';
import BooleanFormInput from '../elements/inputs/BooleanFormInput.tsx';
import SelectFormInput from '../elements/inputs/SelectFormInput.tsx';
import { marked } from 'marked';
marked.setOptions({ async: false });

export const getSimplifiedName = (name: string) => {
   //if(name.startsWith("model ")) name = name.substring(6);
   //if(name.startsWith("data ")) name = name.substring(5);
   return name;
}

export const getSelectList = (res: Component[] | Domain[]): SelectOption[] => {
   const o: SelectOption[] = [];
   res.forEach((r) => o.push({ label: getSimplifiedName(r.name), value: r.id }));
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
   if(d.getFullYear()<2000) return '';
   return d.toDateString() + ' ' + d.toLocaleTimeString();
};


export const getDescription = (description: string) => {
  if (!description) return description;
  const index = description.indexOf('Args:');
  if (index !== -1) description = description.slice(0, index);
  let ret : string = marked(description.trim()) as string;  // this is assignable because we removed marked async above
  return ret;
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
   if (!description) return result;
   const index = description.indexOf('Options:');
   if (index === -1) return result;
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
   options?: string[]
): ReactNode {
   let label_name = name.replace(/_/g, ' ');
   if(label_name.startsWith("model ")) label_name = label_name.slice(6);
   if(label_name.startsWith("data ")) label_name = label_name.slice(5);
   switch (type) {
      case 'string':
         return (
            <TextFormInput
               key={name}
               name={name}
               label={label_name}
               value={formSubmit.form[field][name]=="None"?"":formSubmit.form[field][name]}
               update={(event) => formSubmit.updateField(field, event)}
               errors={formSubmit.errors}
               placeholder={label_name}
               tooltip={tooltip}
               formatTooltip
            />
         );
      case 'number':
         return (
            <NumberFormInput
               key={name}
               name={name}
               label={label_name}
               value={formSubmit.form[field][name]}
               update={(event) => formSubmit.updateNumberField(field, event)}
               errors={formSubmit.errors}
               placeholder={label_name}
               step={isDecimal ? 0.1 : 1}
               tooltip={tooltip}
               formatTooltip
            />
         );
      case 'boolean':
         return (
            <BooleanFormInput
               key={name}
               name={name}
               label={label_name}
               errors={formSubmit.errors}
               checked={!!formSubmit.form[field][name]}
               update={(event) => formSubmit.updateCheckField(field, event)}
               tooltip={tooltip}
               formatTooltip
            />
         );
      case 'select': {
         const selectOptions: SelectOption[] = [];
         options!.filter(o => o !== 'None').forEach((o) => selectOptions.push({ label: o, value: o }));
         if(!formSubmit.form[field][name] && selectOptions[0]?.label!='None') formSubmit.updateSimpleField(label_name, selectOptions[0]?.label);
         return (
            <SelectFormInput
               key={name}
               name={name}
               label={label_name}
               selectOptions={selectOptions}
               value={selectOptions.find((o) => o.value === formSubmit.form[field][name])}
               errors={formSubmit.errors}
               placeholder={selectOptions[0]?.label}
               updateSelect={formSubmit.updateSimpleField}
               tooltip={tooltip}
               formatTooltip
               field={field}
            />
         );
      }
      default:
         return;
   }
}
