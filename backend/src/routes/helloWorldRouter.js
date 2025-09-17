import { Router } from "express";
import { doNothingController } from "../controllers/helloWorldController.js";
import { printHelloWorld } from "../controllers/helloWorldController.js";
import { getDataFromFrontend } from "../controllers/helloWorldController.js";

const helloWorldRouter = Router();

helloWorldRouter.get('/print', printHelloWorld);
helloWorldRouter.get('/', doNothingController);
helloWorldRouter.post('/getData', getDataFromFrontend);
helloWorldRouter.get('/:productId/:userId/:courseId', getDataFromFrontend);


export default helloWorldRouter;