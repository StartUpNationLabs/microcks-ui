import { useQuery } from '@tanstack/react-query'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useMemo, useState } from 'react'
import { Service } from '@/api/api.ts'
import { mockApi } from '@/apis.ts'
import { useNavigate } from 'react-router'
import {AddService} from "@/app/dashboard/service/addService.tsx";

// Fetcher function to get data from the API
const fetchServices = async ({ pageParam = 0 }) => {
    return (await mockApi.getServices({ size: 20, page: pageParam }))
        ?.data as Service[]
}

const DataTable = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices,
    })

    const navigate = useNavigate()

    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'version',
                header: 'Version',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'operationsCount',
                header: 'Operations Count',
                cell: (info) => info.row.original.operations.length,
            },
        ],
        []
    )

    const tableInstance = useReactTable({
        data: data || [],
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data.</div>

    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4 justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        style={{ width: '300px' }}
                    />
                    <Button onClick={() => setGlobalFilter('')}>Clear</Button>
                </div>
                <AddService />
            </div>
            <Table>
                <TableHeader>
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    <div
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer flex items-center"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                        {header.column.getIsSorted()
                                            ? header.column.getIsSorted() ===
                                              'asc'
                                                ? ' 🔼'
                                                : ' 🔽'
                                            : null}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {tableInstance.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/services/${row.original.id}`
                                        )
                                    }
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => tableInstance.previousPage()}
                            disabled={!tableInstance.getCanPreviousPage()}
                        />
                    </PaginationItem>
                    {Array.from({ length: tableInstance.getPageCount() }).map(
                        (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() =>
                                        tableInstance.setPageIndex(index)
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => tableInstance.nextPage()}
                            disabled={!tableInstance.getCanNextPage()}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default DataTable
