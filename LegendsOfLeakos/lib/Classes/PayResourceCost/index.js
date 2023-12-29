"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PayResourceCost_1 = __importDefault(require("./PayResourceCost"));
var PayResourceCostUpgrade_1 = __importDefault(require("./PayResourceCostUpgrade"));
exports.default = {
    PayResourceCost: PayResourceCost_1.default,
    PayResourceCostUpgrade: PayResourceCostUpgrade_1.default,
};
