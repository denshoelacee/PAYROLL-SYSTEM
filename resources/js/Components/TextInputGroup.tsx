import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput"; 

interface TextInputGroupProps {
  label: string;
  id: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  value?: any;
  inputMode?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Optional placeholder prop
}

export default function TextInputGroup({
  label,
  id,
  name,
  type = "text",
  disabled = false,
  value,
  inputMode,
  placeholder = "", // Default to empty string if not provided
  onChange= () =>{}
  
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
        value={value}
        inputMode={inputMode}
        onChange={onChange}
        className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1 "
        placeholder={placeholder} // Use the placeholder prop here
      />
    </div>
  );
}
