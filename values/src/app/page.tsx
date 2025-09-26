"use client";

import { ValueCard } from "@/components/ValueCard";
import { values } from "@/data/values";
import { useRandomIndexPairs, useValueRankings } from "@/utils/comparison";
import { useCallback, useState } from "react";

export default function Home() {
  const [comparisonsMatrix, setComparisonsMatrix] = useState<number[][]>(
    Array.from(
      { length: values.length },
      (): number[] => Array(values.length).fill(0) as number[],
    ),
  );
  const indexPairs = useRandomIndexPairs();
  const [seenComparisonCount, setSeenComparisonCount] = useState<number>(435);
  const [currentComparisonPairIndex, setCurrentComparisonPairIndex] = useState<
    [number, number]
  >(indexPairs[seenComparisonCount]!);

  const handleSelection = useCallback(
    (winner: number, loser: number) => {
      setComparisonsMatrix((prev) => {
        const newMatrix = [...prev];
        newMatrix[winner]![loser] = 1;
        return newMatrix;
      });

      const nextComparisonIndex = seenComparisonCount + 1;

      setSeenComparisonCount(nextComparisonIndex);
      setCurrentComparisonPairIndex(indexPairs[nextComparisonIndex]!);
    },
    [indexPairs, seenComparisonCount],
  );

  const rankedValues = useValueRankings(comparisonsMatrix);

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
        {/* <div>
            <ol>
              {rankedValues.map((value, index) => (
                <li key={value.id}>
                  {index + 1}. {value.name}
                </li>
              ))}
            </ol>
          </div> */}
        <div className="py-8">
          <div className="flex flex-col items-center justify-center gap-8 py-8">
            <div className="text-center">
              <div className="text-sm text-gray-500">
                {seenComparisonCount} / {indexPairs.length}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              {seenComparisonCount < indexPairs.length ? (
                <>
                  <ValueCard
                    value={values[currentComparisonPairIndex[0]]!}
                    onClick={() =>
                      handleSelection(
                        currentComparisonPairIndex[0],
                        currentComparisonPairIndex[1],
                      )
                    }
                  />
                  <ValueCard
                    value={values[currentComparisonPairIndex[1]]!}
                    onClick={() =>
                      handleSelection(
                        currentComparisonPairIndex[1],
                        currentComparisonPairIndex[0],
                      )
                    }
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
        {seenComparisonCount === indexPairs.length ? (
          <div>
            <ol>
              {rankedValues.map((value, index) => (
                <li key={value.id}>
                  {index + 1}. {value.name}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </main>
  );
}
