"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryEnchantment_1 = __importDefault(require("./LibraryEnchantment"));
var RuntimeEnchantment_1 = __importDefault(require("./RuntimeEnchantment"));
exports.default = {
    LibraryEnchantment: LibraryEnchantment_1.default,
    RuntimeEnchantment: RuntimeEnchantment_1.default,
};
