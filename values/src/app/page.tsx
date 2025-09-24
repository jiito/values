"use client";

import { useState, useEffect, useMemo } from "react";
import { values } from "@/data/values";
import { ValuesComparison } from "@/components/ValuesComparison";
import { ValuesResults } from "@/components/ValuesResults";
import { getRandomValuePair, calculateScores } from "@/utils/comparison";
import type { Comparison } from "@/utils/comparison";

// Number of comparisons to make
const NUM_COMPARISONS = 10;

export default function Home() {
  const [comparisonsMatrix, setComparisonsMatrix] = useState<number[][]>(
    Array.from(
      { length: values.length },
      (): number[] => Array(values.length).fill(0) as number[],
    ),
  );
  const [currentComparisonPairIndex, setCurrentComparisonPairIndex] = useState<
    [number, number]
  >([0, 1]);

  const seenComparisonCount = useMemo<number>(() => {
    return (
      currentComparisonPairIndex[0] * values.length +
      currentComparisonPairIndex[1]
    );
  }, [currentComparisonPairIndex]);

  const handleSelection = (winner: number, loser: number) => {
    // mark the winner

    if (winner >= comparisonsMatrix.length) return;

    comparisonsMatrix[winner]![loser] = 1;

    handleNextComparison();
  };

  // TODO: add a random aspect
  const handleNextComparison = () => {
    console.log("handleNextComparison", currentComparisonPairIndex);
    console.log("values.length", values.length);

    let nextIdx1 = currentComparisonPairIndex[0];
    let nextIdx2 = currentComparisonPairIndex[1] + 1;

    // If we've reached the end of the row, move to next row
    if (nextIdx2 >= values.length) {
      nextIdx1 = nextIdx1 + 1;
      nextIdx2 = nextIdx1 + 1; // Start comparing with the next value after the current one
    }

    // Skip self-comparison
    if (nextIdx1 === nextIdx2) {
      nextIdx2 = nextIdx2 + 1;
    }

    // If we've exhausted all combinations, wrap around
    if (nextIdx1 >= values.length - 1) {
      nextIdx1 = 0;
      nextIdx2 = 1;
    }

    setCurrentComparisonPairIndex([nextIdx1, nextIdx2]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="border-b border-gray-200 py-6">
          <h1 className="text-3xl font-bold">values.</h1>
          {/* <div className="mt-2 flex space-x-4">
            <button className="text-sm">Speed Run</button>
            <button className="text-sm">Meditative</button>
            <button className="text-sm">Canvas</button>
          </div> */}
        </header>

        <div className="py-8">
          <ValuesComparison
            valueIdx1={currentComparisonPairIndex[0]}
            valueIdx2={currentComparisonPairIndex[1]}
            onSelect={handleSelection}
            totalComparisons={(values.length * (values.length - 1)) / 2}
            currentComparison={seenComparisonCount}
          />
        </div>
      </div>
    </main>
  );
}
