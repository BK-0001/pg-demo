import { Request, Response, Router } from "express";
import { router as tasksRouter } from "./tasks.router";

export const router = Router();

router.use("/:projectId/tasks", tasksRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("");
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("");
});

router.post("/", (req: Request, res: Response) => {
  res.send("");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("");
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("");
});
