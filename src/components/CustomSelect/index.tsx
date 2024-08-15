import React, { useState } from 'react';
import './CustomSelect.css'; 

interface CustomSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, label }) => {
  return (
    <div className="custom-select">
      <label className="custom-select-label">{label}</label>
      <select className="custom-select-dropdown" value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
