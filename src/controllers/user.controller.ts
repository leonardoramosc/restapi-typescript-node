import { Request, Response } from 'express';
import { QueryArrayConfig, QueryResult } from 'pg';

import { pool } from '../database';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {

  try {

    const response: QueryResult = await pool.query('SELECT * FROM users');
  
    const users = response.rows;
  
    return res.status(200).json({
      users
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({error: 'Internal Server Error'});
  }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {

  try {

    const userID = req.params.id;

    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [userID]);
    const user = response.rows;

    return res.status(200).json({
      user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({error: 'Internal Server Error'});
  }
} 

export const createUser = async (req: Request, res: Response): Promise<Response> => {

  try {

  const { name, email } = req.body;

  const response: QueryResult = await pool.query('INSERT INTO users (name, email) VALUES($1, $2)', [name, email]);

  return res.status(201).json({
    message: 'User created Successfully',
    user: {
      name, 
      email
    }
  })

  } catch (error) {

    console.log(error);

    return res.status(500).json({error: 'Internal Server Error'});
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {

  try {

    const userID = req.params.id;
    const { name, email } = req.body;

    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userID]);

    return res.status(200).json({
      msg: `User ${userID} updated successfully`,
      user: {
        name,
        email
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({error: 'Internal Server Error'});
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {

  try {

    const userID = req.params.id;

    await pool.query('DELETE FROM users WHERE id = $1', [userID]);

    return res.status(204).json(`User ${userID} deleted successfully`);

  } catch (error) {

    console.log(error);

    return res.status(500).json({error: 'Internal Server Error'});
  }
}

// export const getUser = ()