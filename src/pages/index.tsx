import Head from "next/head";
import { findCombinations, maxSum, minSum } from "../lib/calculateCages";

export default function Home() {
  const cageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Head>
        <title>Cages | Sudoku Tools</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col gap-4">
          {cageSizes.map((cageSize) => (
            <CageSize key={cageSize} cageSize={cageSize} />
          ))}
        </div>
      </main>
    </>
  );
}

type CageSizeProps = { cageSize: number };

const CageSize = ({ cageSize }: CageSizeProps) => {
  const min = minSum(cageSize);
  const max = maxSum(cageSize);

  const valuesBetweenMaxAndMin = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i,
  );

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
  return (
    <div className="flex gap-2">
      <p className="w-9">{cageTotal}</p>
      <Combinations combinations={combinations} />
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
