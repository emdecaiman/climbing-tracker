import express, { json } from "express";
import climbsRoutes from "./routes/climbs/index";
import cors from "cors";

const port = 3000;
const app = express();
const corsOption = {
    origin: ["http://localhost:5173"],
}

// when request is received, it gets processed with "middlewares"
app.use(json());
app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.send("Hello World 123!");
});

// climbs endpoints

app.use("/climbs", climbsRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

