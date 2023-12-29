import { KeywordType } from '../../../Enums/Keyword';
import LibraryCondition from '../../Condition/LibraryCondition';

class LibraryKeyword {
  keywordType: KeywordType;
  indexForUpgrades: number;
  designerDescription: string;
  isPermanent: boolean;
  duration: number;
  startsActive: boolean;
  // conditions are for like - which cards will this buff, etc. I think it's largely for stat buffs
  conditions: Array<LibraryCondition> = [];
  imageName: string; // Don't need new, check out constructor

  // data
  data: any;

  constructor(
    keywordType: KeywordType,
    indexForUpgrades: number,
    designerDescription: string,
    isPermanent: boolean,
    duration: number,
    startsActive: boolean,
    conditions: Array<LibraryCondition>,
    imageName: string,
    data: any
  ) {
    this.keywordType = keywordType;
    this.indexForUpgrades = indexForUpgrades;
    this.designerDescription = designerDescription;
    this.isPermanent = isPermanent;
    this.duration = duration;
    this.startsActive = startsActive;
    this.conditions = conditions;
    this.imageName = imageName;
    this.data = data;
  }

  toJSON(): any {
    return {
      keywordType: this.keywordType,
      indexForUpgrades: this.indexForUpgrades,
      designerDescription: this.designerDescription,
      isPermanent: this.isPermanent,
      duration: this.duration,
      startsActive: this.startsActive,
      conditions: this.conditions.map((c) => c.toJSON()),
      imageName: this.imageName,
      data: this.data,
    };
  }

  static fromJSON(json: any): LibraryKeyword {
    return new LibraryKeyword(
      json.keywordType,
      json.indexForUpgrades,
      json.designerDescription,
      json.isPermanent,
      json.duration,
      json.startsActive,
      json.conditions.map((c: any) => LibraryCondition.fromJSON(c)),
      json.imageName,
      json.data
    );
  }
}

export default LibraryKeyword;
