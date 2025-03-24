"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";

export type Sender = {
    id: string
    name: string
    slug: string
}

const DisplayRow = ({ item }: { item: Sender }) => {

    const { delete: destroy, processing } = useForm({});

    const [status, setStatus] = useState(true);

    const deleteItem = (id: string) => {
        destroy(route('senders.delete', id))
    }

    return (
    <div className="flex justify-end">
        {status ?
            <div className="flex justify-center border rounded-sm p-2 w-auto border-red-400 cursor-pointer group hover:bg-red-400 hover:border-white">
                <Trash className="text-red-400 group-hover:text-white" onClick={() => setStatus(!status)} />
            </div>:
            <div className="flex gap-6">
                <Button
                    className="border-1 border-red-400 text-red-400 bg-white hover:bg-red-400 hover:text-white cursor-pointer"
                    onClick={() => deleteItem(item.id)}
                    disabled={processing}
                >
                    Confirmer
                </Button>
                <Button className="cursor-pointer border-1 text-black border-black bg-transparent hover:bg-black hover:text-white " onClick={() => setStatus(!status)}>Annuler</Button>
            </div>
        }
    </div>
    )
}

export const columns: ColumnDef<Sender>[] = [
    {
      accessorKey: "slug",
      header: "Name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DisplayRow item={row.original} />
            )
        }
    }
];
