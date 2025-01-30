import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { Separator } from '@radix-ui/react-separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/ui/breadcrumb.tsx'
import { Link } from 'react-router'
import Hero from "@/app/dashboard/homepage/Hero.tsx";

export const Homepage = () => {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
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
            <Hero />
        </SidebarInset>
    )
}
