# Project Management App

## Entities

### Projects

id PK
title
description
created_at

### Tasks

id PK
project_id FK
title
description
start_time
end_time
created_at

## endpoints

### projects

GET /projects
GET /projects/:id
POST /projects
PUT or PATCH /projects/:id
DELETE /projects/:id

### tasks

GET /projects/:projectId/tasks
GET /projects/:projectId/tasks/:id
POST /projects/:projectId/tasks
PUT or PATCH /projects/:projectId/tasks/:id
DELETE /projects/:projectId/tasks/:id
