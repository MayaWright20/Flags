import { config } from "dotenv";
import express from "express";

config({
    path: "./data/config.env"
});

export const app = express();

app.use(express.json());


app.get("/", (req, res, nex)=> {
    res.send("Working")
})

import user from "./routes/user.js";

app.use("/api/v1/user", user);