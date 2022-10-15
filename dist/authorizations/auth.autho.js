"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const tokenVerify = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_TOKEN);
        const tokenUserId = tokenVerify.user._id;
        const tokenUserRole = tokenVerify.user._role;
        if (req.query._id && req.query._id !== tokenUserId) {
            throw new Error();
        }
        else if (req.query.role && req.query.role !== tokenUserRole) {
            throw new Error();
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error,
            message: "Requête non autorisée ! Veillez générer un nouveau token",
        });
    }
};
