/**
 * Task Controller
 *
 * This module exports functions to manage tasks in the application.
 * It provides CRUD (Create, Read, Update, Delete) operations
 * for task management.
 */

const Task = require("../models/Task");

/**
 * Retrieve all tasks.
 *
 * @async
 * @function getAllTasks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object containing status, message, and list of tasks
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Tasks retrieved successfully!",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/**
 * Create a new task.
 *
 * @async
 * @function createTask
 * @param {Object} req - Express request object, containing title and description in body
 * @param {Object} res - Express response object
 * @returns {Object} - Response object containing status, message, and created task data
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });

    await task.save();

    res.status(201).json({
      status: true,
      message: "Task created successfully!",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/**
 * Update a task by ID.
 *
 * @async
 * @function updateTask
 * @param {Object} req - Express request object, containing task ID in params and updated fields in body
 * @param {Object} res - Express response object
 * @returns {Object} - Response object containing status, message, and updated task data
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found!" });
    }

    res.status(200).json({
      status: true,
      message: "Task updated successfully!",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/**
 * Delete a task by ID.
 *
 * @async
 * @function deleteTask
 * @param {Object} req - Express request object, containing task ID in params
 * @param {Object} res - Express response object
 * @returns {Object} - Response object containing status, message
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found!" });
    }

    res.status(200).json({
      status: true,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
