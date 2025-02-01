import { create } from "zustand";
import { PersonalInfoSlice } from "./slices/createPersonalInfoSlice";
import { IngestionTypeSlice } from "./slices/createIngestionTypeSlice.tsx";
import { AddOnSlice } from "./slices/createAddOnSlice";
import { ToggleSubcriptionPlanSlice } from "./slices/createToggleSubscriptionPlan";
import {
  createPersonalInfoSlice,
  createPlanSlice,
  createAddOnSlice,
  createToggleSubscriptionPlan,
  createStepSlice,
  createSubmitFormSlice,
} from "./slices";
import { StepSlice } from "./slices/createStepSlice";
import { SubmitFormSlice } from "./slices/createSubmitFormSlice";

const useStore = create<
  PersonalInfoSlice &
    IngestionTypeSlice &
    AddOnSlice &
    ToggleSubcriptionPlanSlice &
    StepSlice &
    SubmitFormSlice
>()((...a) => ({
  ...createPersonalInfoSlice(...a),
  ...createPlanSlice(...a),
  ...createAddOnSlice(...a),
  ...createToggleSubscriptionPlan(...a),
  ...createStepSlice(...a),
  ...createSubmitFormSlice(...a),
}));

export default useStore;
