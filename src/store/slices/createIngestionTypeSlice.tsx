import {StateCreator} from "zustand";
import {ReactNode} from "react";
import {FolderInput, MoveUpRight, Upload} from "lucide-react";
import {DirectUploadSteps} from "@/components/multi-step-forms/direct-upload";

enum IngestionTypeEnums {
    DIRECT_UPLOAD = "DIRECT_UPLOAD",
    IMPORT_JOB = "IMPORT_JOB",
    DIRECT_API = "DIRECT_API",
    NOT_SET = "NOT_SET",
}

type Step = {
    title: string;
    component: ReactNode;
}

type IngestionType = {
    type: IngestionTypeEnums;
    name: string;
    image: ReactNode;
    label: string;
    description: string;
    steps: {
        [key: number]: Step;
    };
};

type IngestionTypeSlice = {
    ingestionType: IngestionType;
    setIngestionType: (plan: IngestionType) => void;
};

const initialState = {
    type: IngestionTypeEnums.NOT_SET,
    name: "",
    image: <></>,
    label: "",
    description: "",
    steps: {},
};

export const ingestionTypes: IngestionType[] = [
    {
        type: IngestionTypeEnums.DIRECT_UPLOAD,
        name: "Direct Upload",
        image: <Upload/>,
        label: "Direct Upload",
        description: "Directly upload your Service and API mock artifact for one-time import of definitions.",
        steps: DirectUploadSteps,

    },
    {
        type: IngestionTypeEnums.IMPORT_JOB,
        name: "Import Job",
        image: <FolderInput/>,
        label: "Import Job",
        description: "Schedule an Importer Job in Microcks to automate continuous discovery and updates of your API and service mocks",
        steps: {} as { [key: number]: Step },

    },
    {
        type: IngestionTypeEnums.DIRECT_API,
        name: "Direct API",
        image: <MoveUpRight/>,
        label: "Direct API",
        description: "Quickly generate REST and Event-Driven APIs as sandboxes to explore and refine your API design",
        steps: {} as { [key: number]: Step },

    },
];

const createIngestionTypeSlice: StateCreator<IngestionTypeSlice> = (set) => ({
    ingestionType: initialState,
    setIngestionType: (data) => set((state) => ({ingestionType: {...state.ingestionType, ...data}})),
});

export default createIngestionTypeSlice;
export type {IngestionType, IngestionTypeSlice, Step, IngestionTypeEnums};
