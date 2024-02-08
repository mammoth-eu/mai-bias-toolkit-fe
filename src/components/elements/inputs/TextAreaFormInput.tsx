import React from 'react';
import { hasError, renderFieldError, renderFieldErrorClass } from './helper';

interface Props {
   label: string;
   name: string;
   errors?: any;
   value?: string;
   placeholder?: string;
   disabled?: boolean;
   rows?: number;
   cols?: number;
   update?: (e: any) => void;
}

const TextAreaFormInput: React.FC<Props> = ({
   label,
   name,
   errors,
   value,
   placeholder,
   disabled = false,
   rows,
   cols,
   update
}) => {
   return (
      <div className="field">
         <label className="label">{label}</label>
         <div className="control">
            <textarea
               name={name}
               onChange={update}
               className={'textarea ' + renderFieldErrorClass(errors, name)}
               disabled={disabled}
               rows={rows}
               cols={cols}
               value={value}
               placeholder={placeholder ? placeholder : label}
            />
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default TextAreaFormInput;
