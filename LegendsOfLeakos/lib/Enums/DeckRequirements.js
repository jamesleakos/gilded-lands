"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckReqType = exports.DeckReqVariable = void 0;
var DeckReqType;
(function (DeckReqType) {
    DeckReqType[DeckReqType["CardAmount"] = 0] = "CardAmount";
    DeckReqType[DeckReqType["DepthAmount"] = 1] = "DepthAmount";
    DeckReqType[DeckReqType["FullCardPerCard"] = 2] = "FullCardPerCard";
    DeckReqType[DeckReqType["FullLandDepthPerCard"] = 3] = "FullLandDepthPerCard";
    DeckReqType[DeckReqType["LandAmount"] = 4] = "LandAmount";
})(DeckReqType || (DeckReqType = {}));
exports.DeckReqType = DeckReqType;
var DeckReqVariable;
(function (DeckReqVariable) {
    DeckReqVariable[DeckReqVariable["Amount"] = 0] = "Amount";
    DeckReqVariable[DeckReqVariable["LibraryCardId"] = 1] = "LibraryCardId";
    DeckReqVariable[DeckReqVariable["BiomeType"] = 2] = "BiomeType";
    DeckReqVariable[DeckReqVariable["BiomeDepth"] = 3] = "BiomeDepth";
    DeckReqVariable[DeckReqVariable["PerCardAmount"] = 4] = "PerCardAmount";
})(DeckReqVariable || (DeckReqVariable = {}));
exports.DeckReqVariable = DeckReqVariable;
