'use client';

import { useState, useEffect } from "react";

export default function Select({ fieldIndex, options, label, onChange }: any) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value); // <-- This sends the value back to the parent
  };

  return (
    <div className="w-full mb-2" key={fieldIndex}>
      <label className="block mb-2 text-sm text-gray-700 font-medium">{label}</label>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="" disabled>
          Please Select
        </option>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
