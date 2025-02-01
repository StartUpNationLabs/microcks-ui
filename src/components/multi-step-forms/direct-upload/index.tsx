import Submit from "@/components/multi-step-forms/direct-upload/Submit.tsx";
import {Step} from "@/store/slices/createIngestionTypeSlice.tsx";

export const DirectUploadSteps: {
    [key: number]: Step;
} = {
    2: {
        component: <Submit/>,
        title: "Upload Files",
    }
}