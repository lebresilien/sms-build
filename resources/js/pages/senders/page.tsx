import { Head } from '@inertiajs/react';

import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';

import { Sender, columns } from "./columns";
import { DataTable } from "./data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Senders',
        href: '/senders',
    },
];

export default function Senders({ senders }: { senders: Sender[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Senders" />
            <div className="grid gap-6 justify-center items-center h-full">
                <div className="grid border-1 p-5 w-auto">
                    <DataTable columns={columns} data={senders} />
                </div>
            </div>
        </AppLayout>
    );
}

