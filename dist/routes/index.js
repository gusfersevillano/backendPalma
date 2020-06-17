"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const index_controller_1 = require("../controllers/index.controller");
router.get('/users', index_controller_1.getUsers);
router.get('/users:id', index_controller_1.getUserbyId);
//router.post('/users:id', getUsers);
//router.put('/users:id', getUsers);
//router.delete('users:id', getUsers);
//router.get('/test', (req, res) => res.send('Prueba Postgres'))
exports.default = router;
