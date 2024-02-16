import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
} from "react";

type SettingsContextType = {
  includedNumbers: number[];
  setIncludedNumbers: Dispatch<React.SetStateAction<number[]>>;
  excludedNumbers: number[];
  setExcludedNumbers: Dispatch<React.SetStateAction<number[]>>;
  cageSizes: number[];
  setCageSizes: Dispatch<React.SetStateAction<number[]>>;
  cageTotalRange: [number, number];
  setCageTotalRange: Dispatch<React.SetStateAction<[number, number]>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [includedNumbers, setIncludedNumbers] = useState<number[]>([]);
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);
  const [cageSizes, setCageSizes] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [cageTotalRange, setCageTotalRange] = useState<[number, number]>([
    1, 45,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        includedNumbers,
        setIncludedNumbers,
        excludedNumbers,
        setExcludedNumbers,
        cageSizes,
        setCageSizes,
        cageTotalRange,
        setCageTotalRange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)!;

  if (context === undefined) {
    throw Error("useSettingsContext must be used within SettingsProvider");
  }

  return context;
};
