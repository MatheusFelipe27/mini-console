import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

interface TableFilterSelectProps {
  initialState: string;
  onChange?: (value: string) => void;
  options?: string[];
}

const TableFilterSelect = ({
  initialState,
  onChange,
  options,
}: TableFilterSelectProps) => {
  const [selectedStatus, setSelectedStatus] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <>
      <div className="relative">
        <select
          value={selectedStatus}
          onChange={handleChange}
          className="px-3 text-white font-[400] outline-none bg-gray-500
            text-[14px] py-2 rounded-[24px] pr-10 appearance-none cursor-pointer
          "
        >
          <option className="text-white bg-gray-500" value={initialState}>{initialState}</option>
          {options?.map((opt, idx) => (
            <option key={idx} value={opt} className="text-white bg-gray-500">
              {opt}
            </option>
          ))}
        </select>
        <IoChevronDown
          size={14}
          className="absolute right-2 bg-transparent top-1/2 -translate-y-1/2 pointer-events-none text-white"
        />
      </div>
    </>
  );
};

export default TableFilterSelect;
