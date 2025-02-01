"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";

type TFooter = {
  className?: string;
  onHandleNextStep?: () => void;
  onHandlePreviousStep?: () => void;
  stepType?: "FIRST" | "MIDDLE" | "LAST";
};

export default function Footer({
  className,
  onHandleNextStep,
  onHandlePreviousStep,
    stepType,
}: TFooter) {
  const step = useStore((state) => state.step);
  return (
    <footer
      className={cn(
        "p-4 bg-c-neutral-white flex items-center justify-between",
        className
      )}
    >
      {stepType === "FIRST" && <div className="w-full" />}

      {(stepType === "MIDDLE" | stepType === "LAST")  && (
        <Button
          variant="ghost"
          onClick={onHandlePreviousStep}
        >
          Go Back
        </Button>
      )}
      <Button
        onClick={onHandleNextStep}
      >
        {stepType === "LAST" ? "Confirm" : "Next Step"}
      </Button>
    </footer>
  );
}
