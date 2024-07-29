import { Router } from "express";
import { router as projectsRouter } from "./projects.router";

export const apiRouter = Router();

const ROUTER = [{ url: "/projects", router: projectsRouter }];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});
