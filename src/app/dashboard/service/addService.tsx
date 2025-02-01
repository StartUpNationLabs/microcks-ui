import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog"
import {Form} from "@/Form.tsx";
import {Button} from "@/components/ui/button.tsx";

export const AddService = () => {
    return (
        <Dialog>
            <DialogTrigger

            ><Button>Add Service</Button></DialogTrigger>
            <DialogContent
                style={{
                    width: "fit-content"
                }}
            >
                <Form/>
            </DialogContent>
        </Dialog>
    )
}