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
    RuntimeEffect.registerFromRuntimeJSON = function (type, method) {
        this.fromRuntimeJSONMethods[type] = method;
    };
    RuntimeEffect.fromRuntimeJSON = function (json) {
        var effectType = Effect_1.EffectType[json.effectType];
        var method = this.fromRuntimeJSONMethods[effectType];
        if (!method) {
            throw new Error('Effect type not registered for: ' + Effect_1.EffectType[effectType]);
        }
        return method(json);
    };
    RuntimeEffect.registerFromLibraryJSON = function (type, method) {
        this.fromLibraryJSONMethods[type] = method;
    };
    RuntimeEffect.fromLibraryJSON = function (json) {
        var effectType = Effect_1.EffectType[json.effectType];
        var method = this.fromLibraryJSONMethods[effectType];
        if (!method) {
            throw new Error('Effect type not registered for: ' + Effect_1.EffectType[effectType]);
        }
        return method(json);
    };
    RuntimeEffect.registerIsLibraryJSONValid = function (type, method) {
        this.isLibraryJSONValidMethods[type] = method;
    };
    RuntimeEffect.isLibraryJSONValid = function (json) {
        var effectType = Effect_1.EffectType[json.effectType];
        var method = this.isLibraryJSONValidMethods[effectType];
        if (!method) {
            throw new Error('Effect type not registered for: ' + Effect_1.EffectType[effectType]);
        }
        return method(json);
    };
    RuntimeEffect.registerSampleLibraryJSON = function (type, creator) {
        this.sampleLibraryJSONMethods[type] = creator;
    };
    RuntimeEffect.createSampleLibraryJSON = function (type) {
        var creator = this.sampleLibraryJSONMethods[type];
        if (!creator) {
            throw new Error('No sample effect creator for: ' + Effect_1.EffectType[type]);
        }
        return creator();
    };
    // #endregion
    // #region Runtime JSON Methods
    RuntimeEffect.fromRuntimeJSONMethods = {};
    // #endregion
    // #region Library JSON Methods
    RuntimeEffect.fromLibraryJSONMethods = {};
    // #endregion
    // #region isLibraryJSONValid methods
    RuntimeEffect.isLibraryJSONValidMethods = {};
    // #endregion
    // #region Register Sample Effect Creators
    RuntimeEffect.sampleLibraryJSONMethods = {};
    return RuntimeEffect;
}());
exports.default = RuntimeEffect;
