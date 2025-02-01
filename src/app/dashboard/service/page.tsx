import { SidebarInset } from '@/components/ui/sidebar'
import DataTable from '@/app/dashboard/service/dataTable.tsx'
import { Header } from '@/app/dashboard/service/header.tsx'

export default function Services() {
    return (
        <SidebarInset>
            <Header
                breadcrumbs={[
                    {
                        name: 'Dashboard',
                        href: '/dashboard',
                    },
                ]}
                current="APIs and Services"
            />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <h1
                                className="text-3xl font-semibold tracking-tight leading-tight mb-2"
                                tabIndex={-1}
                            >
                                APIs and Services
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                        These are the APIs | Services managed by Microcks{' '}
                        <a
                            href="https://microcks.io/documentation/guides/usage/importing-content/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link whitespace-nowrap"
                            aria-label="Learn more about importing APIs and Services"
                        >
                            Learn more ↗
                        </a>
                        . You can discover new ones adding Import Job or
                        creating a new Direct API...
                    </p>
                    <div className={'  p-4 '}>
                        <DataTable />
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}
