import React, { ChangeEvent } from 'react';
import './CustomTextField.css'; // Import CSS for styling

interface CustomTextFieldProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ id, label, type, value, onChange }) => {
  return (
    <div className="custom-textfield">
      <label htmlFor={id} className="custom-textfield-label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="custom-textfield-input"
      />
    </div>
  );
};

export default CustomTextField;
