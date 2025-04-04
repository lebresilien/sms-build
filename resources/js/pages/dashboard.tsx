import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard(
    {
        balance,
        campaign,
        transactions
    }:
    {
        balance: number,
        campaign: number,
        transactions: number
    }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="flex flex-col bg-gray-100 items-center justify-center border-sidebar-border/70 dark:border-sidebar-border dark:bg-transparent relative aspect-video overflow-hidden rounded-xl border">
                        <p className="text-2xl text-black font-medium dark:text-white">Solde</p>
                        <p className="text-2xl text-black font-medium dark:text-white">{ balance }</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-100 border-sidebar-border/70 dark:border-sidebar-border dark:bg-transparent relative aspect-video overflow-hidden rounded-xl border">
                        <p className="text-2xl text-black font-medium dark:text-white">Campagnes</p>
                        <p className="text-2xl text-black font-medium dark:text-white">{ campaign }</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-100 border-sidebar-border/70 dark:border-sidebar-border dark:bg-transparent relative aspect-video overflow-hidden rounded-xl border">
                        <p className="text-2xl text-black font-medium dark:text-white">sms envoyés</p>
                        <p className="text-2xl text-black font-medium dark:text-white">{ transactions }</p>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                </div>
            </div>
        </AppLayout>
    );
}
