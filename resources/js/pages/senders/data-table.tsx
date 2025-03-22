"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { FormEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

type senderForm = {
    name: string;
};

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {

   const { data: item, setData, post, processing, errors, reset } = useForm<Required<senderForm>>({
        name: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('senders.store'), {
            onFinish: () => reset('name')
        });
    };

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        columnFilters,
        },
    })

  return (
    <div>
        <div className="flex items-center py-4 gap-5">
            <div className="flex border-1 w-2/3 p-3 rounded-sm">
                <form className="flex w-full justify-between gap-6" onSubmit={submit}>
                    <div className="grid gap-2 w-3/4">
                        <Input
                            id="name"
                            type="text"
                            required
                            value={item.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            tabIndex={1}
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>
                    <Button type="submit" className="w-1/4" tabIndex={2} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Enregistrer
                    </Button>
                </form>
            </div>
            <div className="w-1/3 ">
                <Input
                    placeholder="Filter sender name..."
                    value={(table.getColumn("slug")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("slug")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
        </div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
