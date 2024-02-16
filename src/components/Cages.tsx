import { CageSize } from "../lib/calculateCages";
import { cageSizes } from "../lib/cageSizes";
import { useSettingsContext } from "./SettingsProvider";
import { useState } from "react";
import { cn } from "../lib/utils";

export const Cages = () => {
  return (
    <div className="container flex flex-col gap-4 pb-12">
      {cageSizes.map((cageSize) => (
        <CageSize key={cageSize.cageSize} cageSize={cageSize} />
      ))}
    </div>
  );
};

type CageSizeProps = { cageSize: CageSize };

const CageSize = ({ cageSize }: CageSizeProps) => {
  const [faded, setFaded] = useState(false);
  const { cageTotalRange, cageSizes } = useSettingsContext();

  if (cageSize.cageSize < cageSizes[0] || cageSize.cageSize > cageSizes[1]) {
    return null;
  }

  const filteredTotals = cageSize.cageTotals.filter(
    (ct) => ct.total >= cageTotalRange[0] && ct.total <= cageTotalRange[1],
  );

  if (filteredTotals.length === 0) {
    return null;
  }

  return (
    <div className={cn(faded && "text-gray-400")}>
      <p className="text-xl" onClick={() => setFaded((prev) => !prev)}>
        Cages with {cageSize.cageSize} squares
      </p>
      <div className="flex flex-col">
        <div className=" flex gap-2 font-semibold">
          <p>Total</p>
          <p>Combinations</p>
        </div>
        {filteredTotals.map((total) => (
          <Total key={total.total} cageTotal={total} />
        ))}
      </div>
    </div>
  );
};

type TotalProps = { cageTotal: { total: number; combinations: number[][] } };

const Total = ({ cageTotal }: TotalProps) => {
  const [faded, setFaded] = useState(false);
  const { includedNumbers, excludedNumbers } = useSettingsContext();

  const withOutExcluded = cageTotal.combinations.filter((comb) =>
    excludedNumbers.every((num) => !comb.includes(num)),
  );

  const withIncluded = withOutExcluded.filter((comb) =>
    includedNumbers.every((num) => comb.includes(num)),
  );

  if (withIncluded.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex gap-2", faded && "text-gray-400")}>
      <p className="w-9" onClick={() => setFaded((prev) => !prev)}>
        {cageTotal.total}
      </p>
      <Combinations combinations={withIncluded} />
    </div>
  );
};

type CombinationsProps = { combinations: number[][] };

const Combinations = ({ combinations }: CombinationsProps) => {
  return (
    <div className="flex gap-2">
      {combinations.map((comb, i) => (
        <Combination key={i} combination={comb} />
      ))}
    </div>
  );
};

type CombinationProps = { combination: number[] };

const Combination = ({ combination }: CombinationProps) => {
  const [faded, setFaded] = useState(false);

  return (
    <>
      <div
        className={cn("flex", faded && "text-gray-400")}
        onClick={() => setFaded((prev) => !prev)}
      >
        {combination.map((num, j) => (
          <span key={j}>{num}</span>
        ))}
      </div>
    </>
  );
};
