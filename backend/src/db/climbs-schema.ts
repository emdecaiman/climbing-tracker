import {
    boolean,
    date,
    integer,
    pgTable,
    varchar
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const climbsTable = pgTable("climbs", {
    climb_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }),
    date: date().default(sql`now()`),
    location: varchar({ length: 255 }),
    grade: varchar({ length: 10 }),
    type: varchar({ length: 30 }),
    environment: varchar({ length: 30 }),
    flash: boolean(),
    note: varchar({ length: 255 }),
    attachment: varchar({ length: 255 })
});