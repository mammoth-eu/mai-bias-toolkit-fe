import { Multiselect } from 'multiselect-react-dropdown';
import { hasError, renderFieldError } from './helper';

interface Props<T> {
   name: string;
   displayValue?: string;
   idValue?: string;
   label?: string;
   placeholder?: string;
   options: T[];
   value?: T[];
   errors?: any;
   update?: (name: string, value: any) => void;
   disabled?: boolean;
   isRequired?: boolean;
}

export function MultiSelectFormInput<T>({
   name,
   label,
   displayValue = 'name',
   idValue = 'id',
   placeholder = '',
   options,
   value,
   errors,
   update,
   disabled = false,
   isRequired = false
}: Props<T>) {
   const onSelect = (selectedList: T[]) => {
      if (update)
         update(
            name,
            selectedList.map((s: T) => s[idValue as keyof T])
         );
   };

   const onRemove = (selectedList: T[]) => {
      if (update)
         update(
            name,
            selectedList.map((s: T) => s[idValue as keyof T])
         );
   };

   return (
      <>
         <div className="field">
            <label className="label">
               {label}
               {isRequired && <p>*</p>}
            </label>
            <div className="control">
               <Multiselect
                  options={options} // Options to display in the dropdown
                  placeholder={placeholder}
                  selectedValues={value} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue={displayValue} // Property name to display in the dropdown options
                  disable={disabled}
               />
            </div>

            {hasError(errors, name) && <p className="help is-danger">{renderFieldError(errors, name)}</p>}
         </div>
      </>
   );
}

export default MultiSelectFormInput;
