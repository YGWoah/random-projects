import tokenRouter from "./routes";
import type { Request, Response, NextFunction } from "express";

const express = require("express");
const bodyParser = require("body-parser");


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/', express.static('public'))
app.use("/api", tokenRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
