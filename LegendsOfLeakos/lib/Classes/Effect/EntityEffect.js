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
var RuntimeEffect_1 = __importDefault(require("./RuntimeEffect"));
var Target_1 = require("../../Enums/Target");
var Zone_1 = require("../../Enums/Zone");
var EntityEffect = /** @class */ (function (_super) {
    __extends(EntityEffect, _super);
    function EntityEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityEffect.prototype.myRequiredEffectValues = function () {
        return _super.prototype.myRequiredEffectValues.call(this);
    };
    EntityEffect.prototype.isTargetInfoValid = function (sourceEntity, state, targetInfo, targetCriteria) {
        var validCount = 0;
        if (Target_1.TargetMethods.broadTargetType(targetCriteria.targetTypeEnum) ===
            Target_1.BroadTargetTypeEnum.card) {
            // check if there are too many targets
            if (targetInfo.targetEntityInstanceIds.length >
                targetCriteria.maxSelectionsAllowed)
                return false;
            for (var _i = 0, _a = targetInfo.targetEntityInstanceIds; _i < _a.length; _i++) {
                var j = _a[_i];
                var card = state.getCardFromAnywhere(j);
                if (card === null)
                    continue;
                var ownerPlayer = state.getPlayerInfoByUserId(card.ownerPlayerUserId);
                if (!ownerPlayer) {
                    throw new Error('Owner player not found');
                }
                // checking if the targetTypeEnum is correct
                switch (targetCriteria.targetTypeEnum) {
                    case Target_1.TargetTypeEnum.TargetCreature:
                        break;
                    case Target_1.TargetTypeEnum.TargetOpponentCreature:
                        if (ownerPlayer.userId === sourceEntity.ownerPlayerUserId)
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.TargetFriendlyCreature:
                        if (ownerPlayer.userId !== sourceEntity.ownerPlayerUserId)
                            continue;
                        break;
                    default:
                        console.log('ERROR: missing conversion');
                        continue;
                }
                // checking if the target satisfies the conditions
                for (var _b = 0, _c = targetCriteria.conditions; _b < _c.length; _b++) {
                    var c = _c[_b];
                    c.isTrue(j, sourceEntity.instanceId, state);
                }
                // count to satisfy min and max
                validCount += 1;
            }
        }
        else if (Target_1.TargetMethods.broadTargetType(targetCriteria.targetTypeEnum) ===
            Target_1.BroadTargetTypeEnum.zone) {
            // check if there are too many targets
            if (targetInfo.targetEntityInstanceIds.length >
                targetCriteria.maxSelectionsAllowed)
                return false;
            for (var _d = 0, _e = targetInfo.targetEntityInstanceIds; _d < _e.length; _d++) {
                var zoneInstanceId = _e[_d];
                var zone = state.getZoneByInstanceId(zoneInstanceId);
                if (zone === null)
                    continue;
                var ownerPlayer = state.getPlayerInfoByUserId(zone.ownerPlayerUserId);
                if (!ownerPlayer) {
                    throw new Error('Owner player not found');
                }
                // checking if the targetTypeEnum is correct
                switch (targetCriteria.targetTypeEnum) {
                    case Target_1.TargetTypeEnum.TargetRow:
                        // I think this is always fine?
                        break;
                    case Target_1.TargetTypeEnum.TargetOpponentRow:
                        if (ownerPlayer.userId === sourceEntity.ownerPlayerUserId)
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.TargetFriendlyRow:
                        if (ownerPlayer.userId !== sourceEntity.ownerPlayerUserId)
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.OpponentFrontRow:
                        if (ownerPlayer.userId === sourceEntity.ownerPlayerUserId ||
                            zone.name !== 'FrontRow')
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.OpponentBackRow:
                        if (ownerPlayer.userId === sourceEntity.ownerPlayerUserId ||
                            zone.name !== 'BackRow')
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.FriendlyFrontRow:
                        if (ownerPlayer.userId !== sourceEntity.ownerPlayerUserId ||
                            zone.name !== 'FrontRow')
                            continue;
                        break;
                    case Target_1.TargetTypeEnum.FriendlyBackRow:
                        if (ownerPlayer.userId !== sourceEntity.ownerPlayerUserId ||
                            zone.name !== 'BackRow')
                            continue;
                        break;
                    default:
                        throw new Error('missing conversion');
                }
                // checking if the target satisfies the conditions
                for (var _f = 0, _g = targetCriteria.conditions; _f < _g.length; _f++) {
                    var c = _g[_f];
                    if (!c.isTrue(zoneInstanceId, sourceEntity.instanceId, state))
                        continue;
                }
                // count to satisfy min and max
                validCount += 1;
            }
        }
        // check min conditions
        return validCount >= targetCriteria.minSelectionsThatMustRemain;
    };
    EntityEffect.prototype.isAllTargetInfoValid = function (sourceEntity, state, targetInfo) {
        if (this.targetCriterias.length !== targetInfo.length)
            return false;
        for (var i = 0; i < targetInfo.length; i++) {
            if (targetInfo[i].noTargetWasSelected)
                continue;
            if (!this.isTargetInfoValid(sourceEntity, state, targetInfo[i], this.targetCriterias[i]))
                return false;
        }
        return true;
    };
    EntityEffect.prototype.isCardStillInPlay = function (entity, state) {
        var residingZone = state.getZoneByInstanceId(entity.residingZoneInstanceId);
        if (!residingZone)
            throw new Error('Zone not found');
        if (Zone_1.ZoneEnumMethods.isBoard(residingZone.zoneEnum))
            return true;
        return false;
    };
    EntityEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        // override this
    };
    EntityEffect.prototype.areTargetsAvailable = function (state, sourceEntity, targetCriterias) {
        var sourcePlayer = state.getPlayerInfoByUserId(sourceEntity.ownerPlayerUserId);
        var targetEntities = [];
        var _loop_1 = function (targetCriteria) {
            if (targetCriteria.minSelectionsRequired <= 0)
                return "continue";
            switch (targetCriteria.targetTypeEnum) {
                case Target_1.TargetTypeEnum.TargetCreature:
                    for (var _a = 0, _b = state.players; _a < _b.length; _a++) {
                        var player = _b[_a];
                        for (var _c = 0, _d = player.zones; _c < _d.length; _c++) {
                            var zone = _d[_c];
                            for (var _e = 0, _f = zone.cards; _e < _f.length; _e++) {
                                var card = _f[_e];
                                targetEntities.push(card);
                            }
                        }
                    }
                    break;
                case Target_1.TargetTypeEnum.TargetFriendlyCreature:
                    for (var _g = 0, _h = state.players.find(function (c) { return c.userId === sourcePlayer.userId; }).zones; _g < _h.length; _g++) {
                        var zone = _h[_g];
                        for (var _j = 0, _k = zone.cards; _j < _k.length; _j++) {
                            var card = _k[_j];
                            targetEntities.push(card);
                        }
                    }
                    break;
                case Target_1.TargetTypeEnum.TargetOpponentCreature:
                    for (var _l = 0, _m = state.players.find(function (c) { return c.userId !== sourcePlayer.userId; }).zones; _l < _m.length; _l++) {
                        var zone = _m[_l];
                        for (var _o = 0, _p = zone.cards; _o < _p.length; _o++) {
                            var card = _p[_o];
                            targetEntities.push(card);
                        }
                    }
                    break;
                case Target_1.TargetTypeEnum.TargetRow:
                    for (var _q = 0, _r = state.players; _q < _r.length; _q++) {
                        var player = _r[_q];
                        for (var _s = 0, _t = player.zones; _s < _t.length; _s++) {
                            var zone = _t[_s];
                            targetEntities.push(zone);
                        }
                    }
                    break;
                case Target_1.TargetTypeEnum.TargetFriendlyRow:
                    for (var _u = 0, _v = state.players.find(function (c) { return c.userId === sourcePlayer.userId; }).zones; _u < _v.length; _u++) {
                        var zone = _v[_u];
                        targetEntities.push(zone);
                    }
                    break;
                case Target_1.TargetTypeEnum.TargetOpponentRow:
                    for (var _w = 0, _x = state.players.find(function (c) { return c.userId !== sourcePlayer.userId; }).zones; _w < _x.length; _w++) {
                        var zone = _x[_w];
                        targetEntities.push(zone);
                    }
                    break;
                default:
                    throw new Error('Case Not Implemented');
            }
            var goodEntities = targetEntities.filter(function (entity) {
                for (var _i = 0, _a = targetCriteria.conditions; _i < _a.length; _i++) {
                    var condition = _a[_i];
                    if (!condition.isTrue(entity.instanceId, sourceEntity.instanceId, state))
                        return false;
                }
                return true;
            });
            if (goodEntities.length === 0)
                return { value: false };
        };
        for (var _i = 0, targetCriterias_1 = targetCriterias; _i < targetCriterias_1.length; _i++) {
            var targetCriteria = targetCriterias_1[_i];
            var state_1 = _loop_1(targetCriteria);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return true;
    };
    return EntityEffect;
}(RuntimeEffect_1.default));
exports.default = EntityEffect;
