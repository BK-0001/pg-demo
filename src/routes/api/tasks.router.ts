import { Request, Response, Router } from "express";

export const router = Router();

// /api/v1/projects/:projectId/tasks
router.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

// /api/v1/projects/:projectId/tasks/:id
router.get("/:id", (req: Request, res: Response) => {
  res.send("");
});

// /api/v1/projects/:projectId/tasks
router.post("/", (req: Request, res: Response) => {
  res.send("");
});

// /api/v1/projects/:projectId/tasks/:id
router.put("/:id", (req: Request, res: Response) => {
  res.send("");
});

// /api/v1/projects/:projectId/tasks/:id
router.delete("/:id", (req: Request, res: Response) => {
  res.send("");
});
