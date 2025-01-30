import {SidebarInset, SidebarTrigger} from '@/components/ui/sidebar.tsx';
import {Separator} from '@radix-ui/react-separator';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,} from '@/components/ui/breadcrumb.tsx';
import {Link} from 'react-router';
import Hero from '@/app/dashboard/homepage/Hero.tsx';
import {InvocationChart} from '@/app/dashboard/homepage/invocationChart.tsx';
import {ApiTypeChart} from '@/app/dashboard/homepage/apiTypeChart.tsx';

export const Homepage = () => {
    return (
        <SidebarInset>
            <header
                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <Link to="/dashboard">
                                    <BreadcrumbLink>Dashboard</BreadcrumbLink>
                                </Link>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="p-4 space-y-4">
                <Hero/>

                <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4"
                >
                    <InvocationChart/>
                    <ApiTypeChart/>
                </div>
            </div>
        </SidebarInset>
    );
};