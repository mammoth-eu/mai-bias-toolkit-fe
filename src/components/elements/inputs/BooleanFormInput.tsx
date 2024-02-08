import React from 'react';
import { hasError, renderFieldError } from './helper';

interface Props {
   label: string;
   name: string;
   errors?: any;
   checked?: boolean;
   disabled?: boolean;
   update?: (e: any) => void;
   isRequired?: boolean;
}

const BooleanFormInput: React.FC<Props> = ({
   label,
   name,
   errors,
   checked,
   disabled = false,
   update,
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
               // className={"input " + renderFieldErrorClass(errors, name)}
               type="checkbox"
               disabled={disabled}
               checked={checked}
            />
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default BooleanFormInput;
