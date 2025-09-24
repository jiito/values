import type { Value } from "@/data/values";

interface ValueCardProps {
  value: Value;
  onClick: () => void;
}

export function ValueCard({ value, onClick }: ValueCardProps) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[200px] rounded-md border border-gray-300 p-4 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50`}
    >
      <div className="text-center">{value.name}</div>
    </button>
  );
}
