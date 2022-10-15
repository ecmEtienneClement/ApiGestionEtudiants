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
        const _idParam = req.params._id;
        if (tokenUserId !== _idParam) {
            throw new Error();
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(403).json({
            error,
            message: "Vous n'avez pas le droit de consulter les informations d'un étudiant",
        });
    }
};
