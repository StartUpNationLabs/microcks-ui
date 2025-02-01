import  { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import useStore from "@/store/useStore";
import PlanCard from "@/components/multi-step-forms/PlanCard.tsx";
import {ingestionTypes} from "@/store/slices/createIngestionTypeSlice.tsx";

export default function SelectIngestionType() {
  const { ingestionType, setIngestionType, isToggled, step, increaseStep, decreaseStep } =
    useStore((state) => state);
  const [selectedIngestionType, setSelectedIngestionType] = useState(ingestionType);

  useEffect(() => {
    setIngestionType({
      ...ingestionType,
      ...selectedIngestionType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngestionType]);

  const onNext = () => {
    if ( !ingestionType.name) return;
    increaseStep(step);
  };

  const onPrevious = () => {
    decreaseStep(step);
  };

  const handleOnClick = (plan: any) => {
    setSelectedIngestionType(plan);
  };

  return (
    <Container onNext={onNext} onPreviousStep={onPrevious} showSidebar={false} stepType={"FIRST"}>
      <div>
        <SectionHeader
          title="Add a new Service"
          description="Select how you want to ingest your new Service."
        />
        <section className="flex flex-col gap-3 lg:flex-row lg:gap-4 w-full">
          {ingestionTypes.map((plan) => (
            <PlanCard
              key={plan.name}
              onClick={() => handleOnClick(plan)}
              item={plan}
            />
          ))}
        </section>
      </div>
    </Container>
  );
}
