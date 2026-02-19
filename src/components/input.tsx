export default function Input({
  label,
  id,
  isPassword = false,
  onChange,
  type = "",
  placeholder = "",
  value = "",
  required = false,
  autoComplete = "off",
}: {
  label: string;
  id: string;
  isPassword?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col justify-center items-start text-[16px]">
      <label htmlFor={id}>
        {label}{" "}
        {required && !value && <span className="text-[#ce2222]">*</span>}
      </label>
      <input
        value={value}
        className="w-full text-[16px] border border-[#D9D9D9] rounded-[5px] bg-[#8C8C8C] px-3 py-1 placeholder:text-[#ABABAB] outline-none focus:outline-none focus:ring-0"
        placeholder={placeholder || ""}
        type={isPassword ? "password" : type || "text"}
        id={id}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
