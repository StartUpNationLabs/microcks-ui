import {Dialog, DialogContent,} from "@/components/ui/dialog"
import {Form} from "@/Form.tsx";
import {Button} from "@/components/ui/button.tsx";
import useStore from "@/store/useStore.ts";
import {useEffect} from "react";

export const AddService = () => {
    const {
        resetStep,
        resetIngestionType,
        dialogOpen,
        setDialogOpen,
        setIsSubmitted,
        isSubmitted
    } = useStore((state) => state);

    useEffect(() => {
        setIsSubmitted(false);
        resetStep();
        resetIngestionType();
    }, [dialogOpen]);
    return (
        <Dialog open={dialogOpen} onOpenChange={(open) => {
            if (!open) {
                setIsSubmitted(false);
                resetStep();
                resetIngestionType();
                setDialogOpen(false);
            }
        }}>
            <Button onClick={
                () => {
                    setDialogOpen(true);
                }
            }>Add Service</Button>
            <DialogContent
                style={{
                    width: "fit-content",
                    maxWidth: "100%",
                }}
                className="flex justify-center items-center"
            >
                <Form/>
            </DialogContent>
        </Dialog>
    )
}