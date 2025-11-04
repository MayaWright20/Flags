import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";

config({
    path: "./data/config.env"
});

export const app = express();

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res, nex)=> {
    res.send("Working")
})

import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/user.js";

app.use("/api/v1/user", user);

app.use(errorMiddleware)