import React from 'react';
import { hasError, renderFieldError, renderFieldErrorClass } from './helper';

interface Props {
   label: string;
   name: string;
   errors?: any;
   value?: string;
   placeholder?: string;
   disabled?: boolean;
   update?: (e: any) => void;
   min?: number;
   max?: number;
   step?: number;
   isRequired?: boolean;
}

const NumberFormInput: React.FC<Props> = ({
   label,
   name,
   errors,
   value,
   placeholder,
   disabled = false,
   update,
   min = undefined,
   max = undefined,
   step = 1,
   isRequired = false
}) => {
   return (
      <div className="field">
         <label className="label">
            {label} {isRequired && <p>*</p>}
         </label>
         <div className="control">
            <input
               name={name}
               onChange={update}
               className={'input ' + renderFieldErrorClass(errors, name)}
               type="number"
               disabled={disabled}
               value={value ? value : ''}
               placeholder={placeholder ? placeholder : label}
               min={min}
               max={max}
               step={step}
            />
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default NumberFormInput;
