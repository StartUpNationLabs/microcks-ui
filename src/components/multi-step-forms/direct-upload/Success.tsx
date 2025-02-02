import SectionHeader from "../SectionHeader";
import Container from "../Container";
import useStore from "@/store/useStore";
import { useDirectUpload } from "@/components/multi-step-forms/direct-upload/createDirectUploadSlice.ts";
import { Button } from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {mockApi} from "@/apis.ts";
import {Service} from "@/api";
import {useNavigate} from "react-router";

export default function Success() {
    const { step, increaseStep, decreaseStep, setIsSubmitted, setDialogOpen } = useStore((state) => state);
    const { version, name } = useDirectUpload((state) => state);
    const navigate = useNavigate()
    const {data, isLoading} = useQuery(
        {
            queryKey: ["search", {
                version,
                name
            }],
            queryFn: async () => {
               return ( await mockApi.searchServices({
                    queryMap: {
                        name,
                        version
                    }
                })).data as Service[];
            }
        }
    )

    const handleGoToMocks = () => {
        // get the first service
        const service = data?.[0];
        if (service) {
            navigate(`/dashboard/services/${service.id}`);
        }
        setDialogOpen(false);
    };

    return (
        <Container onNext={() => {}} onPreviousStep={() => {}} showSidebar={false} stepType={"LAST"}>
            <div className="text-center py-10">
                <SectionHeader
                    title="Success"
                    description="Your artifact has been uploaded successfully."
                />
                <div className="my-4">
                    <p className="text-lg font-semibold">Artifact Name: {name}</p>
                    <p className="text-lg font-semibold">Version: {version}</p>
                </div>
                <section className="flex flex-col gap-3 lg:flex-row lg:gap-4 w-full justify-center items-center">
                    <Button onClick={handleGoToMocks} className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg" disabled={isLoading}>
                        Go to Mocks
                    </Button>
                </section>
            </div>
        </Container>
    );
}