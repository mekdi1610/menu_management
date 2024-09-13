import React from 'react';

const TextInput = ({ label, value, onChange, name, disabled }) => (
  <div className="mb-4">
    <label className="block text-gray-700 rounded-lg mb-2">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
    />
  </div>
);

export default TextInput;
