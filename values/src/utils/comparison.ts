import { values, type Value } from "@/data/values";
import { useCallback, useMemo } from "react";

export interface Comparison {
  value1: Value;
  value2: Value;
  winner?: Value;
}

export function getRandomValuePair(
  values: Value[],
  previousComparisons: Comparison[] = [],
): [Value, Value] {
  // Ensure we have at least 2 values
  if (values.length < 2) {
    throw new Error("Need at least 2 values to compare");
  }

  // Create a copy of the values array to avoid modifying the original
  const valuesCopy = [...values];

  // Shuffle the array in a type-safe way
  for (let i = valuesCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valuesCopy[i], valuesCopy[j]] = [valuesCopy[j]!, valuesCopy[i]!];
  }

  // Get the first two values - we've already checked that there are at least 2 values
  // so we can safely assert that these exist
  const value1 = valuesCopy[0]!;
  const value2 = valuesCopy[1]!;

  // Check if this pair has been compared before
  const alreadyCompared = previousComparisons.some((comp) => {
    // Skip invalid comparisons
    if (!comp.value1 || !comp.value2 || !value1 || !value2) return false;

    return (
      (comp.value1.id === value1.id && comp.value2.id === value2.id) ||
      (comp.value1.id === value2.id && comp.value2.id === value1.id)
    );
  });

  // If already compared, try again
  if (alreadyCompared && values.length > 2) {
    return getRandomValuePair(values, previousComparisons);
  }

  return [value1, value2];
}

export function useValueRankings(comparisonsMatrix: number[][]) {
  const calculateScores = useCallback(() => {
    const scores = Array(values.length).fill(0);
    for (let i = 0; i < comparisonsMatrix.length; i++) {
      for (const j of comparisonsMatrix[i]!) {
        if (j === 1) {
          scores[i]++;
        }
      }
    }
    return scores as number[];
  }, [comparisonsMatrix]);

  const scores = useMemo(() => calculateScores(), [calculateScores]);

  const rankedValues = useMemo(() => {
    return values
      .map((value, index) => ({
        ...value,
        score: scores[index]!,
      }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  return rankedValues;
}

const shuffleArray = (array: [number, number][]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }
  return array;
};

export const useRandomIndexPairs = () => {
  const indexPairs = useMemo<[number, number][]>(() => {
    // only random in upper right diagonal
    // 0 < i < k < n
    const indexPairs: [number, number][] = [];
    for (let i = 0; i < values.length; i++) {
      for (let k = i + 1; k < values.length; k++) {
        indexPairs.push([i, k]);
      }
    }
    return shuffleArray(indexPairs);
  }, []);
  return indexPairs;
};
