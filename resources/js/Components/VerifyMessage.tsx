type VerifyMessage = {
    message?: string;
};

export default function VerifyMessage({ message }: VerifyMessage) {
    if (!message) return null;

    return (
        <div className="text-red-600 text-sm mb-3">
            {message}
        </div>
    );
}
