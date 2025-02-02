import SectionHeader from "../SectionHeader";
import Container from "../Container";
import useStore from "@/store/useStore";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {configuration} from "@/apis.ts";
import axios from "axios";
import {useDirectUpload} from "@/components/multi-step-forms/direct-upload/createDirectUploadSlice.ts";

const formSchema = z.object({
    file: z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    isSecondary: z.boolean().optional(),
});

export default function Submit() {
    const {step, increaseStep, decreaseStep, setIsSubmitted, setDialogOpen, } = useStore((state) => state);
    const {setVersion, setName} = useDirectUpload(state => state);
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const formData = new FormData();
            formData.append("file", data.file[0]);
            formData.append("mainArtifact", data.isSecondary ? "false" : "true");
            return axios.post(configuration.basePath + '/artifact/upload',
                formData);
        },

        onSuccess: (data) => {
            // split the version and name from the response
            const [name, version] = data.data.split(":");
            setName(name);
            setVersion(version);
            increaseStep(step);
            setIsSubmitted(true);

        }
    })

    const onPrevious = () => {
        decreaseStep(step);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register("file");
    const onNext = () => {
        form.handleSubmit(async (data) => {
            mutation.mutate(data);
        })();
    };

    return (
        <Container onNext={onNext} onPreviousStep={onPrevious} showSidebar={false} stepType={"LAST"}
                   disabledNext={false} loadingNext={mutation.isPending}>
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="shadcn" {...fileRef} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isSecondary"
                                render={({field}) => (
                                    // align text middle vertically
                                    <FormItem className="flex items-center gap-2 align-text-top">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="">Is this a secondary artifact?</FormLabel>
                                        <FormMessage/>
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
