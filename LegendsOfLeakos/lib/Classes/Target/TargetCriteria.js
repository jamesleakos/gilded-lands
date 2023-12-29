"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Target_1 = require("../../Enums/Target");
var RuntimeCondition_1 = __importDefault(require("../Condition/RuntimeCondition"));
var TargetInfo_1 = __importDefault(require("./TargetInfo"));
var Zone_1 = require("../../Enums/Zone");
var RuntimeCard_1 = __importDefault(require("../Card/RuntimeCard"));
var RuntimeZone_1 = __importDefault(require("../Zone/RuntimeZone"));
var TargetCriteria = /** @class */ (function () {
    function TargetCriteria(name, targetTypeEnum, minSelectionsRequired, maxSelectionsAllowed, minSelectionsThatMustRemain, targetableTypeSelectionEnum, conditions) {
        this.conditions = [];
        this.name = name;
        this.targetTypeEnum = targetTypeEnum;
        this.minSelectionsRequired = minSelectionsRequired;
        this.maxSelectionsAllowed = maxSelectionsAllowed;
        this.minSelectionsThatMustRemain = minSelectionsThatMustRemain;
        this.targetableTypeSelectionEnum = targetableTypeSelectionEnum;
        this.playerSelectsTarget = Target_1.TargetMethods.playerSelectsTargets(this.targetableTypeSelectionEnum);
        if (!Target_1.TargetMethods.canBeTargetable(this.targetTypeEnum)) {
            if (this.playerSelectsTarget) {
                console.log('Player can never select that target');
            }
            this.conditions = conditions;
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
                if (this.isEntityAValidTarget(sourceEntityInstanceId, zone.instanceId, gameState)) {
                    targetEntityInstanceIds.push(zone.instanceId);
                }
                for (var _d = 0, _e = zone.cards; _d < _e.length; _d++) {
                    var card = _e[_d];
                    if (this.isEntityAValidTarget(sourceEntityInstanceId, card.instanceId, gameState)) {
                        targetEntityInstanceIds.push(card.instanceId);
                    }
                }
            }
        }
        var outInstanceIds = targetEntityInstanceIds.slice(0, this.maxSelectionsAllowed);
        return new TargetInfo_1.default(outInstanceIds, outInstanceIds.length === 0, false);
    };
    TargetCriteria.prototype.areTargetsAvailable = function (sourceEntityInstanceId, gameState) {
        var targetEntityInstanceIds = [];
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var _b = 0, _c = player.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                if (!Zone_1.ZoneEnumMethods.isBoard(zone.zoneEnum))
                    continue;
                if (this.isEntityAValidTarget(sourceEntityInstanceId, zone.instanceId, gameState)) {
                    targetEntityInstanceIds.push(zone.instanceId);
                }
                for (var _d = 0, _e = zone.cards; _d < _e.length; _d++) {
                    var card = _e[_d];
                    if (this.isEntityAValidTarget(sourceEntityInstanceId, card.instanceId, gameState)) {
                        targetEntityInstanceIds.push(card.instanceId);
                    }
                }
            }
        }
        return targetEntityInstanceIds.length >= this.minSelectionsRequired;
    };
    TargetCriteria.prototype.isTargetInfoValid = function (sourceEntityInstanceId, targetInfo, gameState) {
        if (targetInfo.targetEntityInstanceIds.length < this.minSelectionsRequired)
            return false;
        if (targetInfo.targetEntityInstanceIds.length > this.maxSelectionsAllowed)
            return false;
        for (var _i = 0, _a = targetInfo.targetEntityInstanceIds; _i < _a.length; _i++) {
            var targetInstanceId = _a[_i];
            if (!this.isEntityAValidTarget(sourceEntityInstanceId, targetInstanceId, gameState)) {
                return false;
            }
        }
        return true;
    };
    TargetCriteria.prototype.isEntityAValidTarget = function (sourceEntityInstanceId, targetEntityInstanceId, gameState) {
        var targetEntity = gameState.getEntityFromAnywhere(targetEntityInstanceId);
        if (!targetEntity)
            throw new Error('targetEntity is null');
        var sourceEntity = gameState.getEntityFromAnywhere(sourceEntityInstanceId);
        if (!sourceEntity)
            throw new Error('sourceEntity is null');
        switch (this.targetTypeEnum) {
            case Target_1.TargetTypeEnum.TargetCreature:
                if (!(targetEntity instanceof RuntimeCard_1.default))
                    return false;
                break;
            case Target_1.TargetTypeEnum.TargetOpponentCreature:
                if (!(targetEntity instanceof RuntimeCard_1.default))
                    return false;
                if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                break;
            case Target_1.TargetTypeEnum.TargetFriendlyCreature:
                if (!(targetEntity instanceof RuntimeCard_1.default))
                    return false;
                if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                break;
            case Target_1.TargetTypeEnum.TargetRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                break;
            case Target_1.TargetTypeEnum.TargetOpponentRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                break;
            case Target_1.TargetTypeEnum.TargetFriendlyRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                break;
            case Target_1.TargetTypeEnum.OpponentFrontRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.FrontBoard)
                    return false;
                break;
            case Target_1.TargetTypeEnum.OpponentBackRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.BackBoard)
                    return false;
                break;
            case Target_1.TargetTypeEnum.FriendlyFrontRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.FrontBoard)
                    return false;
                break;
            case Target_1.TargetTypeEnum.FriendlyBackRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.BackBoard)
                    return false;
                break;
            case Target_1.TargetTypeEnum.FriendlyBattleRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.BattleBoard)
                    return false;
                break;
            case Target_1.TargetTypeEnum.OpponentBattleRow:
                if (!(targetEntity instanceof RuntimeZone_1.default))
                    return false;
                if (!Zone_1.ZoneEnumMethods.isBoard(targetEntity.zoneEnum))
                    return false;
                if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
                    return false;
                }
                if (targetEntity.zoneEnum !== Zone_1.ZoneEnum.BattleBoard)
                    return false;
                break;
            default:
                throw new Error('Case Not Implemented for isTargetInfoValid: ' + this.targetTypeEnum);
        }
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            if (!condition.isTrue(targetEntity.instanceId, sourceEntity.instanceId, gameState))
                return false;
        }
        return true;
    };
    // #region JSON
    TargetCriteria.prototype.clone = function () {
        return TargetCriteria.fromRuntimeJSON(this.toJSON());
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
    TargetCriteria.fromRuntimeJSON = function (targetTypeJSON) {
        return new TargetCriteria(targetTypeJSON.name, Target_1.TargetTypeEnum[targetTypeJSON.targetTypeEnum], targetTypeJSON.minSelectionsRequired, targetTypeJSON.maxSelectionsAllowed, targetTypeJSON.minSelectionsThatMustRemain, Target_1.TargetableTypeSelectionEnum[targetTypeJSON.targetableTypeSelectionEnum], targetTypeJSON.conditions.map(function (c) {
            return RuntimeCondition_1.default.fromRuntimeJSON(c);
        }));
    };
    TargetCriteria.fromLibraryJSON = function (targetTypeJSON) {
        return new TargetCriteria(targetTypeJSON.name, Target_1.TargetTypeEnum[targetTypeJSON.targetTypeEnum], targetTypeJSON.minSelectionsRequired, targetTypeJSON.maxSelectionsAllowed, targetTypeJSON.minSelectionsThatMustRemain, Target_1.TargetableTypeSelectionEnum[targetTypeJSON.targetableTypeSelectionEnum], targetTypeJSON.conditions.map(function (c) {
            return RuntimeCondition_1.default.fromLibraryJSON(c);
        }));
    };
    TargetCriteria.isLibraryJSONValid = function (json) {
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
            !json.conditions.every(function (c) { return RuntimeCondition_1.default.isLibraryJSONValid(c); })) {
            console.log('Invalid JSON: conditions is not an array');
            return false;
        }
        return true;
    };
    return TargetCriteria;
}());
exports.default = TargetCriteria;
