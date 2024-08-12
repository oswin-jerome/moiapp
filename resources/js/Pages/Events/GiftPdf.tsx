import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Event, Gift, PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/ui/badge";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";

export default function Dashboard({
    auth,
    event,
    gift,
}: PageProps & {
    event: Event;
    gift: Gift;
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
                    <Link href={route("events.show", event.id)}>
                        <PrimaryButton>View Event</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4 grid-cols-[auto] h-full">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 min-h-[600px]">
                        <iframe
                            className="w-full h-full"
                            src={route("gift.rec.pdf", [event.id, gift.id])}
                        ></iframe>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
