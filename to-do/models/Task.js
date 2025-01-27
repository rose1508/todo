/**
 * Defines the schema for a Task and creates a Mongoose model.
 *
 * @typedef {Object} TaskSchema
 * @property {string} title - The title of the task (required, trimmed).
 * @property {string} [description] - The description of the task (optional, trimmed).
 * @property {boolean} [isCompleted=false] - Indicates if the task is completed (default: false).
 *
 * @typedef {Object} SchemaOptions
 * @property {boolean} timestamps - Automatically adds createdAt and updatedAt fields.
 *
 * @type {import('mongoose').Model<TaskSchema>}
 */
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
