import { useMemo, useState } from "react";
import { values, type Value } from "@/data/values";
import { ValueCard } from "./ValueCard";
import { Timer } from "./Timer";
import type { Comparison } from "@/utils/comparison";

interface ValuesComparisonProps {
  valueIdx1: number;
  valueIdx2: number;
  // TODO: this can just be the selection because the parent component has the information...
  onSelect: (winner: number, loser: number) => void;
  totalComparisons: number;
  currentComparison: number;
}

export function ValuesComparison({
  valueIdx1,
  valueIdx2,
  onSelect,
  totalComparisons,
  currentComparison,
}: ValuesComparisonProps) {
  const getValue = (index: number) => values[index];

  const value1 = useMemo(() => getValue(valueIdx1), [valueIdx1]);
  const value2 = useMemo(() => getValue(valueIdx2), [valueIdx2]);

  const handleSelect = (winner: number, loser: number) => {
    onSelect(winner, loser);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <div className="text-sm text-gray-500">
          {currentComparison} / {totalComparisons}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        {value1 && (
          <ValueCard
            value={value1}
            onClick={() => handleSelect(valueIdx1, valueIdx2)}
          />
        )}
        {value2 && (
          <ValueCard
            value={value2}
            onClick={() => handleSelect(valueIdx2, valueIdx1)}
          />
        )}
      </div>
    </div>
  );
}
