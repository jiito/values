"use client";

import { useState, useEffect } from "react";
import { values } from "@/data/values";
import { ValuesComparison } from "@/components/ValuesComparison";
import { ValuesResults } from "@/components/ValuesResults";
import { getRandomValuePair, calculateScores } from "@/utils/comparison";
import type { Comparison } from "@/utils/comparison";

// Number of comparisons to make
const NUM_COMPARISONS = 10;

export default function Home() {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [currentPair, setCurrentPair] = useState<[typeof values[0], typeof values[0]] | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [currentComparisonIndex, setCurrentComparisonIndex] = useState(0);

  // Initialize the first comparison
  useEffect(() => {
    if (!currentPair && !isComplete) {
      setCurrentPair(getRandomValuePair(values));
    }
  }, [currentPair, isComplete]);

  const handleSelection = (comparison: Comparison) => {
    // Add the comparison to our list
    setComparisons(prev => [...prev, comparison]);
    
    // Move to the next comparison or finish
    if (currentComparisonIndex + 1 >= NUM_COMPARISONS) {
      setIsComplete(true);
      setCurrentPair(null);
    } else {
      // Get a new pair of values
      setCurrentPair(getRandomValuePair(values, comparisons));
      setCurrentComparisonIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setComparisons([]);
    setCurrentPair(getRandomValuePair(values));
    setIsComplete(false);
    setCurrentComparisonIndex(0);
  };

  // Calculate the rankings
  const rankedValues = isComplete ? calculateScores(comparisons) : [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container max-w-4xl mx-auto px-4">
        <header className="py-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold">values.</h1>
          <div className="flex space-x-4 mt-2">
            <button className="text-sm">Speed Run</button>
            <button className="text-sm">Meditative</button>
            <button className="text-sm">Canvas</button>
          </div>
        </header>

        <div className="py-8">
          {!isComplete && currentPair ? (
            <>
              <ValuesComparison
                value1={currentPair[0]}
                value2={currentPair[1]}
                onSelect={handleSelection}
                totalComparisons={NUM_COMPARISONS}
                currentComparison={currentComparisonIndex + 1}
              />
            </>
          ) : (
            <ValuesResults 
              rankedValues={rankedValues} 
              onReset={handleReset} 
            />
          )}
        </div>
      </div>
    </main>
  );
}
