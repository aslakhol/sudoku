function generateCombinations(choices: number[], size: number): number[][] {
  const combinations: number[][] = [];

  function backtrack(start: number, currentCombo: number[]) {
    // If the combination is of the right size, add it to the results
    if (currentCombo.length == size) {
      combinations.push([...currentCombo]);
      return;
    }

    for (let i = start; i < choices.length; i++) {
      // Add the current number to the combination
      if (choices[i] !== undefined) {
        currentCombo.push(choices[i]!);
      }
      // Recurse with the next number
      backtrack(i + 1, currentCombo);
      // Remove the last number added to backtrack
      currentCombo.pop();
    }
  }

  backtrack(0, []);
  return combinations;
}

export function findCombinations(
  cageTotal: number,
  cageSize: number,
): number[][] {
  const possibleDigits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const allCombinations = generateCombinations(possibleDigits, cageSize);

  // Filter combinations to those whose sum matches the cage total
  const validCombinations = allCombinations.filter(
    (comb) => comb.reduce((a, b) => a + b, 0) === cageTotal,
  );

  return validCombinations;
}

export const minSum = (cageSize: number) => {
  return (cageSize * (cageSize + 1)) / 2;
};

export const maxSum = (cageSize: number) => {
  return (cageSize * (19 - cageSize)) / 2;
};

export const findAllCombinationsForCageSize = (cageSize: number) => {
  const min = minSum(cageSize);
  const max = maxSum(cageSize);

  const valuesBetweenMaxAndMin = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i,
  );

  const combinationsForCageSize: CageSize = { cageSize, cageTotals: [] };

  for (const value of valuesBetweenMaxAndMin) {
    combinationsForCageSize.cageTotals.push({
      total: value,
      combinations: findCombinations(value, cageSize),
    });
  }

  return combinationsForCageSize;
};

export type CageSize = {
  cageSize: number;
  cageTotals: { total: number; combinations: number[][] }[];
};

export const findAllCombinations = () => {
  const allCombinations: CageSize[] = [];

  for (let i = 1; i <= 9; i++) {
    allCombinations.push(findAllCombinationsForCageSize(i));
  }

  return allCombinations;
};

export const writeResultsToFile = () => {
  const combinations = findAllCombinations();

  const filename = `cageSizes.ts`;

  const fileContents = `import { type CageSize } from "./calculateCages";\n\nexport const cageSizes = ${JSON.stringify(combinations, null, 2)} as CageSize[];\n`;

  const blob = new Blob([fileContents], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
