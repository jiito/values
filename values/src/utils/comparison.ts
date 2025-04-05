import type { Value } from "@/data/values";

export interface Comparison {
  value1: Value;
  value2: Value;
  winner?: Value;
}

export function getRandomValuePair(values: Value[], previousComparisons: Comparison[] = []): [Value, Value] {
  // Ensure we have at least 2 values
  if (values.length < 2) {
    throw new Error('Need at least 2 values to compare');
  }

  // Create a copy of the values array to avoid modifying the original
  const valuesCopy = [...values];
  
  // Shuffle the array
  for (let i = valuesCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valuesCopy[i], valuesCopy[j]] = [valuesCopy[j], valuesCopy[i]];
  }
  
  // Get the first two values
  const value1 = valuesCopy[0];
  const value2 = valuesCopy[1];
  
  // Check if this pair has been compared before
  const alreadyCompared = previousComparisons.some(
    (comp) => 
      (comp.value1.id === value1.id && comp.value2.id === value2.id) || 
      (comp.value1.id === value2.id && comp.value2.id === value1.id)
  );
  
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
    if (!scoreMap.has(comp.value1.id)) scoreMap.set(comp.value1.id, 0);
    if (!scoreMap.has(comp.value2.id)) scoreMap.set(comp.value2.id, 0);

    // Add points for the winner
    if (comp.winner) {
      const currentScore = scoreMap.get(comp.winner.id) ?? 0;
      scoreMap.set(comp.winner.id, currentScore + 1);
    }
  });

  // Convert map to array of values with scores
  return Array.from(scoreMap.entries())
    .map(([id, score]) => {
      const value = comparisons.find(
        (comp) => comp.value1.id === id || comp.value2.id === id,
      );

      if (!value) throw new Error(`Value with id ${id} not found`);

      const valueObj = value.value1.id === id ? value.value1 : value.value2;

      return {
        ...valueObj,
        score,
      };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}
