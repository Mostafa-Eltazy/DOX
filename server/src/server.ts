import express from "express";

import cors from "cors";
import fileRouter from "./routes/file.routes";
import errorHandlerMiddleware from "./middleware/error.handler";

const server = express();

server.use(cors());
server.use("/", fileRouter);
server.use(errorHandlerMiddleware);

export default server;
