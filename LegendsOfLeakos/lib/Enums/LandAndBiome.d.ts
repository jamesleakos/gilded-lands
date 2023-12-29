declare enum LandType {
    forest = 0,
    ocean = 1,
    desert = 2,
    prairie = 3,
    fells = 4,
    mountain = 5,
    tundra = 6,
    city = 7
}
declare enum BiomeType {
    forest = 0,
    ocean = 1,
    desert = 2,
    prairie = 3,
    fells = 4,
    mountain = 5,
    tundra = 6,
    city = 7,
    world = 8
}
declare enum BiomeDepth {
    all = 0,
    shallow = 1,
    mid = 2,
    deep = 3
}
declare enum BiomeAddCardEnum {
    Success = 0,
    PartiallyAdded = 1,
    Failure = 2
}
export { LandType, BiomeType, BiomeDepth, BiomeAddCardEnum };
