"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Target_1 = require("../../Enums/Target");
var Condition_1 = __importDefault(require("../Condition/Condition"));
var TargetInfo_1 = __importDefault(require("./TargetInfo"));
var Zone_1 = require("../../Enums/Zone");
var TargetCriteria = /** @class */ (function () {
    function TargetCriteria(name, targetTypeEnum, minSelectionsRequired, maxSelectionsAllowed, minSelectionsThatMustRemain, targetableTypeSelectionEnum, conditions) {
        this.conditions = [];
        this.name = name;
        this.targetTypeEnum = targetTypeEnum;
        this.minSelectionsRequired = minSelectionsRequired;
        this.maxSelectionsAllowed = maxSelectionsAllowed;
        this.minSelectionsThatMustRemain = minSelectionsThatMustRemain;
        this.targetableTypeSelectionEnum = targetableTypeSelectionEnum;
        this.playerSelectsTarget =
            Target_1.TargetableTypeSelectionEnumMethods.playerSelectsTargets(this.targetableTypeSelectionEnum);
        if (!Target_1.TargetTypeEnumMethods.canBeTargetable(this.targetTypeEnum)) {
            if (this.playerSelectsTarget) {
                console.log('Player can never select that target');
            }
            for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
                var c = conditions_1[_i];
                this.conditions.push(Condition_1.default.createCondition(c.conditionType, c.conditionValues));
            }
        }
    }
    TargetCriteria.prototype.autoSelectTargetInfo = function (sourceEntityInstanceId, gameState) {
        var targetEntityInstanceIds = [];
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var _b = 0, _c = player.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                if (!Zone_1.ZoneEnumMethods.isBoard(zone.zoneEnum))
                    continue;
                if (this.entitySatisfiesConditions(zone.instanceId, sourceEntityInstanceId, gameState)) {
                    targetEntityInstanceIds.push(zone.instanceId);
                }
                for (var _d = 0, _e = zone.cards; _d < _e.length; _d++) {
                    var card = _e[_d];
                    if (this.entitySatisfiesConditions(card.instanceId, sourceEntityInstanceId, gameState)) {
                        targetEntityInstanceIds.push(card.instanceId);
                    }
                }
            }
        }
        var outInstanceIds = targetEntityInstanceIds.slice(0, this.maxSelectionsAllowed);
        return new TargetInfo_1.default(outInstanceIds, outInstanceIds.length === 0, false);
    };
    TargetCriteria.prototype.entitySatisfiesConditions = function (targetEntityInstanceId, sourceEntityInstanceId, gameState) {
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            if (!condition.isTrue(targetEntityInstanceId, sourceEntityInstanceId, gameState))
                return false;
        }
        return true;
    };
    // #region JSON
    TargetCriteria.prototype.clone = function () {
        return TargetCriteria.fromJSON(this.toJSON());
    };
    TargetCriteria.prototype.toJSON = function () {
        return {
            name: this.name,
            targetTypeEnum: Target_1.TargetTypeEnum[this.targetTypeEnum],
            minSelectionsRequired: this.minSelectionsRequired,
            maxSelectionsAllowed: this.maxSelectionsAllowed,
            minSelectionsThatMustRemain: this.minSelectionsThatMustRemain,
            targetableTypeSelectionEnum: Target_1.TargetableTypeSelectionEnum[this.targetableTypeSelectionEnum],
            conditions: this.conditions.map(function (c) { return c.toJSON(); }),
        };
    };
    TargetCriteria.fromJSON = function (targetTypeJSON) {
        return new TargetCriteria(targetTypeJSON.name, Target_1.TargetTypeEnum[targetTypeJSON.targetTypeEnum], targetTypeJSON.minSelectionsRequired, targetTypeJSON.maxSelectionsAllowed, targetTypeJSON.minSelectionsThatMustRemain, Target_1.TargetableTypeSelectionEnum[targetTypeJSON.targetableTypeSelectionEnum], targetTypeJSON.conditions.map(function (c) { return Condition_1.default.fromJSON(c); }));
    };
    TargetCriteria.isJSONValid = function (json) {
        if (typeof json.name !== 'string') {
            console.log('Invalid JSON: name is not a string');
            return false;
        }
        if (typeof json.targetTypeEnum !== 'string' ||
            !Object.values(Target_1.TargetTypeEnum).includes(json.targetTypeEnum)) {
            console.log('Invalid JSON: targetTypeEnum is not a valid TargetTypeEnum');
            return false;
        }
        if (typeof json.minSelectionsRequired !== 'number') {
            console.log('Invalid JSON: minSelectionsRequired is not a number');
            return false;
        }
        if (typeof json.maxSelectionsAllowed !== 'number') {
            console.log('Invalid JSON: maxSelectionsAllowed is not a number');
            return false;
        }
        if (typeof json.minSelectionsThatMustRemain !== 'number') {
            console.log('Invalid JSON: minSelectionsThatMustRemain is not a number');
            return false;
        }
        if (typeof json.targetableTypeSelectionEnum !== 'string' ||
            !Object.values(Target_1.TargetableTypeSelectionEnum).includes(json.targetableTypeSelectionEnum)) {
            console.log('Invalid JSON: targetableTypeSelectionEnum is not a valid TargetableTypeSelectionEnum');
            return false;
        }
        if (!Array.isArray(json.conditions) ||
            !json.conditions.every(function (c) { return Condition_1.default.isJSONValid(c); })) {
            console.log('Invalid JSON: conditions is not an array');
            return false;
        }
        return true;
    };
    return TargetCriteria;
}());
exports.default = TargetCriteria;
