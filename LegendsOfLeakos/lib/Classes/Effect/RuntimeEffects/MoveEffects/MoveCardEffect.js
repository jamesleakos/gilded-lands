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
var RuntimeEffect_1 = __importDefault(require("../../RuntimeEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var Zone_1 = require("../../../../Enums/Zone");
var MoveCardEffect = /** @class */ (function (_super) {
    __extends(MoveCardEffect, _super);
    function MoveCardEffect(originZoneZoneEnum, destinationZoneZoneEnum) {
        var _this = _super.call(this) || this;
        _this.effectType = Effect_1.EffectType.MoveCardEffect;
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        return _this;
    }
    MoveCardEffect.prototype.targetCriterias = function () {
        return [];
    };
    // #endregion
    // #region Effect Runtime Execution
    MoveCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var residingZone = state.getZoneByInstanceId(sourceEntity.residingZoneInstanceId);
        if (!residingZone) {
            throw new Error('\n\nERROR: MoveCardEffect.preEffect - no residing zone. \n\n sourceEntity: ' +
                JSON.stringify(sourceEntity));
        }
        if (residingZone.zoneEnum !== this.originZoneZoneEnum)
            return false;
        return true;
    };
    MoveCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var _this = this;
        // shouldn't be trying to move a non-card
        if (!(sourceEntity instanceof RuntimeCard_1.default))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        var ownerPlayer = state.getPlayerInfoByUserId(sourceCard.ownerPlayerUserId);
        var residingZone = state.getZoneByInstanceId(sourceCard.residingZoneInstanceId);
        // make sure it's still where it thinks it is
        if (residingZone.zoneEnum !== this.originZoneZoneEnum) {
            console.log('Returning out of resolve');
            return;
        }
        var originZone = ownerPlayer.zones.find(function (c) { return c.zoneEnum === _this.originZoneZoneEnum; });
        var destinationZone = ownerPlayer.zones.find(function (c) { return c.zoneEnum === _this.destinationZoneZoneEnum; });
        originZone.removeCard(sourceCard);
        destinationZone.addCard(sourceCard);
    };
    // #endregion
    // #region Available and Valid Checks
    MoveCardEffect.prototype.areTargetsAvailable = function (state, sourceEntity) {
        return true;
    };
    MoveCardEffect.prototype.isAllTargetInfoValid = function (sourceEntity, state, targetInfoList) {
        return true;
    };
    // #endregion
    // #region Effect To Text
    MoveCardEffect.prototype.effectToString = function () {
        var outText = 'Move this card from ' +
            this.originZoneZoneEnum +
            ' to ' +
            this.destinationZoneZoneEnum +
            '. ';
        return outText;
    };
    // #endregion
    // #region Create Effect for Effect Solver
    MoveCardEffect.createMoveCardEffect = function (originZoneZoneEnum, destinationZoneZoneEnum) {
        return new MoveCardEffect(originZoneZoneEnum, destinationZoneZoneEnum);
    };
    // #endregion
    // #region JSON
    MoveCardEffect.prototype.toJSON = function () {
        return {
            effectType: Effect_1.EffectType[this.effectType],
            originZoneZoneEnum: Zone_1.ZoneEnum[this.originZoneZoneEnum],
            destinationZoneZoneEnum: Zone_1.ZoneEnum[this.destinationZoneZoneEnum],
        };
    };
    MoveCardEffect.prototype.clone = function () {
        return new MoveCardEffect(this.originZoneZoneEnum, this.destinationZoneZoneEnum);
    };
    return MoveCardEffect;
}(RuntimeEffect_1.default));
// we don't need to register this with Effect becuase this won't be created from JSON
// and has it's own creation function
exports.default = MoveCardEffect;
