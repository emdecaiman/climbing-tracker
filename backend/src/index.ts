import express, { json } from "express";
import climbsRoutes from "./routes/climbs/index";

const port = 3000;
const app = express();

// when request is received, it gets processed with "middlewares"
app.use(json());

app.get("/", (req, res) => {
    res.send("Hello World 123!");
});

// climbs endpoints

app.use("/climbs", climbsRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

