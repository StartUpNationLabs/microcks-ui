import {create} from "zustand";
import {PersonalInfoSlice} from "./slices/createPersonalInfoSlice";
import {IngestionTypeSlice} from "./slices/createIngestionTypeSlice.tsx";
import {AddOnSlice} from "./slices/createAddOnSlice";
import {ToggleSubcriptionPlanSlice} from "./slices/createToggleSubscriptionPlan";
import {
    createAddOnSlice,
    createPersonalInfoSlice,
    createPlanSlice,
    createStepSlice,
    createSubmitFormSlice,
    createToggleSubscriptionPlan,
} from "./slices";
import {StepSlice} from "./slices/createStepSlice";
import {SubmitFormSlice} from "./slices/createSubmitFormSlice";
import {devtools} from "zustand/middleware";

const useStore = create<
    PersonalInfoSlice &
    IngestionTypeSlice &
    AddOnSlice &
    ToggleSubcriptionPlanSlice &
    StepSlice &
    SubmitFormSlice
>()(devtools((...a) => ({
        ...createPersonalInfoSlice(...a),
        ...createPlanSlice(...a),
        ...createAddOnSlice(...a),
        ...createToggleSubscriptionPlan(...a),
        ...createStepSlice(...a),
        ...createSubmitFormSlice(...a),
    })), {
        store: "store",
    }
);

export default useStore;
