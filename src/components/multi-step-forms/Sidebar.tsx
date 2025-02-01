import Step from "@/components/multi-step-forms/Step";
import React from "react";
import useStore from "@/store/useStore.ts";

export default function Sidebar() {
    // get the current step from the store
    const {ingestionType} = useStore((state) => state);

    return (
        <aside
            className="hidden lg:flex lg:w-[274px] lg:h-[568px] lg:flex-col lg:flex-shrink-0 rounded-lg lg:bg-[url('/images/bg-sidebar-desktop.svg')] lg:px-8 pt-10 lg:gap-8">
            {Object.entries(ingestionType.steps).map(([key, step]) => {
               return  <Step key={key} stepNumber={key as number} sectionTitle={step.title}/>
            })}
        </aside>
    );
}