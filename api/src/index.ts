import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors({ origin: [] }));

app.get("/", (req: Request, res: Response) => {
  res.send("API Service working!");
});

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
