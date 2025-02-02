import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog"
import {Form} from "@/Form.tsx";
import {Button} from "@/components/ui/button.tsx";
import useStore from "@/store/useStore.ts";

export const AddService = () => {
    const {resetStep, resetIngestionType} = useStore((state) => state);
    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                resetStep();
                resetIngestionType();
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