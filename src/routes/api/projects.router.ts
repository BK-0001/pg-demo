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
  const data = await pool.query<Project>(`SELECT * FROM projects;`);

  res.send(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Project>(
    `SELECT * FROM projects WHERE id = $1;`,
    [id]
  );

  const project = data.rows[0];

  if (!project) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  res.send(project);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const data = await pool.query(
    `
    INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *;  
  `,
    [title, description]
  );

  res.send(data.rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Project>(
    `SELECT * FROM projects WHERE id = $1;`,
    [id]
  );

  const project = data.rows[0];

  if (!project) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const { title, description } = req.body;

  const updated = await pool.query<Project>(
    `
      UPDATE projects 
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    [title, description, id]
  );

  res.send(updated.rows[0]);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Project>(
    `SELECT * FROM projects WHERE id = $1;`,
    [id]
  );

  const project = data.rows[0];

  if (!project) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const deleted = await pool.query(
    "DELETE FROM projects WHERE id = $1 RETURNING *",
    [id]
  );

  res.json(deleted.rows[0]);
});
