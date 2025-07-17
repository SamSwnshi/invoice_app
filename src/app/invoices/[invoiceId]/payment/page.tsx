import { Badge } from "@/components/ui/badge";

import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

export default async function Invoice({
    params,
}: {
    params: { invoiceId: string };
}) {
    const awaitedParams = await params;
    const invoiceId = Number.parseInt(awaitedParams.invoiceId);

    if (isNaN(invoiceId)) {
        throw new Error("Invalid invoiceId param");
    }

    const [result] = await db
        .select({
            id: Invoices.id,
            status: Invoices.status,
            createTs: Invoices.createTs,
            description: Invoices.description,
            value: Invoices.value,
            name: Customers.name,
        })
        .from(Invoices)
        .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
        .where(and(eq(Invoices.id, invoiceId)))
        .limit(1);

    if (!result) {
        notFound();
    }

    const invoices = {
        ...result,
        customer: { name: result.name },
    };

    return (
        <main className="w-full h-full">
            <Container>
                <div className="grid grid-cols-2">
                    <div>
                        <div className="flex justify-between items-center mb-8  w-full">
                            <h1 className="text-3xl font-semibold  flex items-center gap-6">
                                Invoice {invoices.id}
                                <Badge
                                    className={cn(
                                        "rounded-full capitalize",
                                        invoices.status === "open" && "bg-green-500",
                                        invoices.status === "paid" && "bg-green-700",
                                        invoices.status === "void" && "bg-zinc-700",
                                        invoices.status === "uncollectible" && "bg-red-600"
                                    )}
                                >
                                    {invoices.status}
                                </Badge>
                            </h1>
                        </div>
                        <p className="text-3xl mb-3">${invoices.value / 100}</p>
                        <p className="text-lg mb-8">{invoices.description.toUpperCase()}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl fond-bold mb-4">Manage Invoice</h2>
                        {invoices.status === 'open' && (
                            <form>
                                <Button className="flex gap-2 font-bold bg-green-800">
                                    <CreditCard className="w-5 h-auto" />
                                    Pay Invoice
                                </Button>
                            </form>
                        )}
                        {invoices.status === 'paid' && (
                           <p className="flex gap-2 items-center text-xl font-bold"><Check className="w-8 h-auto bg-green-600 rounded-full tex-white p-1"/>Invoice Paid</p>
                        )}

                    </div>
                </div>

                <h2 className="font-bold text-lg mb-4">Billing Details</h2>
                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice ID
                        </strong>
                        <span>{invoices.id}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice Date
                        </strong>
                        <span>{new Date(invoices.createTs).toLocaleDateString()}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Billing Name
                        </strong>
                        <span>{invoices.customer.name}</span>
                    </li>
                </ul>
            </Container>
        </main >
    );
}
