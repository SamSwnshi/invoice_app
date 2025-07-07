import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgePlus } from 'lucide-react';
import Link from "next/link";


export default function page() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 h-full  max-w-5xl mx-auto my-12">
            <div className="flex justify-between items-center  w-full">
                <h1 className="text-3xl font-semibold text-left">Dashboard</h1>
                <p>
                    <Button variant="ghost" className="inline-flex gap-2" asChild>
                        <Link href="/invoices/new">
                            <BadgePlus className="h-4 w-4 " />Create Invoices
                        </Link>
                    </Button>
                </p>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] p-4">Date</TableHead>
                        <TableHead className="p-4">Customer</TableHead>
                        <TableHead className="p-4">Email</TableHead>
                        <TableHead className="text-center p-4">Status</TableHead>
                        <TableHead className="text-right p-4">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium text-left p-4">
                            <span className="font-semibold">07/JULY/2025</span>
                        </TableCell>
                        <TableCell className="text-left p-4">
                            <span className="font-semibold">Sameer Suryawanshi</span>
                        </TableCell>
                        <TableCell className="text-left p-4">
                            <span className="">harsh@gmail.com</span>
                        </TableCell>
                        <TableCell className="text-center p-4">
                            <Badge className="rounded-full">Open</Badge>
                        </TableCell>
                        <TableCell className="text-right p-4">
                            <span className="font-semibold">$250.00</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main >
    );
}
