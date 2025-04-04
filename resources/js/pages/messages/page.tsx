import { Head, useForm, usePage } from '@inertiajs/react';

import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Sender } from '../senders/columns';
import { Badge } from '@/components/ui/badge';
import { FormEventHandler, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import * as XLSX from "xlsx";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Messages',
        href: '/messages',
    },
];

type messageForm = {
    title: string;
    sender_id: string;
    message: string;
    phones: string[],
    total: number,
    type: string
};

export default function Messages({ senders, balance, type }: { senders: Sender[], balance: number, type: string }) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<messageForm>>({
        title: '',
        sender_id: '',
        message: '',
        phones: [],
        total: 0,
        type: ''
    });

    const { success, error } = usePage().props as { success?: string, error?: string };

    const [value, setValue] = useState('');
    const [values, setValues] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(true);
    const [validCount, setValidCount] = useState(0);
    const [invalidCount, setInvalidCount] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [wrong, setWrong] = useState<string | null>(null);

    const [totalContacts, setTotalContacts] = useState<number>(0);
    const [validContacts, setValidContacts] = useState<number>(0);
    const [invalidContacts, setInvalidContacts] = useState<number>(0);

    const validatePhones = (value: string) => {

        const phoneNumbers = value.split(",").map((num) => num.trim());
        const validNumbers = phoneNumbers.filter((num) => /^\d{9}$/.test(num)); // Garde seulement ceux qui ont 9 chiffres
        const invalidNumbers = phoneNumbers.filter((num) => num.length > 0 && !/^\d{9}$/.test(num)); // Identifie les non valides

        setValidCount(validNumbers.length);
        setInvalidCount(invalidNumbers.length);
        setIsValid(invalidNumbers.length === 0);
    };

    const onChange = (val: string) => {
        setValue(val);
        validatePhones(val);
    }

     const submit: FormEventHandler = (e) => {
        e.preventDefault();

        data.type = type;

        if(type === "input") {
            data.phones = value.split(',');
            data.total = Math.ceil(data.message.length / 160) * validCount;
        } else {
            data.phones = values;
            data.total = Math.ceil(data.message.length / 160) * validContacts;
        }

        post(route('messages.store'), {
            onFinish: () => {
                reset('title', 'message', 'sender_id');
                setValue('');
            }
        });
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          //@ts-expect-error("don't verify")
          const phoneNumbers: string[] = XLSX.utils.sheet_to_json(sheet, { header: 1 }).flat();

          const total = phoneNumbers.length;
          const valid = phoneNumbers.filter((num) => /^\d{9}$/.test(num)).length
          const invalid = total - valid;


          let temp = "";
          for(const item of phoneNumbers) {
            if(/^\d{9}$/.test(item)) {
                temp += item + ",";
            }
          }
          setValues(temp.slice(0, -1).split(','));
          setTotalContacts(total);
          setValidContacts(valid);
          setInvalidContacts(invalid);
        };
        reader.readAsBinaryString(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          const selectedFile = event.target.files[0];

          // Vérification du type de fichier (Excel uniquement)
          if (!selectedFile.name.endsWith(".xls") && !selectedFile.name.endsWith(".xlsx") && !selectedFile.name.endsWith(".csv")) {
            setWrong("Seuls les fichiers Excel (.xls, .xlsx, .csv) sont autorisés.");
            setFile(null);
            return;
          }

          setWrong(null);
          setFile(selectedFile);
          processFile(selectedFile);
        }
    };

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />

            <form className="flex flex-col p-10 gap-6" onSubmit={submit}>

                {error && <div className="grid px-2 py-3 bg-red-400 text-white">{ error }</div>}

                <div className="grid md:flex gap-6">

                    <div className="flex flex-col justify-between md:w-2/3 gap-5 border">
                        <div className="flex items-center bg-gray-50 px-2 py-5 border border-x-0 border-t-0">
                            <span className="text-base">Envoyer un message</span>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2 px-2">
                                <Label htmlFor="title">Titre de la campagne</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="lancement nouveau produit......"
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div className="grid gap-2 px-2">
                                <Label htmlFor="sender_id">Expéditeur</Label>
                                <Select
                                    required
                                    value={data.sender_id}
                                    onValueChange={(value) => setData('sender_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner l'expediteur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {senders.map((item) => (
                                            <SelectItem key={item.id} value={item.slug}>{item.slug}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.sender_id} />
                            </div>
                            <div className="grid gap-2 px-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Contenu du message..."
                                    required
                                    className="h-50"
                                    onChange={(e) => setData('message', e.target.value)}
                                />
                                {data.message && <span className="text-sm font-semibold">Taille: {data.message.length} Caractères / {Math.ceil(data.message.length / 160)} SMS</span>}
                                <InputError message={errors.message} />
                            </div>
                            <div className="flex items-center gap-6 bg-gray-50 px-2 py-3 border border-x-0 border-b-0">
                                <Button type="submit" className="cursor-pointer border-1 text-black border-black bg-transparent hover:bg-black hover:text-white" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Envoyer
                                </Button>
                                <Button className="border-1 border-red-400 text-red-400 bg-white hover:bg-red-400 hover:text-white cursor-pointer" onClick={() => reset('message', 'sender_id', 'title')} >
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:w-1/3">

                        <div className="flex flex-col gap-2 border rounded-sm pb-4">

                            <div className="flex items-center bg-gray-50 border border-x-0 border-t-0 p-3">
                                {type === "input" ?
                                    <span className="text-sm text-black">Entrer les contacts <small>(placer une virgule entre deux numéros)</small></span>
                                    :
                                    <span className="text-sm text-black">Charger un fichier <small>(Excel ou CSV, première colonne pour les numéros)</small></span>
                                }
                            </div>

                            <div className="px-3">
                                {type === "input" ?
                                    <>
                                        <Textarea
                                            id="phones"
                                            placeholder="678660800,694282821..."
                                            required
                                            className={cn("h-30", !isValid ? "focus-visible:border-red-400 focus-visible:shadow-red-400" : "focus-visible:shadow-green-400") }
                                            value={value}
                                            onChange={(e) => onChange(e.target.value) }
                                        />
                                        <InputError message={errors.phones} />
                                    </>:
                                    <>
                                        <Input
                                            type="file"
                                            accept=".xls,.xlsx,csv"
                                            onChange={handleFileChange}
                                            placeholder="lancement nouveau produit......"
                                        />
                                        {wrong && <InputError message={wrong} />}
                                    </>
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border rounded-sm pb-4">

                            <div className="flex items-center bg-gray-50 border border-x-0 border-t-0 p-3">
                                <span className="text-sm text-black-700">Details des contacts</span>
                            </div>

                            <div className="flex flex-col border rounded-sm mx-2">
                                {type === "input" ?
                                    <>
                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Total numéros</span>
                                            <Badge>{value ? value.split(',').length : 0}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2 border border-x-0">
                                            <span className="text-sm">Numéros valides</span>
                                            <Badge className="bg-green-400">{ value ? validCount : 0 }</Badge>
                                        </div>

                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Numéros invalides</span>
                                            <Badge variant="destructive">{ invalidCount }</Badge>
                                        </div>

                                        <div className="flex justify-between p-2 border border-x-0">
                                            <span className="text-sm">SMS/Contact</span>
                                            <Badge>{Math.ceil(data.message.length / 160)}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Total SMS</span>
                                            <Badge>{Math.ceil(data.message.length / 160) * validCount}</Badge>
                                        </div>
                                    </>:
                                    <>
                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Total numéros</span>
                                            <Badge>{totalContacts}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2 border border-x-0">
                                            <span className="text-sm">Numéros valides</span>
                                            <Badge className="bg-green-400">{validContacts}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Numéros invalides</span>
                                            <Badge variant="destructive">{invalidContacts}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2 border border-x-0">
                                            <span className="text-sm">SMS/Contact</span>
                                            <Badge>{Math.ceil(data.message.length / 160)}</Badge>
                                        </div>

                                        <div className="flex justify-between p-2">
                                            <span className="text-sm">Total SMS</span>
                                            <Badge>{Math.ceil(data.message.length / 160) * validContacts}</Badge>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border rounded-sm pb-4">

                            <div className="flex items-center bg-gray-50 border border-x-0 border-t-0 p-3">
                                <span className="text-sm text-black">Solde</span>
                            </div>

                            <span className="font-semibold tracking-wider uppercase px-3"> { balance } sms</span>

                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    )
}
