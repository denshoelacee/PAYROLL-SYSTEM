import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

interface Row {
    employee_id: string | number;
    first_name: string;
    last_name: string;
}

interface Props {
    show: boolean;
    onClose: () => void;
    row: Row | null;
    onConfirm: () => void;
}

export default function EmployeeDeleteModal({ show, onClose, row, onConfirm }: Props) {
    const [loading, setLoading] = useState(false);

    if (!show || !row) return null;

    const handleConfirm = () => {
        setLoading(true);
        onConfirm();
        setLoading(false);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">
                Delete User {row.employee_id} - {row.first_name} {row.last_name}
            </h2>
            <IoMdClose
                onClick={onClose}
                className="cursor-pointer text-2xl text-white"
            />
            </div>

            {/* Message */}
            <p className="text-white mb-4">
            Are you sure you want to delete this user?
            </p>

            {/* Actions */}
            <div className="flex justify-evenly gap-3 py-3">
            <PrimaryButton
                className="py-2"
                onClick={handleConfirm}
                disabled={loading}
            >
                {loading ? "Deleting..." : "Confirm"}
            </PrimaryButton>
            <PrimaryButton
                className="py-2"
                onClick={onClose}
            >
                Close
            </PrimaryButton>
            </div>
        </div>
        </Modal>
    );
    }
