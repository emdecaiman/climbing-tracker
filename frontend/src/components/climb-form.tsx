import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Climb } from "../components/climbs/columns";

// typescript only compile time static type checking
// use zod for runtime checks

const formSchema = z.object({
    name: z.string().optional(),
    date: z.string(),
    location: z.string().optional(),
    grade: z.union([
        z.string().regex(/^5\.\d{1,2}[abcd+-]?$/, "Invalid grade"),
        z.string().regex(/^V\d{1,2}$/, "Invalid grade"),
        z.string().regex(/^\d{1,2}[abcd]?$/, "Invalid grade"),
        z.string().regex(/^hex[1-6]$/, "Invalid grade"),
    ]),
    type: z.enum(["Boulder", "Top-Rope", "Lead"]),
    environment: z.enum(["Indoor", "Outdoor"]),
    flash: z.boolean(),
    note: z.string().max(255, "Notes must be 255 characters or less").optional(),
});

interface onSuccessProp {
    onSuccess?: () => void;
    onClimbCreated?: (newClimb: Climb) => void;
}

export const ClimbForm = ({ onSuccess, onClimbCreated }: onSuccessProp) => {
    // define form state with zod validator
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            date: new Date().toDateString(),
            location: "",
            grade: "",
            type: "Boulder",
            environment: "Indoor",
            flash: false,
            note: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch("/climbs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const newClimb = await response.json();

            if (response.ok && onSuccess && onClimbCreated) {
                onSuccess();
                onClimbCreated(newClimb);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Climb Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Climb Name (optional)"
                                    {...field}
                                    className="border-black/15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Location"
                                    {...field}
                                    className="border-black/15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., 5.10a, V5, 6a, hex1"
                                    {...field}
                                    className="border-black/15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <select {...field} className="border rounded p-2 w-full border-black/15">
                                    <option value="Boulder">Boulder</option>
                                    <option value="Top-Rope">Top-Rope</option>
                                    <option value="Lead">Lead</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="environment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Environment</FormLabel>
                            <FormControl>
                                <select {...field} className="border rounded p-2 w-full border-black/15">
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="flash"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Flash</FormLabel>
                            <FormControl>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...field}
                                        checked={field.value} // Bind the checkbox to the form state
                                        className="border rounded"
                                        value={undefined} // Ensure value is not set to a boolean
                                    />
                                    <span className="text-sm text-black/50">Flash Attempt?</span>
                                </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <textarea
                                    placeholder="Add any notes about the climb"
                                    {...field}
                                    className="border rounded p-2 w-full text-black/50"
                                    rows={4}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="cursor-pointer font-light text-white bg-blue-500 hover:bg-blue-600"
                            size="sm"
                        >
                            Submit
                        </Button>
                </div>
            </form>
        </Form>
    );
};