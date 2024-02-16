import { CageSize } from "../lib/calculateCages";
import { cageSizes } from "../lib/cageSizes";
import { useSettingsContext } from "./SettingsProvider";

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
  const { cageTotalRange } = useSettingsContext();
  const minTotal = cageTotalRange[0];
  const maxTotal = cageTotalRange[1];

  const filteredTotals = cageSize.cageTotals.filter(
    (ct) => ct.total >= minTotal && ct.total <= maxTotal,
  );

  if (filteredTotals.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-xl">Cages with {cageSize.cageSize} squares</p>
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
    <div className="flex gap-2">
      <p className="w-9">{cageTotal.total}</p>
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
