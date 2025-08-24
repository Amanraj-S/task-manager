const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(  // fixed 'mongooose' to 'mongoose' and 'Schema' capitalization
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    dueDate: { type: Date, required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // fixed 'schema' to 'Schema', 'ObjectIdd' to 'ObjectId'
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // fixed 'SchemaType' to 'Schema', and "user" to "User" (consistency)
    attachments: [{ type: String }], // fixed spelling from 'attachements' and 'string' capitalized to 'String'
    todoChecklist: [todoSchema],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
