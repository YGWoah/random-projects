import tokenRouter from "./routes.js";
import type { Request, Response, NextFunction } from "express";

import express from "express";
import bodyParser from "body-parser"
import morgan from 'morgan';


const app = express();



app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));



app.use("/api", tokenRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
