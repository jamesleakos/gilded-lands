"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../../Enums/Keyword");
var RuntimeKeyword = /** @class */ (function () {
    function RuntimeKeyword() {
        // conditions for stat buffs
        this.conditions = [];
    }
    // #region EFFECTS
    RuntimeKeyword.prototype.addStatBuff = function (stat, statCard, gameState) {
        return null;
    };
    RuntimeKeyword.prototype.preResolveEffect = function (e, sourceEntity, gameState, targetInfoList) { };
    RuntimeKeyword.prototype.postResolveEffect = function (e, sourceEntity, gameState, targetInfoList) { };
    // #endregion
    // #region End Turn
    RuntimeKeyword.prototype.onEndTurn = function (gameState) {
        if (!this.isPermanent) {
            this.duration = this.duration - 1;
            if (this.duration <= 0) {
                var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
                if (!myEntity) {
                    throw new Error("Could not find entity with id ".concat(this.myEntityInstanceId));
                }
                myEntity.removeKeyword(this);
            }
        }
    };
    RuntimeKeyword.registerFromRuntimeJSON = function (type, method) {
        this.fromRuntimeJSONMethods[type] = method;
    };
    RuntimeKeyword.fromRuntimeJSON = function (json) {
        var keywordType = Keyword_1.KeywordType[json.keywordType];
        var method = this.fromRuntimeJSONMethods[keywordType];
        if (!method) {
            throw new Error('Keyword type not registered for: ' + Keyword_1.KeywordType[keywordType]);
        }
        return method(json);
    };
    RuntimeKeyword.registerFromLibraryJSON = function (type, method) {
        this.fromLibraryJSONMethods[type] = method;
    };
    RuntimeKeyword.fromLibraryJSON = function (myEntityInstanceId, json) {
        var keywordType = Keyword_1.KeywordType[json.keywordType];
        var method = this.fromLibraryJSONMethods[keywordType];
        if (!method) {
            throw new Error('Keyword type not registered for: ' + Keyword_1.KeywordType[keywordType]);
        }
        return method(myEntityInstanceId, json);
    };
    RuntimeKeyword.registerIsLibraryJSONValid = function (type, method) {
        this.isLibraryJSONValidMethods[type] = method;
    };
    RuntimeKeyword.isLibraryJSONValid = function (json) {
        var keywordType = Keyword_1.KeywordType[json.keywordType];
        var method = this.isLibraryJSONValidMethods[keywordType];
        if (!method) {
            throw new Error('Keyword type not registered for: ' + Keyword_1.KeywordType[keywordType]);
        }
        return method(json);
    };
    RuntimeKeyword.registerSampleLibraryJSON = function (type, creator) {
        this.sampleLibraryJSONMethods[type] = creator;
    };
    RuntimeKeyword.createSampleLibraryJSON = function (type) {
        var method = this.sampleLibraryJSONMethods[type];
        if (!method) {
            throw new Error('Keyword type not registered for: ' + Keyword_1.KeywordType[type]);
        }
        return method();
    };
    // #endregion
    // #region fromRuntimeJSON methods
    RuntimeKeyword.fromRuntimeJSONMethods = {};
    // #endregion
    // #region fromLibraryJSON methods
    RuntimeKeyword.fromLibraryJSONMethods = {};
    // #endregion
    // #region isLibraryJSONValid methods
    RuntimeKeyword.isLibraryJSONValidMethods = {};
    // #endregion
    // #region Register Sample Keyword Creators
    RuntimeKeyword.sampleLibraryJSONMethods = {};
    return RuntimeKeyword;
}());
exports.default = RuntimeKeyword;
