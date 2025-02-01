import Step from "@/components/multi-step-forms/Step.tsx";
import PersonalInfo from "@/components/multi-step-forms/sections/PersonalInfo.tsx";
import SelectIngestionType from "@/components/multi-step-forms/sections/SelectIngestionType.tsx";
import Addons from "@/components/multi-step-forms/sections/Addons.tsx";
import Summary from "@/components/multi-step-forms/sections/Summary.tsx";
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
                <Step stepNumber={1}/>
                <Step stepNumber={2}/>
                <Step stepNumber={3}/>
                <Step stepNumber={4}/>
            </div>
        </section>
        {step === 1 && <SelectIngestionType/>}
        {ingestionType?.steps[step]?.component}
    </main>;
}