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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("../../MessageBase");
var RegisterPlayerMessage = /** @class */ (function (_super) {
    __extends(RegisterPlayerMessage, _super);
    function RegisterPlayerMessage(senderUserId, name, isHuman, realm, landtiles // this is a bit redundant but it is useful for registering the player
    ) {
        var _this = _super.call(this, senderUserId) || this;
        _this.name = name;
        _this.isHuman = isHuman;
        _this.realm = realm;
        _this.landtiles = landtiles;
        return _this;
    }
    RegisterPlayerMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { name: this.name, isHuman: this.isHuman, realm: this.realm.toJSONForPlayer(), landtiles: this.landtiles.map(function (tile) { return tile.toJSON(); }) });
    };
    RegisterPlayerMessage.fromJSON = function (json) {
        return new RegisterPlayerMessage(json.senderSocketId, json.name, json.isHuman, json.realm, json.landtiles);
    };
    // check that all fields in the message are valid
    RegisterPlayerMessage.prototype.validate = function () {
        return (this.senderUserId != null &&
            this.name != null &&
            this.isHuman != null &&
            this.realm != null &&
            this.landtiles != null);
    };
    return RegisterPlayerMessage;
}(MessageBase_1.ClientMessage));
exports.default = RegisterPlayerMessage;
