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
  const possibleDigits: number[] = Array.from({ length: 9 }, (_, i) => i + 1);
  const allCombinations = generateCombinations(possibleDigits, cageSize);

  // Filter combinations to those whose sum matches the cage total
  const validCombinations = allCombinations.filter(
    (comb) => comb.reduce((a, b) => a + b, 0) === cageTotal,
  );

  return validCombinations;
}
