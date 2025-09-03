export default function Loader() {
  const backdrop = true;
  return (
    <>
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      {backdrop && <div className="absolute inset-0 backdrop-blur-sm z-0" />}
      <div className="w-12 h-12 border-4  inset-0 z-[9999] border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    </>
  );
}
