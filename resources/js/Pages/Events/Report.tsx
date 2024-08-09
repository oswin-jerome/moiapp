import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Event, PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/ui/badge";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";

export default function Dashboard({
    auth,
    event,
}: PageProps & {
    event: Event;
}) {
    const [gifted, setGifted] = useState("");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Report - {event.name}
                    </h2>
                    <PrimaryButton>View Event</PrimaryButton>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4 grid-cols-[200px,auto] h-full">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="input ">
                            <InputLabel>Gifted To</InputLabel>
                            <select
                                onChange={(e) => {
                                    setGifted(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="Bride">Bride</option>
                                <option value="Groom">Groom</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 min-h-[600px]">
                        <iframe
                            className="w-full h-full"
                            src={
                                route("event.report.pdf", event.id) +
                                "?gifted_to=" +
                                gifted
                            }
                        ></iframe>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
