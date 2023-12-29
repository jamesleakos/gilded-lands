"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryEffect = /** @class */ (function () {
    function LibraryEffect(effectType, data) {
        this.effectType = effectType;
        this.data = data;
    }
    LibraryEffect.prototype.toJSON = function () {
        return {
            effectType: this.effectType,
            data: this.data,
        };
    };
    LibraryEffect.fromJSON = function (json) {
        return new LibraryEffect(json.effectType, json.data);
    };
    return LibraryEffect;
}());
exports.default = LibraryEffect;
