"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Sender = {
    id: string
    name: string
    slug: string
}

export const columns: ColumnDef<Sender>[] = [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    }
];
