declare enum DeckReqType {
    CardAmount = 0,
    DepthAmount = 1,
    FullCardPerCard = 2,
    FullLandDepthPerCard = 3,
    LandAmount = 4
}
declare enum DeckReqVariable {
    Amount = 0,
    LibraryCardId = 1,
    BiomeType = 2,
    BiomeDepth = 3,
    PerCardAmount = 4
}
export { DeckReqVariable, DeckReqType };
