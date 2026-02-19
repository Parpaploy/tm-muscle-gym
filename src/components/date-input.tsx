import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
  label,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string;
  id: string;
  value: number | null;
  onChange: (value: number | null) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col items-start text-[16px] w-full">
      <label htmlFor={id}>
        {label}{" "}
        {required && !value && <span className="text-[#ce2222]">*</span>}
      </label>

      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date: Date | null) => {
          if (date) {
            onChange(date.getTime());
          } else {
            onChange(null);
          }
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        wrapperClassName="w-full"
        className="w-full text-[16px] bg-[#8C8C8C] text-white placeholder:text-[#ABABAB] px-3 py-1 rounded-[5px] border border-[#D9D9D9] outline-none"
      />
    </div>
  );
}
