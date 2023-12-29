"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../../../Enums/Effect");
var EffectValueCreatorInfo_1 = __importDefault(require("../../EffectValueCreatorInfo"));
var EntityEffect_1 = __importDefault(require("../../EntityEffect"));
var GiveEnchantmentBaseEffect = /** @class */ (function (_super) {
    __extends(GiveEnchantmentBaseEffect, _super);
    function GiveEnchantmentBaseEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GiveEnchantmentBaseEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_1.EffectValueType.CreateEnchantmentEnchantmentLibraryID, true),
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    return GiveEnchantmentBaseEffect;
}(EntityEffect_1.default));
exports.default = GiveEnchantmentBaseEffect;
