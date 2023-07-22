/** @format */

import { pool } from "../db.js";
import TaskSchema from "../models/Tasks.js";

const Task = new TaskSchema();

export const createTask = async (req, res, next) => {
  const { title = "", description = "" } = req.body;

  if ([title, description].includes("")) {
    return res.status(400).json({ msg: "Hay Campo vacio" });
  }

  const taskExist = await Task.findByTitle(title);
  if (taskExist) {
    return res.status(400).json({ msg: "Tarea ya existe" });
  }

  try {
    const newTask = await Task.create(title, description);
    res.status(201).json({
      msg: "Tarea creado con exito",
      newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await Task.findAll();
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(400).json({ msg: "Tarea no existe" });
  }
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = await Task.findById(id);
  if (!task) {
    return res.status(400).json({ msg: "Tarea no existe" });
  }

  try {
    const taskUpdate = await Task.update(title, description, id);
    return res.json({ taskUpdate, msg: "Editado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    return res.status(400).json({ msg: "Tarea no existe" });
  }

  try {
    await Task.deteteOne(id);
    return res.json({ msg: "Eliminado con Exito" });
    // const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

    // if (result.rowCount === 0)
    //   return res.status(404).json({ message: "Task not found" });
    // return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
