import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Event, PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/ui/badge";

export default function Dashboard({
    auth,
    events,
}: PageProps & {
    events: Event[];
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Events
                    </h2>
                    <Link href={route("events.create")}>
                        <PrimaryButton>Add Event</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event) => {
                        return (
                            <div
                                key={event.id}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                            >
                                <div className="p-6 text-gray-900">
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-bold">
                                            {event.name}
                                        </h3>
                                        <span></span>
                                        <Badge variant="destructive">
                                            {event.gifts_count} gift(s)
                                        </Badge>
                                    </div>
                                    <p>{event.date.toString()}</p>

                                    <Link href={route("events.show", event.id)}>
                                        <PrimaryButton className="mt-4">
                                            Open
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
