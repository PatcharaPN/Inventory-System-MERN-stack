import React from "react";
import "./Longinput.scss";
type CurrencyInputProps = {
  currency: string;
  amount: string;
  label: string;
  value: string;
  options: { value?: string; label?: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Longinput: React.FC<CurrencyInputProps> = ({
  amount,
  label,
  value,
  onChange,
  options,
  onChangeText,
}) => {
  return (
    <div className="label">
      <p>{label}</p>
      <div className="currency-input">
        <input
          className="longinput-text"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={onChangeText}
        />
        <select className="suffix-selector" value={value} onChange={onChange}>
          {options.map((options, index) => (
            <option key={index} value={options.value}>
              {options.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Longinput;
