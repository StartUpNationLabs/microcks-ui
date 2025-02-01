import { SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { Separator } from '@radix-ui/react-separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { Link } from 'react-router'
import React from 'react'

interface HeaderProps {
    breadcrumbs: BreadCrumbElement[]
    current: String
}

interface BreadCrumbElement {
    name: string
    href: string
}

export function Header(props: HeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {props.breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.name}>
                                <BreadcrumbItem
                                    key={index}
                                    className="hidden md:block"
                                >
                                    <Link to={crumb.href}>
                                        <BreadcrumbLink>
                                            {crumb.name}
                                        </BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                            </React.Fragment>
                        ))}
                        <BreadcrumbItem>
                            <BreadcrumbPage>{props.current}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
