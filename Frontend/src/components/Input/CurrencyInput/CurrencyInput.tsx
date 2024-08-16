import React from "react";
import "./CurrencyInput.scss";

type CurrencyInputProps = {
  currency: string;
  amount: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  label,
  value,
  onChange,
  options,
  onChangeText,
}) => {
  return (
    <div className="currency-input-wrapper">
      <p>{label}</p>
      <div className="currency-input">
        <select className="currency-select" value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          className="currency-input-text"
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={onChangeText}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
