import { useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import TextInputGroup from "./TextInputGroup";

type ActionType = 'Department' | 'Designation' | 'EmploymentType';

type Props = {
  show: boolean;
  onClose: () => void;
  onClick: (data: { actionType: ActionType; value: string }) => void;
  actionType: ActionType;
};

export default function JobTitlesModal({ show, onClose, onClick, actionType }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onClick({ actionType, value: inputValue });
      setInputValue("");
    }
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Add {actionType}</h2>
        <TextInputGroup
          id={actionType}
          label={actionType}
          type="text"
          name={actionType}
          placeholder={`Enter ${actionType}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-3">
          <PrimaryButton onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={handleSubmit}>
            Submit
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
