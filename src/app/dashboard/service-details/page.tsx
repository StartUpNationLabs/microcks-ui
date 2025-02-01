import { SidebarInset } from '@/components/ui/sidebar'
import { Header } from '../service/header'
import { useNavigate, useParams } from 'react-router'
import { mockApi } from '@/apis'
import { ServiceView } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { ServiceAccordion } from './service-accordion'

const fetchService = async (id: string) => {
    return (await mockApi.getService({ id: id ?? '', messages: true }))
        ?.data as ServiceView
}

export default function ServiceDetails() {
    const params = useParams()
    const navigate = useNavigate()

    if (!params.apiId || params.apiId === '') {
        navigate('/dashboard/services')
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: [params.apiId],
        queryFn: () => fetchService(params.apiId ?? ''),
    })

    if (isLoading) return <div>Loading...</div>
    if (isError || !data) {
        return <div>Error fetching data.</div>
    }

    console.table(data)

    const apiDateMetadataProcessing = (data: ServiceView): string => {
        return (
            'Created on ' +
            new Date(
                (data?.service?.metadata ?? {}).createdOn ?? 0
            ).toDateString() +
            ' and last updated on ' +
            new Date(
                (data?.service?.metadata ?? {}).lastUpdate ?? 0
            ).toDateString()
        )
    }

    return (
        <SidebarInset>
            <Header
                breadcrumbs={[
                    {
                        name: 'Dashboard',
                        href: '/dashboard',
                    },
                    {
                        name: 'APIs and Services',
                        href: '/dashboard/services',
                    },
                ]}
                current={data?.service.name ?? ''}
            />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h1
                                className="text-3xl font-semibold tracking-tight leading-tight mb-2"
                                tabIndex={-1}
                            >
                                {data?.service.name ?? ''}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                {apiDateMetadataProcessing(data)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        {Object.keys(data.messagesMap)
                            .reverse()
                            .map((key, index) => (
                                <ServiceAccordion
                                    key={index}
                                    operations={data.messagesMap[key]}
                                    name={key}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}
