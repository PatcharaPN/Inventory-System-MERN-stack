import React from "react";
import "./Selecter.scss";

type SelectInputProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: any;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-selector">
      <p className="selector-input-name">{label || placeholder}</p>
      <select className="input-select" value={value} onChange={onChange}>
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
