import { config } from "dotenv";
import express from "express";
import cors from cors;

config({
    path: "./data/config.env"
});

export const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2]
    })
)

app.get("/", (req, res, nex)=> {
    res.send("Working")
})

import user from "./routes/user.js";

app.use("/api/v1/user", user)