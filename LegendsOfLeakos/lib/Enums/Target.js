"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetMethods = exports.TargetableTypeSelectionEnum = exports.BroadTargetTypeEnum = exports.TargetTypeEnum = void 0;
var TargetTypeEnum;
(function (TargetTypeEnum) {
    TargetTypeEnum[TargetTypeEnum["TargetCreature"] = 0] = "TargetCreature";
    TargetTypeEnum[TargetTypeEnum["TargetOpponentCreature"] = 1] = "TargetOpponentCreature";
    TargetTypeEnum[TargetTypeEnum["TargetFriendlyCreature"] = 2] = "TargetFriendlyCreature";
    TargetTypeEnum[TargetTypeEnum["TargetRow"] = 3] = "TargetRow";
    TargetTypeEnum[TargetTypeEnum["TargetOpponentRow"] = 4] = "TargetOpponentRow";
    TargetTypeEnum[TargetTypeEnum["TargetFriendlyRow"] = 5] = "TargetFriendlyRow";
    TargetTypeEnum[TargetTypeEnum["OpponentFrontRow"] = 6] = "OpponentFrontRow";
    TargetTypeEnum[TargetTypeEnum["OpponentBackRow"] = 7] = "OpponentBackRow";
    TargetTypeEnum[TargetTypeEnum["FriendlyFrontRow"] = 8] = "FriendlyFrontRow";
    TargetTypeEnum[TargetTypeEnum["FriendlyBackRow"] = 9] = "FriendlyBackRow";
    TargetTypeEnum[TargetTypeEnum["FriendlyBattleRow"] = 10] = "FriendlyBattleRow";
    TargetTypeEnum[TargetTypeEnum["OpponentBattleRow"] = 11] = "OpponentBattleRow";
})(TargetTypeEnum || (TargetTypeEnum = {}));
exports.TargetTypeEnum = TargetTypeEnum;
var BroadTargetTypeEnum;
(function (BroadTargetTypeEnum) {
    BroadTargetTypeEnum[BroadTargetTypeEnum["card"] = 0] = "card";
    BroadTargetTypeEnum[BroadTargetTypeEnum["zone"] = 1] = "zone";
})(BroadTargetTypeEnum || (BroadTargetTypeEnum = {}));
exports.BroadTargetTypeEnum = BroadTargetTypeEnum;
var TargetableTypeSelectionEnum;
(function (TargetableTypeSelectionEnum) {
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["TargetableOnActivation"] = 0] = "TargetableOnActivation";
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["TargetableOnQueueCall"] = 1] = "TargetableOnQueueCall";
    TargetableTypeSelectionEnum[TargetableTypeSelectionEnum["AutoTarget"] = 2] = "AutoTarget";
})(TargetableTypeSelectionEnum || (TargetableTypeSelectionEnum = {}));
exports.TargetableTypeSelectionEnum = TargetableTypeSelectionEnum;
var TargetMethods = /** @class */ (function () {
    function TargetMethods() {
    }
    TargetMethods.broadTargetType = function (targetTypeEnum) {
        switch (targetTypeEnum) {
            case TargetTypeEnum.TargetCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetOpponentCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetFriendlyCreature:
                return BroadTargetTypeEnum.card;
            case TargetTypeEnum.TargetOpponentRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.TargetRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.TargetFriendlyRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.OpponentFrontRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.OpponentBackRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.FriendlyFrontRow:
                return BroadTargetTypeEnum.zone;
            case TargetTypeEnum.FriendlyBackRow:
                return BroadTargetTypeEnum.zone;
            default:
                throw new Error('Case Not Implemented for broadTargetType: ' + targetTypeEnum);
        }
    };
    TargetMethods.canBeTargetable = function (targetTypeEnum) {
        switch (targetTypeEnum) {
            case TargetTypeEnum.TargetCreature:
                return true;
            case TargetTypeEnum.TargetOpponentCreature:
                return true;
            case TargetTypeEnum.TargetFriendlyCreature:
                return true;
            case TargetTypeEnum.TargetRow:
                return true;
            case TargetTypeEnum.TargetOpponentRow:
                return true;
            case TargetTypeEnum.TargetFriendlyRow:
                return true;
            case TargetTypeEnum.OpponentFrontRow:
                return false;
            case TargetTypeEnum.OpponentBackRow:
                return false;
            case TargetTypeEnum.FriendlyFrontRow:
                return false;
            case TargetTypeEnum.FriendlyBackRow:
                return false;
            default:
                throw new Error('Case Not Implemented for canBeTargetable: ' + targetTypeEnum);
        }
    };
    TargetMethods.playerSelectsTargets = function (targetableTypeSelectionEnum) {
        switch (targetableTypeSelectionEnum) {
            case TargetableTypeSelectionEnum.TargetableOnActivation:
                return true;
            case TargetableTypeSelectionEnum.TargetableOnQueueCall:
                return true;
            case TargetableTypeSelectionEnum.AutoTarget:
                return false;
            default:
                throw new Error('Case Not Implemented for playerSelectsTarget: ' +
                    targetableTypeSelectionEnum);
        }
    };
    return TargetMethods;
}());
exports.TargetMethods = TargetMethods;
