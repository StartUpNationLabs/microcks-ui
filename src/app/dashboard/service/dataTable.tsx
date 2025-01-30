import { useQuery } from '@tanstack/react-query'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationLink,
} from '@/components/ui/pagination'
import {useMemo, useState} from "react";

// Fetcher function to get data from the API
const fetchServices = async ({ pageParam = 0 }) => {
    const response = await fetch(
        `http://localhost:8080/api/services?pages=${pageParam}&size=50`
    )
    if (!response.ok) throw new Error('Failed to fetch data')
    return response.json()
}

const DataTable = () => {
    // React Query hook to fetch data
    const { data, isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices ,
    })

    const [globalFilter, setGlobalFilter] = useState('')

    // Table columns definition
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
        state: {
            globalFilter,
        },
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
            <div className="flex items-center gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    style={{ width: '300px' }}
                />
                <Button onClick={() => setGlobalFilter('')}>Clear</Button>
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
                                <TableCell key={cell.id}>
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
