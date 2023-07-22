/** @format */

import { pool } from "../db.js";

export class TaskSchema {
  create = async (title, description) => {
    const sql =
      "INSERT INTO task (title, description,created_at,updated_at) VALUES($1, $2, $3, $4) RETURNING *";

    try {
      const res = await pool.query(sql, [
        title,
        description,
        new Date(),
        new Date(),
      ]);
      return res.rows[0];
    } catch (error) {
      return error;
    }
  };

  findByTitle = async (title) => {
    const sql = "SELECT * FROM task WHERE title  = $1";
    try {
      const res = await pool.query(sql, [title]);
      return res.rows[0];
    } catch (error) {
      return error;
    }
  };

  findById = async (id) => {
    const sql = "SELECT * FROM task WHERE id  = $1";
    try {
      const res = await pool.query(sql, [id]);
      return res.rows[0];
    } catch (error) {
      return error;
    }
  };

  findAll = async () => {
    const sql = "SELECT * FROM task";
    try {
      const res = await pool.query(sql);
      return res.rows;
    } catch (error) {
      return error;
    }
  };

  update = async (title, description, id) => {
    const sql =
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *";
    try {
      const res = await pool.query(sql, [title, description, id]);
      return res.rows[0];
    } catch (error) {
      return error;
    }
  };

  deteteOne = async (id) => {
    const sql = "DELETE FROM task WHERE id = $1";
    try {
      const res = await pool.query(sql, [id]);
      return res.rows[0];
    } catch (error) {
      return error;
    }
  };
}

export default TaskSchema;
