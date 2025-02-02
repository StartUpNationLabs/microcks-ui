import SectionHeader from "../SectionHeader";
import Container from "../Container";
import useStore from "@/store/useStore";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    file: z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    isSecondary: z.boolean().optional(),
});

export default function Submit() {
    const { step, increaseStep, decreaseStep, setIsSubmitted, setDialogOpen } = useStore((state) => state);

    const onPrevious = () => {
        decreaseStep(step);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register("file");
    const onNext = () => {
        form.handleSubmit(async (data) => {
            setIsSubmitted(true)
            setDialogOpen(false)
        })();
    };

    return (
        <Container onNext={onNext} onPreviousStep={onPrevious} showSidebar={false} stepType={"LAST"}>
            <div>
                <SectionHeader
                    title="Upload your Service and API mock artifact"
                    description="Upload your Service and API mock artifact for one-time import of definitions."
                />
                <section className="flex flex-col gap-3 lg:flex-row lg:gap-4 w-full">
                    <Form {...form}>
                        <form className="w-full p-10 flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="shadcn" {...fileRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isSecondary"
                                render={({ field }) => (
                                    // align text middle vertically
                                    <FormItem className="flex items-center gap-2 align-text-top">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="">Is this a secondary artifact?</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </section>
            </div>
        </Container>
    );
}
