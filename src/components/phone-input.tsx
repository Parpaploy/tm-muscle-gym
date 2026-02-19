import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function PhoneInput({
  label,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const [countryCode, setCountryCode] = useState<string>("+66");

  return (
    <div className="flex flex-col items-start text-[16px] w-full">
      <label htmlFor={id}>
        {label}{" "}
        {required && !value && <span className="text-[#ce2222]">*</span>}
      </label>

      <div className="relative flex w-full border border-[#D9D9D9] rounded-[5px] bg-[#8C8C8C] overflow-hidden">
        <div className="flex items-center">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="relative appearance-none bg-[#8C8C8C] pl-2 outline-none text-[#A6A6A6]"
          >
            <option value="+66">🇹🇭&nbsp;&nbsp;&nbsp;&nbsp;+66</option>
            <option value="+1">🇺🇸&nbsp;&nbsp;&nbsp;&nbsp;+1</option>
            <option value="+81">🇯🇵&nbsp;&nbsp;&nbsp;&nbsp;+81</option>
          </select>

          <span className="pointer-events-none absolute left-8 text-[#515151]">
            <IoIosArrowDown size={10} />
          </span>
        </div>

        <input
          id={id}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#8C8C8C] px-3 py-1 outline-none text-white placeholder:text-[#C6C6C6]"
          required={required}
        />
      </div>
    </div>
  );
}
