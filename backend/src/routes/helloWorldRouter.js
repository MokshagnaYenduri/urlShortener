import { Router } from "express";
import { doNothingController } from "../controllers/helloWorldController.js";
import { printHelloWorld } from "../controllers/helloWorldController.js";
import { getDataFromFrontend } from "../controllers/helloWorldController.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const helloWorldRouter = Router();

helloWorldRouter.get('/print', authMiddleWare, printHelloWorld);
helloWorldRouter.get('/', doNothingController);
helloWorldRouter.post('/getData', getDataFromFrontend);
helloWorldRouter.get('/:productId/:userId/:courseId', getDataFromFrontend);

helloWorldRouter.post('/print', printHelloWorld);

export default helloWorldRouter;