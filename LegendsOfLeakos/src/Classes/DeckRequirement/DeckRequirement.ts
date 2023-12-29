import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import CardAmountDeckRequirement from './CardAmountDeckRequirement';
import DepthAmountDeckRequirement from './DepthAmountDeckRequirement';
import FullCardPerCardRequirement from './FullCardPerCardRequirement';
import FullLandDepthPerCardRequirement from './FullLandDepthPerCardRequirement';
import LandAmountDeckRequirement from './LandAmountDeckRequirement';

abstract class DeckRequirement {
  type: DeckReqType;
  reqValues: Map<DeckReqVariable, number>;

  abstract canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;

  abstract isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean;

  abstract requirementToText(gameProperties: any): string;

  abstract myRequiredValues(): DeckReqVariable[];

  toJSON(): any {
    let reqValueList: any = [];
    this.reqValues.forEach((value, key) => {
      reqValueList.push({ key: DeckReqVariable[key], value: value });
    });
    return {
      type: DeckReqType[this.type],
      reqValues: reqValueList,
    };
  }

  // here we've inlucing the from json, becuase we've gone straight to the json method instead of the constructor

  // private static requirementConstructors: {
  //   [key in DeckReqType]?: new () => DeckRequirement;
  // } = {};

  private static fromJSONMethods: {
    [key in DeckReqType]?: (json: any) => DeckRequirement;
  } = {};

  public static registerRequirement(
    type: DeckReqType,
    fromJSONMethod: (json: any) => DeckRequirement
  ): void {
    this.fromJSONMethods[type] = fromJSONMethod;
  }

  static fromJSON(json: any): DeckRequirement {
    let reqType = json.type as DeckReqType;
    const fromJSONMethod = this.fromJSONMethods[reqType];

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
  }

  static isLibraryJSONValid(json: any): boolean {
    if (typeof json.type !== 'string') {
      console.log('Invalid JSON: type is not a string');
      return false;
    }
    if (!Object.values(DeckReqType).includes(json.type as DeckReqType)) {
      console.log('Invalid JSON: type is not a valid DeckReqType');
      return false;
    }
    if (!Array.isArray(json.reqValues)) {
      console.log('Invalid JSON: reqValues is not an array');
      return false;
    }
    for (const reqValue of json.reqValues) {
      if (typeof reqValue.key !== 'string') {
        console.log('Invalid JSON: reqValue key is not a string');
        return false;
      }
      if (
        !Object.values(DeckReqVariable).includes(
          reqValue.key as DeckReqVariable
        )
      ) {
        console.log(
          'Invalid JSON: reqValue key is not a valid DeckReqVariable'
        );
        return false;
      }
      if (typeof reqValue.value !== 'number') {
        console.log('Invalid JSON: reqValue value is not a number');
        return false;
      }
    }

    return true;
  }
}

export default DeckRequirement;
