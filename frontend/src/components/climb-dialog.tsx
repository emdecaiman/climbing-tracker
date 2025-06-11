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

export const ClimbDialog = () => {
    return (
        <Dialog>
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
                <ClimbForm/>
            </DialogContent>
        </Dialog>
    )
}
