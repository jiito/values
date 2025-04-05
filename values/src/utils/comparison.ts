import type { Value } from "@/data/values";

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

export function calculateScores(comparisons: Comparison[]): Value[] {
  const scoreMap = new Map<string, number>();

  // Initialize scores
  comparisons.forEach((comp) => {
    // Ensure value1 and value2 exist before accessing their properties
    if (comp.value1 && !scoreMap.has(comp.value1.id))
      scoreMap.set(comp.value1.id, 0);
    if (comp.value2 && !scoreMap.has(comp.value2.id))
      scoreMap.set(comp.value2.id, 0);

    // Add points for the winner
    if (comp.winner) {
      const currentScore = scoreMap.get(comp.winner.id) ?? 0;
      scoreMap.set(comp.winner.id, currentScore + 1);
    }
  });

  // Convert map to array of values with scores
  return Array.from(scoreMap.entries())
    .map(([id, score]) => {
      // Find a comparison that contains this value id
      const value = comparisons.find(
        (comp) =>
          (comp.value1 && comp.value1.id === id) ||
          (comp.value2 && comp.value2.id === id),
      );

      if (!value) throw new Error(`Value with id ${id} not found`);

      // Get the actual value object
      let valueObj: Value;
      if (value.value1 && value.value1.id === id) {
        valueObj = value.value1;
      } else if (value.value2) {
        valueObj = value.value2;
      } else {
        throw new Error(`Could not determine value object for id ${id}`);
      }

      return {
        ...valueObj,
        score,
      };
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}
