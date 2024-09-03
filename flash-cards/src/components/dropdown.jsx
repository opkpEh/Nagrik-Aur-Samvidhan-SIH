import React from 'react';

export const Dropdown = ({ options, value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
