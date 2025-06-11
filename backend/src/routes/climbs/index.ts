import { Router } from "express";
import { 
    listClimbs, 
    getClimbById, 
    createClimb, 
    updateClimb, 
    deleteClimb  
} from "./climbsController";

const router = Router();

router.get("/", listClimbs);
router.get("/:id", getClimbById);
router.post("/", createClimb);
router.put("/:id", updateClimb);
router.delete("/:id", deleteClimb);

export default router;