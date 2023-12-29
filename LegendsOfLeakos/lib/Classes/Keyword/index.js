"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeKeyword_1 = __importDefault(require("./RuntimeKeyword/RuntimeKeyword"));
var LibraryKeyword_1 = __importDefault(require("./LibraryKeyword/LibraryKeyword"));
var AttributeKeyword_1 = __importDefault(require("./RuntimeKeyword/RuntimeKeywords/AttributeKeyword"));
var DamageModificationKeyword_1 = __importDefault(require("./RuntimeKeyword/RuntimeKeywords/DamageModificationKeyword"));
var WarleaderKeyword_1 = __importDefault(require("./RuntimeKeyword/RuntimeKeywords/WarleaderKeyword"));
exports.default = {
    RuntimeKeyword: RuntimeKeyword_1.default,
    LibraryKeyword: LibraryKeyword_1.default,
    AttributeKeyword: AttributeKeyword_1.default,
    DamageModificationKeyword: DamageModificationKeyword_1.default,
    WarleaderKeyword: WarleaderKeyword_1.default,
};
