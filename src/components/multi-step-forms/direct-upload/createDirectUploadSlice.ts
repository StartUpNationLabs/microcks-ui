import {create, StateCreator} from "zustand";

type DirectUploadSlice = {
    name: string;
    version: string;
    setVersion: (version: string) => void;
    setName: (name: string) => void;
};

const createDirectUploadSlice: StateCreator<DirectUploadSlice> = (set) => ({
    name: "",
    version: "",
    setVersion: (version) => set((state) => ({...state, version})),
    setName: (name) => set((state) => ({...state, name})),
});

export default createDirectUploadSlice;
export type {DirectUploadSlice};

export const useDirectUpload = create<DirectUploadSlice>(createDirectUploadSlice);