import React from 'react';
import { hasError, renderFieldError, renderFieldErrorClass } from './helper';

interface Props {
   label: string;
   name: string;
   isRequired?: boolean;
   errors?: any;
   value?: string;
   placeholder?: string;
   disabled?: boolean;
   update?: (e: any) => void;
   tooltip?: string;
}

const TextFormInput: React.FC<Props> = ({
   label,
   name,
   errors,
   value,
   placeholder,
   disabled = false,
   update,
   isRequired = false,
   tooltip = ''
}) => {
   return (
      <div className="field">
         <label className="label">
            {label} {isRequired && <p>*</p>}
         </label>
         <div className="control">
            <span className="has-tooltip-arrow" {...(tooltip ? { 'data-tooltip': tooltip } : {})}>
               <input
                  name={name}
                  onChange={update}
                  className={'input ' + renderFieldErrorClass(errors, name)}
                  type="text"
                  disabled={disabled}
                  value={value}
                  placeholder={placeholder ? placeholder : label}
               />
            </span>
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default TextFormInput;
