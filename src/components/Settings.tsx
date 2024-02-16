import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "./ui/drawer";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useSettingsContext } from "./SettingsProvider";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[495px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              What cages should be displayed?
            </DialogDescription>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>What cages should be displayed?</DrawerDescription>
        </DrawerHeader>
        <Content className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// cage sizes
// cage totals
// numbers

type ContentProps = { className?: string };

const Content = ({ className }: ContentProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    includedNumbers,
    setIncludedNumbers,
    excludedNumbers,
    setExcludedNumbers,
    cageTotalRange,
    setCageTotalRange,
    cageSizes,
    setCageSizes,
  } = useSettingsContext();

  const pressNumber = (number: number) => {
    if (includedNumbers.includes(number)) {
      setIncludedNumbers((prevNumbers) =>
        prevNumbers.filter((n) => n !== number),
      );
      setExcludedNumbers((prevNumbers) => [...prevNumbers, number]);
    }

    if (excludedNumbers.includes(number)) {
      setExcludedNumbers((prevNumbers) =>
        prevNumbers.filter((n) => n !== number),
      );
    }

    if (
      !includedNumbers.includes(number) &&
      !excludedNumbers.includes(number)
    ) {
      setIncludedNumbers((prevNumbers) => [...prevNumbers, number]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex w-16 flex-col gap-2">
        <div className="flex flex-row gap-2">
          {numbers.slice(0, 3).map((number) => (
            <NumberButton
              key={number}
              number={number}
              onClick={pressNumber}
              status={
                includedNumbers.includes(number)
                  ? "included"
                  : excludedNumbers.includes(number)
                    ? "excluded"
                    : "none"
              }
            />
          ))}
        </div>
        <div className="flex flex-row gap-2">
          {numbers.slice(3, 6).map((number) => (
            <NumberButton
              key={number}
              number={number}
              onClick={pressNumber}
              status={
                includedNumbers.includes(number)
                  ? "included"
                  : excludedNumbers.includes(number)
                    ? "excluded"
                    : "none"
              }
            />
          ))}
        </div>
        <div className="flex flex-row gap-2">
          {numbers.slice(6, 9).map((number) => (
            <NumberButton
              key={number}
              number={number}
              onClick={pressNumber}
              status={
                includedNumbers.includes(number)
                  ? "included"
                  : excludedNumbers.includes(number)
                    ? "excluded"
                    : "none"
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Label htmlFor="cageTotalRange">Cage total</Label>
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cageTotalRange">{cageTotalRange[0]}</Label>
          <Slider
            id="cageTotalRange"
            defaultValue={[cageTotalRange[0], cageTotalRange[1]]}
            onValueChange={(value: [number, number]) =>
              setCageTotalRange(value)
            }
            max={45}
          />
          <Label htmlFor="cageTotalRange">{cageTotalRange[1]}</Label>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Label htmlFor="cageSizes">Cage size</Label>
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cageSizes">{cageSizes[0]}</Label>
          <Slider
            id="cageSizes"
            defaultValue={[cageSizes[0], cageSizes[1]]}
            onValueChange={(value: [number, number]) => setCageSizes(value)}
            min={1}
            max={9}
          />
          <Label htmlFor="cageSizes">{cageSizes[1]}</Label>
        </div>
      </div>
    </div>
  );
};

type NumberButtonProps = {
  number: number;
  onClick: (number: number) => void;
  status: "included" | "excluded" | "none";
};

const NumberButton = ({ number, onClick, status }: NumberButtonProps) => {
  return (
    <Button
      key={number}
      onClick={() => onClick(number)}
      variant={"outline"}
      className={cn(
        status === "excluded" && "bg-red-300 hover:bg-red-400",
        status === "included" && "bg-green-300 hover:bg-green-400",
      )}
    >
      <p className="w-6">{number}</p>
    </Button>
  );
};
