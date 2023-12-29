"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = exports.KeywordType = void 0;
var KeywordType;
(function (KeywordType) {
    KeywordType[KeywordType["Attribute"] = 0] = "Attribute";
    KeywordType[KeywordType["Shielded"] = 1] = "Shielded";
    KeywordType[KeywordType["Warleader"] = 2] = "Warleader";
    KeywordType[KeywordType["DamageModification"] = 3] = "DamageModification";
})(KeywordType || (KeywordType = {}));
exports.KeywordType = KeywordType;
var Attribute;
(function (Attribute) {
    Attribute[Attribute["Impetus"] = 0] = "Impetus";
    Attribute[Attribute["Skirmisher"] = 1] = "Skirmisher";
})(Attribute || (Attribute = {}));
exports.Attribute = Attribute;
