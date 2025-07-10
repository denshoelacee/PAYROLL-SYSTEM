import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput"; // your custom input

interface TextInputGroupProps {
  label: string;
  id: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  className?: string
}

export default function TextInputGroup({
  label,
  id,
  name,
  type = "text",
  disabled = false,
  className
}: TextInputGroupProps) {
  return (
    <div className="w-full">
      <InputLabel className="py-1 text-white" htmlFor={id}>
        {label}
      </InputLabel>
      <TextInput
        id={id}
        name={name || id}
        type={type}
        disabled={disabled}
        className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1"
      />
    </div>
  );
}
