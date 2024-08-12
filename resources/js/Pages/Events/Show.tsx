import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Event, PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { FormEvent } from "react";
import { GiftIcon, IndianRupeeIcon } from "lucide-react";

export default function ShowEvent({
    auth,
    event,
    gifts_count,
    gifts_sum,
}: PageProps & {
    event: Event;
    gifts_count: number;
    gifts_sum: number;
}) {
    const { data, setData, errors, post, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        amount: 0,
        note: "",
        gifted_to: "",
    });

    const page = usePage();

    const handle = (e: FormEvent) => {
        e.preventDefault();
        // router.post(route("gifts.store", event.id),data,);
        post(route("gifts.store", event.id), {
            onSuccess: (e: any) => {
                alert("Inserted");

                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {event.name}
                    </h2>
                    <div className="gap-2 flex flex-col md:flex-row">
                        <Link href={route("gifts.index", event.id)}>
                            <PrimaryButton>View Gifts</PrimaryButton>
                        </Link>
                        <Link
                            href={route("event.report", event.id)}
                            target="__blank"
                        >
                            <PrimaryButton>View Report</PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-4 grid">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex gap-4 items-center">
                            <IndianRupeeIcon className="size-6" />
                            <h3 className="text-2xl font-bold">{gifts_sum}</h3>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex gap-4 items-center">
                            <GiftIcon className="size-6" />
                            <h3 className="text-2xl font-bold">
                                {gifts_count}
                            </h3>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <h2 className="font-bold text-lg">Add a Present</h2>
                        <form onSubmit={handle} className="mt-4 grid gap-4">
                            <div className="input">
                                <InputLabel>Name</InputLabel>
                                <TextInput
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                    }}
                                ></TextInput>
                                <InputError message={errors.name} />
                            </div>
                            <div className="input">
                                <InputLabel>Address</InputLabel>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => {
                                        setData("address", e.target.value);
                                    }}
                                ></textarea>
                                <InputError message={errors.address} />
                            </div>
                            <div className="input">
                                <InputLabel>Phone</InputLabel>
                                <TextInput
                                    value={data.phone}
                                    onChange={(e) => {
                                        setData("phone", e.target.value);
                                    }}
                                ></TextInput>
                                <InputError message={errors.phone} />
                            </div>
                            <div className="input">
                                <InputLabel>Gifted to</InputLabel>
                                <select
                                    value={data.gifted_to}
                                    onChange={(e) => {
                                        setData("gifted_to", e.target.value);
                                    }}
                                >
                                    <option value={"Bride"}>Bride</option>
                                    <option value={"Groom"}>Groom</option>
                                    <option value={"Others"}>Others</option>
                                </select>
                                <InputError message={errors.gifted_to} />
                            </div>
                            <div className="input">
                                <InputLabel>Amount</InputLabel>
                                <TextInput
                                    value={data.amount}
                                    onChange={(e) => {
                                        setData(
                                            "amount",
                                            e.target.valueAsNumber
                                        );
                                    }}
                                    type="number"
                                ></TextInput>
                                <InputError message={errors.amount} />
                            </div>
                            <div className="input">
                                <InputLabel>Note</InputLabel>
                                <TextInput
                                    value={data.note}
                                    onChange={(e) => {
                                        setData("note", e.target.value);
                                    }}
                                ></TextInput>
                                <InputError message={errors.note} />
                            </div>

                            <div className="mt-2 flex justify-center">
                                <PrimaryButton>Add</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
