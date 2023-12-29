"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TargetTypeInfo = /** @class */ (function () {
    function TargetTypeInfo(name, description, targetTypeDescription, minMinSelectionsRequired, maxMaxSelectionsAllowed) {
        this.name = name;
        this.description = description;
        this.targetTypeDescription = targetTypeDescription;
        this.minMinSelectionsRequired = minMinSelectionsRequired;
        this.maxMaxSelectionsAllowed = maxMaxSelectionsAllowed;
    }
    return TargetTypeInfo;
}());
exports.default = TargetTypeInfo;
