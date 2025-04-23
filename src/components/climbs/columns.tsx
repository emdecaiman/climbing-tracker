import { ColumnDef } from "@tanstack/react-table";

export type Climb = {
    climb_id: number
    name: string
    date: Date
    location: string
    grade: string
    type: "boulder" | "top-rope" | "lead"
    environment: "outdoor" | "indoor"
    attempts: number
    note: string
    attachment: string
};

export const columns: ColumnDef<Climb>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "grade",
        header: "Grade",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "environment",
        header: "Environment",
    },
    {
        accessorKey: "attempts",
        header: "Attempts",
    },
    {
        accessorKey: "note",
        header: "Note",
    },
    {
        accessorKey: "attachment",
        header: "Attachment",
    },

,




]


