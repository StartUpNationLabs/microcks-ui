import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog"
import {Form} from "@/Form.tsx";
import {Button} from "@/components/ui/button.tsx";
import useStore from "@/store/useStore.ts";
import {useEffect} from "react";

export const AddService = () => {
    const {resetStep, resetIngestionType, dialogOpen, setDialogOpen, setIsSubmitted} = useStore((state) => state);

    useEffect(() => {
        if (!dialogOpen) {
            resetStep();
            resetIngestionType();
            setIsSubmitted(false);
        }
    }, [dialogOpen]);
    return (
        <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
                resetStep();
                resetIngestionType();
                setIsSubmitted(false);
            }
        }}>
            <DialogTrigger

            ><Button>Add Service</Button></DialogTrigger>
            <DialogContent
                style={{
                    width: "fit-content",
                    maxWidth: "100%",
                }}
            >
                <Form/>
            </DialogContent>
        </Dialog>
    )
}