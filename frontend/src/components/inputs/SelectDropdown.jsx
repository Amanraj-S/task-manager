import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle selection
  const handleSelect = (optionValue) => {
    if (multiSelect) {
      let newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(optionValue)) {
        newValue = newValue.filter((v) => v !== optionValue);
      } else {
        newValue.push(optionValue);
      }
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // Display selected label(s)
  const renderSelected = () => {
    if (multiSelect && Array.isArray(value) && value.length > 0) {
      return options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ");
    }
    if (!multiSelect && value) {
      return options.find((opt) => opt.value === value)?.label;
    }
    return placeholder;
  };

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-black outline-none bg-white border border-slate-200 px-3 py-3 rounded-md mt-2 flex justify-between items-center"
      >
        <span className="truncate">{renderSelected()}</span>
        <LuChevronDown
          className={`ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute w-full bg-white border border-slate-200 rounded-md mt-1 shadow-md z-10 max-h-48 overflow-y-auto">
          {options.map((option) => {
            const isSelected = multiSelect
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value;
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-100 ${
                  isSelected ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option.label}
                {isSelected && (
                  <span className="text-blue-500 text-xs">✔</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
