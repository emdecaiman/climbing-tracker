import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("The List of Climbs");
});

router.get("/:id", (req, res) => {
    console.log(req.params);
    res.send("A climb");
});

router.post("/", (req, res) => {
    res.send("New climb created");
});

export default router;