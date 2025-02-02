import {StateCreator} from "zustand";

type SubmitFormSlice = {
    isSubmitted: boolean;
    setIsSubmitted: (isSubmitted: boolean) => void;
    dialogOpen: boolean,
    setDialogOpen: (dialogOpen: boolean) => void;
};

const createSubmitFormSlice: StateCreator<SubmitFormSlice> = (set) => ({
    isSubmitted: false,
    setIsSubmitted: () =>
        set((state) => ({...state, isSubmitted: !state.isSubmitted})),
    dialogOpen: false,
    setDialogOpen: (dialogOpen) => set((state) => ({...state, dialogOpen})),
});

export default createSubmitFormSlice;
export type {SubmitFormSlice};
