"use client"

import * as React from "react"
import {Label, Pie, PieChart} from "recharts"
import {useQuery} from "@tanstack/react-query"
import {mockApi} from "@/apis.ts"
import {Counter, Service} from "@/api/index.ts"

import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Define a chart configuration for API service types
const chartConfig = {
    count: {
        label: "Services",
    },
    REST: {label: "REST", color: "hsl(var(--chart-1))"},
    SOAP_HTTP: {label: "SOAP", color: "hsl(var(--chart-2))"},
    GENERIC_REST: {label: "Generic REST", color: "hsl(var(--chart-3))"},
    GENERIC_EVENT: {label: "Generic Event", color: "hsl(var(--chart-4))"},
    EVENT: {label: "Event", color: "hsl(var(--chart-5))"},
    GRPC: {label: "gRPC", color: "hsl(var(--chart-6))"},
    GRAPHQL: {label: "GraphQL", color: "hsl(var(--chart-7))"},
} satisfies ChartConfig

export function ApiTypeChart() {
    // Query to get the list of services
    const {data: services} = useQuery({
        queryKey: ['services', {pageParam: 0}],
        queryFn: async () => {
            return (await mockApi.getServices({size: 500}))?.data as Service[]
        },
    })

    const {data: totalApis} = useQuery({
        queryKey: ['services', "count"],
        queryFn: async () => {
            return (await mockApi.getServicesCounter())?.data as Counter
        },
    })
    const totalCount = totalApis?.counter || 0

    // Aggregate the services by their type
    const aggregatedData = React.useMemo(() => {
        if (!services) return []
        const counts: Record<string, number> = {}
        services.forEach((service) => {
            const type = service.type
            counts[type] = (counts[type] || 0) + 1
        })

        // Map the counts to the format needed for recharts, and include the color from chartConfig.
        return Object.entries(counts).map(([type, count]) => ({
            type,
            count,
            fill: chartConfig[type]?.color || "var(--default-chart-color)",
        }))
    }, [services])


    return (
        <Card className="flex flex-col" style={{border: "0"}}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Service Types</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
                        <Pie
                            data={aggregatedData}
                            dataKey="count"
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalCount}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Services
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent/>}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>{/* Optional: additional footer content */}</CardFooter>
        </Card>
    )
}
