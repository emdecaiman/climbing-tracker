import { Request, Response } from "express";

export const listClimbs = (req: Request, res: Response) => {
    res.send("listClimbs");
}

export const getClimbById = (req: Request, res: Response) => {
    res.send("getClimbById");
}

export const createClimb = (req: Request, res: Response) => {
    res.send("createClimb");
}

export const updateClimb = (req: Request, res: Response) => {
    res.send("updateClimb");
}

export const deleteClimb = (req: Request, res: Response) => {
    res.send("deleteClimb");
}
