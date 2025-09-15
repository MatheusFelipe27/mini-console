import { IoChevronDown } from "react-icons/io5";

interface TableFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}

const TableFilterSelect = ({
  value,
  onChange,
  options,
}: TableFilterSelectProps) => {

  return (
    <>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 text-white font-[400] outline-none bg-gray-500
            text-[14px] py-2 rounded-[24px] pr-10 appearance-none cursor-pointer
          "
        >
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
