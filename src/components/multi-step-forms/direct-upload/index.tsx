import Submit from "@/components/multi-step-forms/direct-upload/Submit.tsx";
import {Step} from "@/store/slices/createIngestionTypeSlice.tsx";
import Success from "@/components/multi-step-forms/direct-upload/Success.tsx";

export const DirectUploadSteps: {
    [key: number]: Step;
} = {
    1: {
        component: <Submit/>,
        title: "Upload Files",
    },
    2: {
        component: <Success/>,
        title: "Success",
    },
}