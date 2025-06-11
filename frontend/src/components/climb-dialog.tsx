import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ClimbForm } from "@/components/climb-form";
import { useState } from "react";
import { Climb } from "../components/climbs/columns";

export const ClimbDialog = ({ onClimbCreated }: {onClimbCreated?: (newClimb: Climb) => void }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="cursor-pointer font-light text-white bg-blue-500 hover:bg-blue-600"
                    size="sm"
                >
                    New Climb Log
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg border-none">
                <DialogHeader>
                    <DialogTitle>New climb</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-black/50">
                    Submit a new climb to your log. Click save when you're done.
                </DialogDescription>
                <ClimbForm onSuccess={() => setOpen(false)} onClimbCreated={onClimbCreated} />
            </DialogContent>
        </Dialog>
    )
}
