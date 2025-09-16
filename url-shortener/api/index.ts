import tokenRouter from "./routes";
import type { Request, Response, NextFunction } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
// const expressip = require('express-ip');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// Middleware to log all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// i want to log any reuquest

app.use('/api', tokenRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
