import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router({ mergeParams: true });

// /api/v1/projects/:projectId/tasks
router.get("/", async (req: Request, res: Response) => {
  // check if the project id is valid
  const { projectId } = req.params;

  const projectData = await pool.query("SELECT * FROM projects WHERE id = $1", [
    projectId
  ]);

  const project = projectData.rows[0];

  if (!project) {
    // if not json 404
    res.status(404).json({
      error: 404,
      message: `project with id ${projectId} does not exist`
    });
    return;
  }

  // all tasks belonged to project with projectId
  const taskData = await pool.query(
    "SELECT * FROM tasks WHERE project_id = $1",
    [projectId]
  );

  // otherwise get the tasks with project id and json back to client
  res.json(taskData.rows);
});

// /api/v1/projects/:projectId/tasks/:id
router.get("/:taskId", async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;

  const projectData = await pool.query("SELECT * FROM projects WHERE id = $1", [
    projectId
  ]);

  const project = projectData.rows[0];

  if (!project) {
    // if not send 404
    res.status(404).json({
      error: 404,
      message: `project with id ${projectId} does not exist`
    });
    return;
  }

  const taskData = await pool.query(
    "SELECT * FROM tasks WHERE id = $1 AND project_id = $2",
    [taskId, projectId]
  );

  const task = taskData.rows[0];

  if (!task) {
    res.status(404).json({
      error: 404,
      message: `task with id ${taskId} does not exist`
    });
    return;
  }

  res.json(task);
});

// /api/v1/projects/:projectId/tasks
router.post("/", (req: Request, res: Response) => {
  res.json("");
});

// /api/v1/projects/:projectId/tasks/:id
router.put("/:id", (req: Request, res: Response) => {
  res.json("");
});

// /api/v1/projects/:projectId/tasks/:id
router.delete("/:id", (req: Request, res: Response) => {
  res.json("");
});
