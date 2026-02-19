export default function TextArea({
  label,
  id,
  onChange,
  placeholder = "",
  value = "",
  required = false,
}: {
  label: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-start text-[16px]">
      <label htmlFor={id}>
        {label}{" "}
        {required && !value && <span className="text-[#ce2222]">*</span>}
      </label>
      <textarea
        value={value}
        className="w-full text-[16px] border border-[#D9D9D9] bg-[#8C8C8C] rounded-[5px] px-3 py-1 placeholder:text-[#ABABAB] outline-none focus:outline-none focus:ring-0"
        placeholder={placeholder || ""}
        id={id}
        onChange={onChange}
        rows={2}
        required={required}
      />
    </div>
  );
}
