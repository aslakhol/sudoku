import { findCombinations, maxSum, minSum } from "../lib/calculateCages";
import { useSettingsContext } from "./SettingsProvider";

export const Cages = () => {
  const cageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="container flex flex-col gap-4 pb-12">
      {cageSizes.map((cageSize) => (
        <CageSize key={cageSize} cageSize={cageSize} />
      ))}
    </div>
  );
};

type CageSizeProps = { cageSize: number };

const CageSize = ({ cageSize }: CageSizeProps) => {
  const { cageTotalRange } = useSettingsContext();
  const minTotal = cageTotalRange[0];
  const maxTotal = cageTotalRange[1];
  const min = minSum(cageSize);
  const max = maxSum(cageSize);

  const valuesBetweenMaxAndMin = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i,
  );

  if (minTotal > max || maxTotal < min) {
    return null;
  }

  return (
    <div>
      <p className="text-xl">Cages with {cageSize} squares</p>
      <div className="flex flex-col">
        <div className=" flex gap-2 font-semibold">
          <p>Total</p>
          <p>Combinations</p>
        </div>
        {valuesBetweenMaxAndMin.map((value) => (
          <Total key={value} cageSize={cageSize} cageTotal={value} />
        ))}
      </div>
    </div>
  );
};

type TotalProps = { cageSize: number; cageTotal: number };

const Total = ({ cageSize, cageTotal }: TotalProps) => {
  const combinations = findCombinations(cageTotal, cageSize);
  const { includedNumbers, excludedNumbers, cageTotalRange } =
    useSettingsContext();
  const minTotal = cageTotalRange[0];
  const maxTotal = cageTotalRange[1];

  if (cageTotal < minTotal || cageTotal > maxTotal) {
    return null;
  }

  const withOutExcluded = combinations.filter((comb) =>
    excludedNumbers.every((num) => !comb.includes(num)),
  );

  const withIncluded = withOutExcluded.filter((comb) =>
    includedNumbers.every((num) => comb.includes(num)),
  );

  if (withIncluded.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <p className="w-9">{cageTotal}</p>
      <Combinations combinations={withIncluded} />
    </div>
  );
};

type CombinationsProps = { combinations: number[][] };

const Combinations = ({ combinations }: CombinationsProps) => {
  return (
    <div className="flex gap-2">
      {combinations.map((comb, i) => (
        <div key={i} className="flex">
          {comb.map((num, j) => (
            <span key={j}>{num}</span>
          ))}
        </div>
      ))}
    </div>
  );
};
