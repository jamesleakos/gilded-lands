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
var RuntimeAbility_1 = __importDefault(require("../../../Ability/RuntimeAbility"));
var RuntimeEnchantment_1 = __importDefault(require("../../../Enchantment/RuntimeEnchantment"));
var RuntimeKeyword_1 = __importDefault(require("../../../Keyword/RuntimeKeyword/RuntimeKeyword"));
var RuntimeEffect_1 = __importDefault(require("../../RuntimeEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var TargetCriteria_1 = __importDefault(require("../../../Target/TargetCriteria"));
var RuntimeZone_1 = __importDefault(require("../../../Zone/RuntimeZone"));
var Target_1 = require("../../../../Enums/Target");
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var EnchantEffect = /** @class */ (function (_super) {
    __extends(EnchantEffect, _super);
    function EnchantEffect(enchantmentLibraryID, enchantTargets) {
        var _this = _super.call(this) || this;
        _this.effectType = Effect_1.EffectType.Enchant;
        _this.enchantmentLibraryID = enchantmentLibraryID;
        _this.enchantTargets = enchantTargets;
        return _this;
    }
    EnchantEffect.prototype.targetCriterias = function () {
        return [this.enchantTargets];
    };
    // #region Resolve
    EnchantEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList))
            return false;
        return true;
    };
    EnchantEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList))
            return;
        var libraryEnchantment = state.gameManager.getEnchantmentFromLibraryId(this.enchantmentLibraryID);
        var creatingPlayer = state.getPlayerInfoByUserId(sourceEntity.ownerPlayerUserId);
        var enchantTargetInfo = targetInfoList[0];
        for (var _i = 0, _a = enchantTargetInfo.targetEntityInstanceIds; _i < _a.length; _i++) {
            var targetInstanceId = _a[_i];
            var targetEntity = state.getEntityFromAnywhere(targetInstanceId);
            var targetZone = null;
            var targetCard = null;
            if (targetEntity instanceof RuntimeZone_1.default) {
                targetZone = targetEntity;
            }
            else if (targetEntity instanceof RuntimeCard_1.default) {
                targetCard = targetEntity;
                targetZone = state.getZoneByInstanceId(targetCard.residingZoneInstanceId);
            }
            var runtimeEnchantment = new RuntimeEnchantment_1.default(libraryEnchantment.name, libraryEnchantment.imageName, libraryEnchantment.libraryId, creatingPlayer.currentEntityInstanceId++, sourceEntity.instanceId, creatingPlayer.userId, libraryEnchantment.keywords.map(function (keyword) {
                return RuntimeKeyword_1.default.fromLibraryJSON(sourceEntity.instanceId, keyword);
            }), libraryEnchantment.abilities.map(function (ability) {
                return RuntimeAbility_1.default.fromLibraryJSON(ability);
            }), targetZone.instanceId, targetCard ? targetCard.instanceId : null);
            if (targetEntity instanceof RuntimeZone_1.default) {
                targetEntity.enchantments.push(runtimeEnchantment);
            }
            else if (targetEntity instanceof RuntimeCard_1.default) {
                targetEntity.enchantments.push(runtimeEnchantment);
            }
        }
    };
    // #endregion
    // #region Targeting
    EnchantEffect.prototype.areTargetsAvailable = function (state, sourceEntity) {
        return this.enchantTargets.areTargetsAvailable(sourceEntity.instanceId, state);
    };
    EnchantEffect.prototype.isAllTargetInfoValid = function (sourceEntity, state, targetInfoList) {
        if (targetInfoList.length !== 1)
            return false;
        if (!this.enchantTargets.areTargetsAvailable(sourceEntity.instanceId, state))
            return false;
        return this.enchantTargets.isTargetInfoValid(sourceEntity.instanceId, targetInfoList[0], state);
    };
    // #endregion
    // #region Effect To Text
    EnchantEffect.prototype.effectToString = function (gameManager) {
        var outText = 'Enchant zone with ' +
            gameManager.getEnchantmentFromLibraryId(this.enchantmentLibraryID).name +
            ' enchantment';
        return outText;
    };
    // #endregion
    // #region JSON
    EnchantEffect.prototype.toJSON = function () {
        return {
            effectType: Effect_1.EffectType[this.effectType],
            enchantmentLibraryID: this.enchantmentLibraryID,
            enchantTargets: this.enchantTargets.toJSON(),
        };
    };
    EnchantEffect.prototype.clone = function () {
        return new EnchantEffect(this.enchantmentLibraryID, this.enchantTargets.clone());
    };
    EnchantEffect.fromRuntimeJSON = function (json) {
        return new EnchantEffect(json.enchantmentLibraryID, TargetCriteria_1.default.fromRuntimeJSON(json.enchantTargets));
    };
    EnchantEffect.fromLibraryJSON = function (json) {
        return new EnchantEffect(json.data.enchantmentLibraryID.value, TargetCriteria_1.default.fromLibraryJSON(json.data.enchantTargets.value));
    };
    // #endregion
    // #region Sample Effect
    EnchantEffect.createSampleLibraryJSON = function () {
        var tc = new TargetCriteria_1.default('Enchant Target', Target_1.TargetTypeEnum.TargetRow, 1, // minSelectionsRequired
        1, // maxSelectionsAllowed
        1, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, [] // conditions
        );
        return {
            effectType: Effect_1.EffectType[Effect_1.EffectType.Enchant],
            data: {
                enchantmentLibraryID: {
                    type: 'number',
                    value: 0,
                },
                enchantTargets: {
                    type: 'TargetCriteria',
                    value: tc.toJSON(),
                },
            },
        };
    };
    return EnchantEffect;
}(RuntimeEffect_1.default));
RuntimeEffect_1.default.registerFromRuntimeJSON(Effect_1.EffectType.Enchant, EnchantEffect.fromRuntimeJSON);
RuntimeEffect_1.default.registerFromLibraryJSON(Effect_1.EffectType.Enchant, EnchantEffect.fromLibraryJSON);
RuntimeEffect_1.default.registerSampleLibraryJSON(Effect_1.EffectType.Enchant, EnchantEffect.createSampleLibraryJSON);
exports.default = EnchantEffect;
