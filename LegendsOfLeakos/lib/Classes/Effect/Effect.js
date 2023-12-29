"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
// Base class of an effect. It consists of a type (which is associated with a child class, which holds the logic for execution of the effect),
// a list of EffectValues,
var RuntimeEffect = /** @class */ (function () {
    function RuntimeEffect() {
    }
    RuntimeEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        // Optional override
    };
    RuntimeEffect.registerFromJSON = function (type, method) {
        this.fromJSONMethods[type] = method;
    };
    RuntimeEffect.fromJSON = function (json) {
        var effectType = Effect_1.EffectType[json.effectType];
        var method = this.fromJSONMethods[effectType];
        if (!method) {
            throw new Error('Effect type not registered');
        }
        return method(json);
    };
    RuntimeEffect.registerIsJSONValid = function (type, method) {
        this.isJSONValidMethods[type] = method;
    };
    RuntimeEffect.isJSONValid = function (json) {
        var effectType = Effect_1.EffectType[json.effectType];
        var method = this.isJSONValidMethods[effectType];
        if (!method) {
            throw new Error('Effect type not registered');
        }
        return method(json);
    };
    RuntimeEffect.registerSampleEffectCreator = function (type, creator) {
        this.sampleEffectCreators[type] = creator;
    };
    RuntimeEffect.createSampleEffect = function (type) {
        var creator = this.sampleEffectCreators[type];
        if (!creator) {
            throw new Error('No sample effect creator for ' + type);
        }
        return creator();
    };
    RuntimeEffect.fromJSONMethods = {};
    // #endregion
    // #region isJSONValid methods
    RuntimeEffect.isJSONValidMethods = {};
    // #endregion
    // #region Register Sample Effect Creators
    RuntimeEffect.sampleEffectCreators = {};
    return RuntimeEffect;
}());
exports.default = RuntimeEffect;
