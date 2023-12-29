"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var PayResourceCostUpgrade = /** @class */ (function () {
    function PayResourceCostUpgrade(statId, valueChange) {
        this.statId = statId;
        this.valueChange = new ModifiableInt_1.default(valueChange.baseValue, valueChange.intModifiers);
    }
    PayResourceCostUpgrade.prototype.toJSON = function () {
        return {
            statId: this.statId,
            valueChange: this.valueChange.toJSON(),
        };
    };
    PayResourceCostUpgrade.fromJSON = function (json) {
        return new PayResourceCostUpgrade(json.statId, ModifiableInt_1.default.fromJSON(json.valueChange));
    };
    return PayResourceCostUpgrade;
}());
exports.default = PayResourceCostUpgrade;
