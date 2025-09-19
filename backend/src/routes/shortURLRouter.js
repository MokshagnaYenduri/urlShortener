import { Router } from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import { createShortURL, redirectToOriginalURL } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post("/", authMiddleWare, createShortURL);
shortURLRouter.get("/:shortCode", redirectToOriginalURL);
export default shortURLRouter;