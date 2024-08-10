import React from "react";
import "./Input.scss";
type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="input">
      <p
        style={required ? { color: "red" } : { color: "black" }}
        className="input-name"
      >
        {label}
      </p>
      <input
        type={type}
        className="additem-input-text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
