"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeckRequirements_1 = require("../../Enums/DeckRequirements");
var DeckRequirement = /** @class */ (function () {
    function DeckRequirement() {
    }
    DeckRequirement.prototype.toJSON = function () {
        var reqValueList = [];
        this.reqValues.forEach(function (value, key) {
            reqValueList.push({ key: DeckRequirements_1.DeckReqVariable[key], value: value });
        });
        return {
            type: DeckRequirements_1.DeckReqType[this.type],
            reqValues: reqValueList,
        };
    };
    DeckRequirement.registerRequirement = function (type, fromJSONMethod) {
        this.fromJSONMethods[type] = fromJSONMethod;
    };
    DeckRequirement.fromJSON = function (json) {
        var reqType = json.type;
        var fromJSONMethod = this.fromJSONMethods[reqType];
        if (!fromJSONMethod) {
            throw new Error('Unknown DeckRequirement type: ' + reqType);
        }
        return fromJSONMethod(json);
        // let reqType = json.type as DeckReqType;
        // switch (reqType) {
        //   case DeckReqType.CardAmount:
        //     return CardAmountDeckRequirement.fromJSON(json);
        //   case DeckReqType.FullCardPerCard:
        //     return FullCardPerCardRequirement.fromJSON(json);
        //   case DeckReqType.DepthAmount:
        //     return DepthAmountDeckRequirement.fromJSON(json);
        //   case DeckReqType.FullLandDepthPerCard:
        //     return FullLandDepthPerCardRequirement.fromJSON(json);
        //   case DeckReqType.LandAmount:
        //     return LandAmountDeckRequirement.fromJSON(json);
        //   default:
        //     throw new Error('Unknown DeckRequirement type: ' + reqType);
        // }
    };
    DeckRequirement.isLibraryJSONValid = function (json) {
        if (typeof json.type !== 'string') {
            console.log('Invalid JSON: type is not a string');
            return false;
        }
        if (!Object.values(DeckRequirements_1.DeckReqType).includes(json.type)) {
            console.log('Invalid JSON: type is not a valid DeckReqType');
            return false;
        }
        if (!Array.isArray(json.reqValues)) {
            console.log('Invalid JSON: reqValues is not an array');
            return false;
        }
        for (var _i = 0, _a = json.reqValues; _i < _a.length; _i++) {
            var reqValue = _a[_i];
            if (typeof reqValue.key !== 'string') {
                console.log('Invalid JSON: reqValue key is not a string');
                return false;
            }
            if (!Object.values(DeckRequirements_1.DeckReqVariable).includes(reqValue.key)) {
                console.log('Invalid JSON: reqValue key is not a valid DeckReqVariable');
                return false;
            }
            if (typeof reqValue.value !== 'number') {
                console.log('Invalid JSON: reqValue value is not a number');
                return false;
            }
        }
        return true;
    };
    // here we've inlucing the from json, becuase we've gone straight to the json method instead of the constructor
    // private static requirementConstructors: {
    //   [key in DeckReqType]?: new () => DeckRequirement;
    // } = {};
    DeckRequirement.fromJSONMethods = {};
    return DeckRequirement;
}());
exports.default = DeckRequirement;
