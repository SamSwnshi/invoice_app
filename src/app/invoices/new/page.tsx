"use client";

import { SyntheticEvent, useState, startTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";
import Form from "next/form";
export default function Home() {
    const [state, setState] = useState("ready");

    async function handleSubmit(e: SyntheticEvent) {
        if (state === "pending") {
            e.preventDefault();
            return;
        }
        setState("pending");
    }

    return (
        <main className=" h-full">
            <Container>
            <div className="flex justify-between items-center mb-6 w-full">
                <h1 className="text-3xl font-semibold text-left">
                    Create a New Invoice
                </h1>
            </div>
            <Form
                action={createAction}
                onSubmit={handleSubmit}
                className=" grid gap-4 max-w-md"
            >
                <div className="mb-2">
                    <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
                        Billing Name
                    </Label>
                    <Input id="name" name="name" type="text" />
                </div>
                <div className="mb-2">
                    <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
                        Billing Email
                    </Label>
                    <Input id="email" name="email" type="email" />
                </div>
                <div className="mb-2">
                    <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
                        Value
                    </Label>
                    <Input id="value" name="value" type="text" />
                </div>
                <div className="mb-3">
                    <Label
                        htmlFor="description"
                        className="block mb-2 font-semibold text-sm"
                    >
                        Description
                    </Label>
                    <Textarea id="description" name="description"></Textarea>
                </div>
                <div>
                    <SubmitButton />
                </div>
            </Form>
            </Container>
        </main>
    );
}
