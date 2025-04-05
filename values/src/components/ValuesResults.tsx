import type { Value } from "@/data/values";

interface ValuesResultsProps {
  rankedValues: Value[];
  onReset: () => void;
}

export function ValuesResults({ rankedValues, onReset }: ValuesResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <h2 className="text-2xl font-bold">Your Value Rankings</h2>
      
      <div className="w-full max-w-md">
        {rankedValues.map((value, index) => (
          <div 
            key={value.id}
            className="flex items-center justify-between p-3 border-b border-gray-200"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">{index + 1}.</span>
              <span>{value.name}</span>
            </div>
            <span className="text-sm text-gray-500">Score: {value.score}</span>
          </div>
        ))}
      </div>
      
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        Start Over
      </button>
    </div>
  );
}
