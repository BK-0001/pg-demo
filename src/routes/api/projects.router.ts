import { Request, Response, Router } from "express";
import { pool } from "../../db";
import { router as tasksRouter } from "./tasks.router";

type Project = {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
};

export const router = Router();

router.use("/:projectId/tasks", tasksRouter);

// /api/v1/projects
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query<Project>(
    `SELECT title, description FROM projects;`
  );

  res.send(data.rows);
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
