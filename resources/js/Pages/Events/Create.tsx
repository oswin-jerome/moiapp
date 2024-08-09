import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEvent } from "react";

const CreateEventPage = ({ auth }: PageProps) => {
    const { data, post, setData, errors } = useForm<{
        name: string;
        date: Date | null;
    }>({
        name: "",
        date: null,
    });

    const handle = (e: FormEvent) => {
        e.preventDefault();

        post(route("events.store"), {
            onSuccess: () => {
                alert("Inserted");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Event
                    </h2>
                    {/* <PrimaryButton>Add Event</PrimaryButton> */}
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form onSubmit={handle} className="grid gap-4">
                            <div className="input">
                                <InputLabel>Name</InputLabel>
                                <TextInput
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                    }}
                                    className="w-full"
                                ></TextInput>
                                <InputError message={errors.name} />
                            </div>
                            <div className="input">
                                <InputLabel>Date</InputLabel>
                                <TextInput
                                    // value={data.date?.toDateString()}
                                    onChange={(e) => {
                                        setData("date", e.target.valueAsDate);
                                    }}
                                    type="date"
                                    className="w-full"
                                ></TextInput>
                                <InputError message={errors.date} />
                            </div>

                            <div>
                                <PrimaryButton>Create</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateEventPage;
