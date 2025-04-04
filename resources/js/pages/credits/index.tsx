import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler, useEffect } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recharger des SMS',
        href: '/credits',
    },
];

type creditForm = {
    sms_asked: string
};

export default function Credits() {

    const { data, setData, post, processing, errors, reset } = useForm<Required<creditForm>>({
        sms_asked: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('credits.store'), {
            onFinish: () => {
                reset('sms_asked');
            }
        });
    };

    const { success } = usePage().props as { success?: string };

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Recharger sms" />

            <div className="grid md:flex flex-col gap-6 border">

                <div className="flex items-center bg-gray-50 px-2 py-5 border border-x-0 border-t-0">
                    <span className="text-base">Acheter des SMS</span>
                </div>

                <form className="flex p-5 gap-6" onSubmit={submit}>

                    <div className="grid gap-2">
                        <Label>Montant du sms</Label>
                        <Input
                            id="title"
                            type="text"
                            tabIndex={1}
                            value={10}
                            disabled
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>SMS à recharger</Label>
                        <Input
                            type="number"
                            min={10}
                            tabIndex={1}
                            value={data.sms_asked}
                            onChange={(e) => setData('sms_asked', e.target.value)}
                            className={errors.sms_asked && "border border-red-500"}
                        />
                        <InputError message={errors.sms_asked} />
                    </div>

                    <Button type="submit" className="cursor-pointer mt-5.5 border-1 text-black border-black bg-transparent hover:bg-black hover:text-white" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Envoyer
                    </Button>

                </form>

            </div>

        </AppLayout>
    )
}
