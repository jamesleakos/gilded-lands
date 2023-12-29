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
var RuntimeKeyword_1 = __importDefault(require("../RuntimeKeyword"));
var Keyword_1 = require("../../../../Enums/Keyword");
var RuntimeCondition_1 = __importDefault(require("../../../Condition/RuntimeCondition"));
var AttackEffect_1 = __importDefault(require("../../../Effect/RuntimeEffects/AttackEffects/AttackEffect"));
var DealSetDamageEffect_1 = __importDefault(require("../../../Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect"));
var IntModifier_1 = __importDefault(require("../../../ModifableInt/IntModifier"));
var ModifiableInt_1 = __importDefault(require("../../../ModifableInt/ModifiableInt"));
var DamageModificationKeyword = /** @class */ (function (_super) {
    __extends(DamageModificationKeyword, _super);
    function DamageModificationKeyword(myEntityId, indexForUpgrades, setDescription, setIsPermanent, setDuration, isActive, imageName, conditions, modifyAbilityDamageAmount, modifyAttackAmount) {
        var _this = _super.call(this) || this;
        _this.myEntityInstanceId = myEntityId;
        _this.keywordType = Keyword_1.KeywordType.DamageModification;
        _this.indexForUpgrades = indexForUpgrades;
        _this.description = setDescription;
        _this.isPermanent = setIsPermanent;
        _this.duration = setDuration;
        _this.isActive = isActive;
        _this.imageName = imageName;
        _this.conditions = conditions;
        _this.modifyAbilityDamageAmount = modifyAbilityDamageAmount;
        _this.modifyAttackAmount = modifyAttackAmount;
        return _this;
    }
    DamageModificationKeyword.prototype.preResolveEffect = function (e, sourceEntity, gameState, targetInfoList) {
        var _this = this;
        if (!this.isActive) {
            return;
        }
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        switch (e.constructor) {
            case AttackEffect_1.default:
                // get effect
                var attackEffect = e;
                // attacked card
                var attackedCard = gameState.getCardFromAnywhere(targetInfoList[0].targetEntityInstanceIds[0]);
                if (!attackedCard)
                    throw new Error('attackedCard is null');
                // attacking card
                var sourceCard = sourceEntity;
                if (!sourceCard)
                    throw new Error('attackingCard is null');
                // do the blocking cards
                attackEffect.blockInfo.forEach(function (b) {
                    var blockingCard = gameState.getCardFromAnywhere(b.blockingCardInstanceId);
                    if (!blockingCard) {
                        throw new Error('blockingCard is null');
                    }
                    var meetsConditions = true;
                    for (var _i = 0, _a = _this.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        if (!condition.isTrue(blockingCard.instanceId, myEntity.instanceId, gameState)) {
                            meetsConditions = false;
                        }
                    }
                    if (meetsConditions) {
                        b.damageToBlockingCard.intModifiers.push(new IntModifier_1.default(_this.modifyAttackAmount.effectiveValue, false));
                    }
                });
                // now do the same for the attacked card
                var attackedMeetsConditions = true;
                for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
                    var condition = _a[_i];
                    if (!condition.isTrue(attackedCard.instanceId, myEntity.instanceId, gameState)) {
                        attackedMeetsConditions = false;
                    }
                }
                if (attackedMeetsConditions) {
                    attackEffect.damageToAttackedCard.intModifiers.push(new IntModifier_1.default(this.modifyAttackAmount.effectiveValue, false));
                }
                // now do the same for the attacking card
                var attackingMeetsConditions = true;
                for (var _b = 0, _c = this.conditions; _b < _c.length; _b++) {
                    var condition = _c[_b];
                    if (!condition.isTrue(sourceCard.instanceId, myEntity.instanceId, gameState)) {
                        attackingMeetsConditions = false;
                    }
                }
                if (attackingMeetsConditions) {
                    attackEffect.damageToAttackingCard.intModifiers.push(new IntModifier_1.default(this.modifyAttackAmount.effectiveValue, false));
                }
                break;
            case DealSetDamageEffect_1.default:
                var dealSetDamageEffect_1 = e;
                if (targetInfoList.length !== 1) {
                    throw new Error('targetInfoList.length !== 1');
                }
                var attackedCards = targetInfoList[0].targetEntityInstanceIds.map(function (c) {
                    var card = gameState.getCardFromAnywhere(c);
                    if (!card)
                        throw new Error('card is null');
                    return card;
                });
                attackedCards.forEach(function (c, index) {
                    var meetsConditions = true;
                    for (var _i = 0, _a = _this.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        if (!condition.isTrue(c.instanceId, myEntity.instanceId, gameState)) {
                            meetsConditions = false;
                        }
                    }
                    if (meetsConditions) {
                        dealSetDamageEffect_1.damageAmountTracker[index].intModifiers.push(new IntModifier_1.default(_this.modifyAbilityDamageAmount.effectiveValue, false));
                    }
                });
            default:
                break;
        }
    };
    // #region JSON
    DamageModificationKeyword.prototype.toJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[this.keywordType],
            myEntityInstanceId: this.myEntityInstanceId,
            indexForUpgrades: this.indexForUpgrades,
            description: this.description,
            isPermanent: this.isPermanent,
            duration: this.duration,
            isActive: this.isActive,
            imageName: this.imageName,
            conditions: this.conditions.map(function (c) { return c.toJSON(); }),
            modifyAbilityDamageAmount: this.modifyAbilityDamageAmount,
            modifyAttackAmount: this.modifyAttackAmount,
        };
    };
    DamageModificationKeyword.prototype.clone = function () {
        return new DamageModificationKeyword(this.myEntityInstanceId, this.indexForUpgrades, this.description, this.isPermanent, this.duration, this.isActive, this.imageName, this.conditions.map(function (c) { return c.clone(); }), this.modifyAbilityDamageAmount.clone(), this.modifyAttackAmount.clone());
    };
    DamageModificationKeyword.fromRuntimeJSON = function (json) {
        return new DamageModificationKeyword(json.myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.imageName, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromRuntimeJSON(c); }), ModifiableInt_1.default.fromJSON(json.modifyAbilityDamageAmount), ModifiableInt_1.default.fromJSON(json.modifyAttackAmount));
    };
    DamageModificationKeyword.fromLibraryJSON = function (myEntityInstanceId, json) {
        return new DamageModificationKeyword(myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.imageName, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromLibraryJSON(c); }), new ModifiableInt_1.default(json.data.modifyAbilityDamageAmount.value, []), new ModifiableInt_1.default(json.data.modifyAttackAmount.value, []));
    };
    DamageModificationKeyword.isLibraryJSONValid = function (json) {
        if (json.keywordType &&
            Object.values(Keyword_1.KeywordType)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.keywordType) &&
            json.indexForUpgrades &&
            typeof json.indexForUpgrades === 'number' &&
            json.description &&
            typeof json.description === 'string' &&
            json.isPermanent &&
            typeof json.isPermanent === 'boolean' &&
            json.duration &&
            typeof json.duration === 'number' &&
            json.isActive &&
            typeof json.isActive === 'boolean' &&
            json.imageName &&
            typeof json.imageName === 'string' &&
            json.conditions &&
            Array.isArray(json.conditions) &&
            json.conditions.every(function (c) {
                return RuntimeCondition_1.default.isLibraryJSONValid(c);
            }) &&
            json.data.modifyAbilityDamageAmount &&
            json.data.modifyAttackAmount) {
            return true;
        }
        return false;
    };
    DamageModificationKeyword.createSampleLibraryJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[Keyword_1.KeywordType.DamageModification],
            indexForUpgrades: 0,
            description: '',
            isPermanent: false,
            duration: 0,
            isActive: false,
            imageName: '',
            conditions: [],
            data: {
                modifyAbilityDamageAmount: {
                    type: 'Number',
                    value: 0,
                },
                modifyAttackAmount: {
                    type: 'Number',
                    value: 0,
                },
            },
        };
    };
    return DamageModificationKeyword;
}(RuntimeKeyword_1.default));
RuntimeKeyword_1.default.registerFromLibraryJSON;
exports.default = DamageModificationKeyword;
