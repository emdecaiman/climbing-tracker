import { Request, Response } from "express";
import { db } from "../../db/index";
import { climbsTable } from "../../db/climbsSchema";
import { eq } from "drizzle-orm";

export const listClimbs = async (req: Request, res: Response) => {
    try {
        const climbs = await db
            .select()
            .from(climbsTable);
        res.json(climbs);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getClimbById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [climb] = await db
            .select()
            .from(climbsTable)
            .where(eq(climbsTable.climb_id, Number(id)));

        if (!climb) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.json(climb);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createClimb = async (req: Request, res: Response) => {
    try {
        const [climb] = await db
            .insert(climbsTable)
            .values(req.body)
            .returning();
        res.status(201).json(climb);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateClimb = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const [climb] = await db
            .update(climbsTable)
            .set(updatedFields)
            .where(eq(climbsTable.climb_id, Number(id)))
            .returning();
        if (climb) {
            res.json(climb);
        } else {
            res.status(404).send({ message: "Product was not found" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteClimb = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [deletedClimb] = await db
            .delete(climbsTable)
            .where(eq(climbsTable.climb_id, Number(id)))
            .returning();

        if (deletedClimb) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Product not found" });
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
