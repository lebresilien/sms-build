import { Head, useForm } from '@inertiajs/react';

import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

import { Sender, columns } from "./columns";
import { DataTable } from "./data-table";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Senders',
        href: '/senders',
    },
];

type senderForm = {
    name: string;
};

async function getData(): Promise<Sender[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        name: "pigier",
        slug: "Pigier",
      },
      {
        id: "728ed58f",
        name: "iuc",
        slug: "IUC",
      },
      // ...
    ]
  }

export default function Senders() {

    const { data, setData, post, processing, errors, reset } = useForm<Required<senderForm>>({
            name: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Senders" />
            <div className="grid gap-6 justify-center items-center h-full">
                <div className="flex flex-col border-1 p-5 w-[700px]">
                    <div className="flex gap-6 p-2">
                        <div className="flex border-1 w-2/3 p-3 rounded-sm">
                            <form className="flex w-full justify-between gap-6" onSubmit={() => {}}>
                                <div className="grid gap-2 w-3/4">
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        value={data.name}
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
                        <div className="flex w-1/3 justify-center items-center px-3">
                            <Input
                                id="name"
                                type="text"
                                placeholder="search..."
                            />
                        </div>
                    </div>
                    <div className="">
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
