"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = __importDefault(require("./GameManager"));
var GameProperties_1 = __importDefault(require("./GameProperties"));
exports.default = {
    GameManager: GameManager_1.default,
    GameProperties: GameProperties_1.default,
};
