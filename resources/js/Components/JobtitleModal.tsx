// components/EditModal.tsx
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (value: any) => void;
  label: string;
  inputType?: "text" | "number" | "textarea" | "select";
  initialValue?: any;
  options?: string[]; // For select input
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'| '6xl';
}

export default function EditModal({
  show,
  onClose,
  onConfirm,
  label,
  inputType = "text",
  initialValue = "",
  options = [],
  maxWidth = "sm",
}: EditModalProps) {
  const [value, setValue] = useState(initialValue);
    
   const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
    }[maxWidth];
  const renderInput = () => {
    switch (inputType) {
      case "textarea":
        return (
          <textarea
            className="w-full p-2 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className="w-full p-2 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={inputType}
            className="w-full p-2 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
    }
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth={maxWidth} className={`${maxWidthClass}`}>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 text-white">Edit {label}</h2>
        <div className="mb-4 text-white">{renderInput()}</div>
        <div className="flex justify-evenly gap-3 py-3">
          <PrimaryButton className="py-2" onClick={() => onConfirm(value)}>
            Confirm
          </PrimaryButton>
          <PrimaryButton className="py-2" onClick={onClose}>
            Close
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
