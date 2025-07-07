
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export default function page() {
    return (
        <main className="flex flex-col  justify-center gap-6 h-full  max-w-5xl mx-auto my-12">
            <div className="flex justify-between items-center  w-full">
                <h1 className="text-3xl font-semibold text-left">Create a New Invoice</h1>
            </div>
            <div className=" grid gap-4 max-w-md">
                <form >
                    <div className="mb-2">
                        <Label htmlFor="name" className="block mb-2 font-semibold text-sm" >Billing Name</Label>
                        <Input id="name" name="name" type="text" />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="email" className="block mb-2 font-semibold text-sm">Billing Email</Label>
                        <Input id="email" name="email" type="email" />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="value" className="block mb-2 font-semibold text-sm">Value</Label>
                        <Input id="value" name="value" type="text" />
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="description" className="block mb-2 font-semibold text-sm">Description</Label>
                        <Textarea id="description" name="description" ></Textarea>
                    </div>
                    <div>
                        <Button className="w-full font-semibold">Submit</Button>
                    </div>
                </form>
            </div>
        </main >
    );
}
