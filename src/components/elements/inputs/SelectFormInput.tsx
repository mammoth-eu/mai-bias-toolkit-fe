import React from 'react';
import { hasError, renderFieldError } from './helper';
import { SelectOption } from './model';

interface Props {
   label: string;
   name: string;
   selectOptions: SelectOption[];
   errors?: any;
   value?: SelectOption;
   placeholder?: string;
   updateSelect: (name: string, value: any, field?: string) => void;
   hasEmpty?: boolean;
   disabled?: boolean;
   isRequired?: boolean;
   tooltip?: string;
   formatTooltip?: boolean;
   field?: string;
}

const SelectFormInput: React.FC<Props> = ({
   label,
   name,
   selectOptions,
   errors,
   value,
   placeholder = '',
   updateSelect,
   hasEmpty = false,
   disabled = false,
   isRequired = false,
   tooltip = '',
   formatTooltip = false,
   field
}) => {
   return (
      <div className="field">
         <label className="label">
            {label} {isRequired && <p>*</p>}
         </label>

         <div className="control">
            <span
               className={`has-tooltip has-tooltip-arrow ${formatTooltip ? 'has-tooltip-text-centered has-tooltip-multiline custom-tooltip-width' : ''}`}
               {...(tooltip && { 'data-tooltip': tooltip })}
            >
               <div className={'select is-fullwidth' + (hasError(errors, name) ? ' is-danger ' : '')}>
                  <select
                     name={name}
                     value={value?.value}
                     onChange={(e) => updateSelect(name, e.currentTarget.value, field)}
                     disabled={disabled}
                  >
                     {hasEmpty && <option></option>}
                     {selectOptions.map((option) => {
                        return (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        );
                     })}
                     {placeholder && (
                        <option value={''} disabled selected hidden>
                           {placeholder}
                        </option>
                     )}
                  </select>
               </div>
            </span>
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default SelectFormInput;
