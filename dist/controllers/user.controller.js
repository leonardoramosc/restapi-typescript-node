"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        const users = response.rows;
        return res.status(200).json({
            users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [userID]);
        const user = response.rows;
        return res.status(200).json({
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const response = yield database_1.pool.query('INSERT INTO users (name, email) VALUES($1, $2)', [name, email]);
        return res.status(201).json({
            message: 'User created Successfully',
            user: {
                name,
                email
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const { name, email } = req.body;
        yield database_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userID]);
        return res.status(200).json({
            msg: `User ${userID} updated successfully`,
            user: {
                name,
                email
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        yield database_1.pool.query('DELETE FROM users WHERE id = $1', [userID]);
        return res.status(204).json(`User ${userID} deleted successfully`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteUser = deleteUser;
// export const getUser = ()
