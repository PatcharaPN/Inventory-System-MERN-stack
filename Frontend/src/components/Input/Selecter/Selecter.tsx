import React from "react";
import "./Selecter.scss";

type SelectInputProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string; // Add placeholder prop
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
      <p className="selector-input-name">{label}</p>
      <select className="input-select" value={value} onChange={onChange}>
        <option value="" disabled>
          {placeholder}
        </option>
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
