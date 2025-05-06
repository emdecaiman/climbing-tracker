import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export const Profile = () => {
    return (
        <div className="flex items-center justify-center gap-10">
            <Avatar className="size-40">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>Welcome Back User!</h1>

        </div>
    );
}