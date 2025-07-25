import { useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import { GridColDef } from "@mui/x-data-grid";
import TextInputGroup from "./TextInputGroup";

type ActionType = 'Department' | 'Designation' | 'Employment Type';

type JobTitlesProps = {
  show: boolean;
  onClose: () => void;
  onClick?: (data: any) => void;
  actionType: ActionType;
  selectedRow?: GridColDef[];
};

export default function JobTitlesModal({
  show,
  onClose,
  onClick,
  actionType,
  selectedRow
}: JobTitlesProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmitAction = () => {
    if (onClick) {
      onClick({
        actionType,
        value: inputValue
      });
    }
    onClose(); // Let parent handle closing
  };

  const getTitle = () => {
    switch (actionType) {
      case "Department":
        return "Add Department";
      case "Designation":
        return "Add Designation";
      case "Employment Type":
        return "Add Employment Type";
      default:
        return "Add";
    }
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">{getTitle()}</h2>

        <TextInputGroup
            id={`${actionType}`}
            label={`${actionType}`}
            type="text"
            name={actionType}
            placeholder={`Enter ${actionType}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-3">
          <PrimaryButton
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={handleSubmitAction}>Submit</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
