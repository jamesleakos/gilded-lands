enum LandType {
  forest,
  ocean,
  desert,
  prairie,
  fells,
  mountain,
  tundra,
  city,
}

enum BiomeType {
  forest,
  ocean,
  desert,
  prairie,
  fells,
  mountain,
  tundra,
  city,
  world,
}

enum BiomeDepth {
  all,
  shallow,
  mid,
  deep,
}

enum BiomeAddCardEnum {
  Success,
  PartiallyAdded,
  Failure,
}

export { LandType, BiomeType, BiomeDepth, BiomeAddCardEnum };
