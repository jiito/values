import type { Value } from "@/data/values";

interface ValueCardProps {
  value: Value;
  onClick: () => void;
  isSelected?: boolean;
}

export function ValueCard({ value, onClick, isSelected }: ValueCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        border border-gray-300 rounded-md p-4 min-w-[200px] 
        transition-all duration-200 ease-in-out
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400 hover:bg-gray-50'}
      `}
    >
      <div className="text-center">{value.name}</div>
    </button>
  );
}
