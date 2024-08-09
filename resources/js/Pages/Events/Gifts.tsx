import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Event, Gift, PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import moment from "moment";
import { GiftIcon, IndianRupeeIcon } from "lucide-react";
import InputLabel from "@/Components/InputLabel";

export default function Dashboard({
    auth,
    event,
    gifts,
    gifts_count,
    gifts_sum,
}: PageProps & {
    event: Event;
    gifts: Gift[];
    gifts_count: number;
    gifts_sum: number;
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {event.name}
                    </h2>
                    {/* <PrimaryButton>Add Event</PrimaryButton> */}
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12 max-w-7xl mx-auto grid gap-4">
                <div className=" rounded-lg">
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
                </div>
                <div className="sm:px-6 lg:px-8 p-2 bg-white rounded-lg">
                    <div className="input mb-4">
                        <InputLabel>Gifted To</InputLabel>
                        <select
                            onChange={(e) => {
                                router.reload({
                                    data: {
                                        gifted_to: e.target.value,
                                    },
                                });
                            }}
                        >
                            <option value="">All</option>
                            <option value="Bride">Bride</option>
                            <option value="Groom">Groom</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="overflow-scroll w-screen md:w-auto md:overflow-hidden">
                        <Table>
                            <TableCaption>A list of your gifts.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] ">
                                        Name
                                    </TableHead>
                                    <TableHead className="min-w-32">
                                        Date & Time
                                    </TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Gifted To</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {gifts.map((gift) => {
                                    return (
                                        <TableRow key={gift.id}>
                                            <TableCell className="font-medium">
                                                {gift.name}
                                            </TableCell>
                                            <TableCell>
                                                {moment(gift.created_at).format(
                                                    "D MMM Y - h:m A"
                                                )}
                                            </TableCell>
                                            <TableCell>{gift.phone}</TableCell>
                                            <TableCell>
                                                {gift.gifted_to}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {gift.amount}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
