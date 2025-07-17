import { notFound } from "next/navigation";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";
export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId } = await auth();
  if (!userId) return;
  const awaitedParams = await params;
  const invoiceId = Number.parseInt(awaitedParams.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoiceId param");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers,eq(Invoices.customerId,Customers.id))
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoice,
    customer: result.customers
  }

  return (
   <Invoice invoice={invoices}/>
  );
}
