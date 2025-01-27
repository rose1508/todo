const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET /api/tasks - Retrieve all tasks
router.get("/tasks", taskController.getAllTasks);

// POST /api/task - Create a new task
router.post("/task", taskController.createTask);

// PUT /api/task/:id - Update a task by ID
router.put("/task/:id", taskController.updateTask);

// DELETE /api/task/:id - Delete a task by ID
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
