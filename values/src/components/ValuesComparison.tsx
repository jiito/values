import { useState } from "react";
import type { Value } from "@/data/values";
import { ValueCard } from "./ValueCard";
import { Timer } from "./Timer";
import type { Comparison } from "@/utils/comparison";

interface ValuesComparisonProps {
  value1: Value;
  value2: Value;
  onSelect: (comparison: Comparison) => void;
  totalComparisons: number;
  currentComparison: number;
}

export function ValuesComparison({
  value1,
  value2,
  onSelect,
  totalComparisons,
  currentComparison,
}: ValuesComparisonProps) {
  const [selectedValue, setSelectedValue] = useState<Value | null>(null);
  
  const handleSelect = (value: Value) => {
    setSelectedValue(value);
    onSelect({
      value1,
      value2,
      winner: value,
    });
  };
  
  const handleTimeUp = () => {
    // If time is up and no selection was made, randomly select one
    if (!selectedValue) {
      const randomValue = Math.random() > 0.5 ? value1 : value2;
      handleSelect(randomValue);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <div className="text-sm text-gray-500">
          {currentComparison} / {totalComparisons}
        </div>
      </div>
      
      <Timer duration={15} onTimeUp={handleTimeUp} />
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <ValueCard 
          value={value1} 
          onClick={() => handleSelect(value1)} 
          isSelected={selectedValue?.id === value1.id}
        />
        <ValueCard 
          value={value2} 
          onClick={() => handleSelect(value2)} 
          isSelected={selectedValue?.id === value2.id}
        />
      </div>
    </div>
  );
}
