"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameServer_1 = __importDefault(require("./GameServer"));
var ServerHandler_1 = __importDefault(require("./ServerHandler"));
exports.default = {
    GameServer: GameServer_1.default,
    ServerHandler: ServerHandler_1.default,
};
