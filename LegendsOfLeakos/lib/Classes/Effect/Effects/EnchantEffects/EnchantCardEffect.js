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
var ActivatedAbility_1 = __importDefault(require("../../../Ability/ActivatedAbility"));
var RuntimeEnchantment_1 = __importDefault(require("../../../Enchantment/RuntimeEnchantment"));
var RuntimeKeyword_1 = __importDefault(require("../../../Keyword/RuntimeKeyword/RuntimeKeyword"));
var Effect_1 = __importDefault(require("../../Effect"));
var GiveEnchantmentBaseEffect_1 = __importDefault(require("./GiveEnchantmentBaseEffect"));
var EffectValue_1 = __importDefault(require("../../EffectValue"));
var Effect_2 = require("../../../../Enums/Effect");
var TargetCriteria_1 = __importDefault(require("../../../Target/TargetCriteria"));
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var Target_1 = require("../../../../Enums/Target");
var EnchantCardEffect = /** @class */ (function (_super) {
    __extends(EnchantCardEffect, _super);
    function EnchantCardEffect(effectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectType = Effect_2.EffectType.EnchantCard;
        _this.effectValues = effectValues;
        _this.targetCriterias = setTargetTypes;
        _this.checkConstructorIntegrity();
        return _this;
    }
    // #region Effect Execution
    EnchantCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeEnchanted = targetInfoList[0];
        var enchantmentID = this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID);
        enchantmentID.fitToTargetInfo(targetsToBeEnchanted);
        if (!this.isTargetInfoValid(sourceEntity, state, targetsToBeEnchanted, this.targetCriterias[0]))
            return false;
        for (var i = 0; i < enchantmentID.modInts.length; i++) {
            enchantmentID.modInts[i].baseValue = enchantmentID.setValue;
        }
        return true;
    };
    EnchantCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var cardsToEnchant = targetInfoList[0];
        var cardsToEnchantTargetType = this.targetCriterias[0];
        if (!this.isTargetInfoValid(sourceEntity, state, cardsToEnchant, this.targetCriterias[0]))
            return;
        var enchantmentLibID = this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID);
        for (var i = 0; i < cardsToEnchant.targetEntityInstanceIds.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(cardsToEnchant.targetEntityInstanceIds[i]);
            if (!cardsToEnchantTargetType.entitySatisfiesConditions(currentTargetCard.instanceId, sourceEntity.instanceId, state))
                break;
            var creatingPlayer = state.getPlayerInfoByUserId(sourceEntity.ownerPlayerUserId);
            var libraryEnchantment = state.gameManager.getEnchantmentFromLibraryId(enchantmentLibID.modInts[i].effectiveValue);
            var runtimeEnchantment = new RuntimeEnchantment_1.default(libraryEnchantment.name, libraryEnchantment.imageName, libraryEnchantment.libraryId, creatingPlayer.currentEntityInstanceId++, sourceEntity.instanceId, creatingPlayer.userId, libraryEnchantment.keywords.map(function (keyword) {
                return RuntimeKeyword_1.default.fromLibraryJSON(keyword, sourceEntity);
            }), libraryEnchantment.activatedAbilities.map(function (ability) {
                return ActivatedAbility_1.default.fromJSON(ability);
            }), currentTargetCard.residingZoneInstanceId, currentTargetCard.instanceId);
            currentTargetCard.enchantments.push(runtimeEnchantment);
        }
    };
    // #endregion
    // #region Builders and Utils
    EnchantCardEffect.sampleEffectForCardBuilder = function () {
        var effectValues = [];
        effectValues.push(new EffectValue_1.default(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID, 0, []));
        var enchantTargetType = new TargetCriteria_1.default('Enchant Target', Target_1.TargetTypeEnum.TargetCreature, 1, 1, 1, Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []);
        return new EnchantCardEffect(effectValues, [enchantTargetType]);
    };
    EnchantCardEffect.prototype.myRequiredEffectValues = function () {
        return _super.prototype.myRequiredEffectValues.call(this);
    };
    EnchantCardEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    EnchantCardEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Enchanted', 'These are the units that are enchanted by this effect. At least one must remain in the targetableZoneEnumList as of PreEffect to prevent sizzle', 'Targets must be cards', 1, null));
        return list;
    };
    EnchantCardEffect.prototype.effectToString = function (gameManager) {
        var outText = 'Enchant card with ' +
            gameManager.enchantmentLibrary[this.getEffectValue(Effect_2.EffectValueType.CreateEnchantmentEnchantmentLibraryID).setValue];
        return outText;
    };
    return EnchantCardEffect;
}(GiveEnchantmentBaseEffect_1.default));
Effect_1.default.registerEffect(Effect_2.EffectType.EnchantCard, EnchantCardEffect);
Effect_1.default.registerSampleEffectCreator(Effect_2.EffectType.EnchantCard, EnchantCardEffect.sampleEffectForCardBuilder);
exports.default = EnchantCardEffect;
