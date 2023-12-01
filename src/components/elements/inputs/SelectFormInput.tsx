import React from "react";
import { hasError, renderFieldError } from "./helper";
import { SelectOption } from "./model";

interface Props {
  label: string;
  name: string;
  selectOptions: SelectOption[];
  errors: any;
  value?: SelectOption;
  placeholder?: string;
  updateSelect: (name: string, value: any) => void;
  hasEmpty?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
}

const SelectFormInput: React.FC<Props> = ({
  label,
  name,
  selectOptions,
  errors,
  value,
  placeholder,
  updateSelect,
  hasEmpty = false,
  disabled = false,
  isRequired = false,
}) => {
  return (
    <div className="field">
      <label className="label">
        {label} {isRequired && <p>*</p>}
      </label>

      <div className="control">
        <div
          className={
            "select is-fullwidth" +
            (hasError(errors, name) ? " is-danger " : "")
          }
        >
          <select
            name={name}
            value={value?.value}
            onChange={(e) => updateSelect(name, e.currentTarget.value)}
            disabled={disabled}
          >
            {hasEmpty && <option></option>}
            {selectOptions.map((option, index) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {hasError(errors, name) && (
        <p className="help is-danger">{renderFieldError(errors, name)}</p>
      )}
    </div>
  );
};
export default SelectFormInput;
