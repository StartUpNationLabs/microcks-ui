import Step from "@/components/multi-step-forms/Step.tsx";
import SelectIngestionType from "@/components/multi-step-forms/sections/SelectIngestionType.tsx";
import useStore from "@/store/useStore.ts";

export function Form() {
    const {step} = useStore((state) => state);
    const {ingestionType} = useStore((state) => state);
    console.log(ingestionType);
    console.log(step);
    return <main>
        <section
            className="relative h-[172px] w-full bg-[url('/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover lg:hidden">
            <div className="flex justify-center pt-[37px] pb-[34px]">
                {Object.entries(ingestionType.steps).map(([key, value]) => {
                        return <Step key={key} stepNumber={key as number}/>;
                    }
                )}
            </div>
        </section>
        {step === 1 && <SelectIngestionType/>}
        {ingestionType?.steps[step - 1]?.component}
    </main>;
}