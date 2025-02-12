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
   tooltip?: string;
   formatTooltip?: boolean;
}

const BooleanFormInput: React.FC<Props> = ({
   label,
   name,
   errors,
   checked,
   disabled = false,
   update,
   isRequired = false,
   tooltip = '',
   formatTooltip = false
}) => {
   return (
      <div className="field">
         <div className="control">
            <span
               className={`has-tooltip has-tooltip-arrow ${formatTooltip ? 'has-tooltip-text-centered has-tooltip-multiline custom-tooltip-width' : ''}`}
               {...(tooltip ? { 'data-tooltip': tooltip } : {})}
            >
               <input
                  name={name}
                  onChange={update}
                  // className={"input " + renderFieldErrorClass(errors, name)}
                  type="checkbox"
                  disabled={disabled}
                  checked={checked}
               />{' '}
               <label className="label">
                  {label} {isRequired && <p>*</p>}
               </label>
            </span>
         </div>
         {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
      </div>
   );
};
export default BooleanFormInput;
