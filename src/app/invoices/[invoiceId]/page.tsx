import { notFound } from "next/navigation";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";
export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId, orgId } = await auth();
  if (!userId) return;
  // Use params directly as a plain object
  const invoiceId = Number.parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoiceId param");
  }
  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoice,
    customer: result.customers,
  };

  return <Invoice invoice={invoices} />;
}
