import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import RuntimeZone from '../Zone/RuntimeZone';
import LibraryEnchantment from './LibraryEnchantment';
import RuntimeEffect from '../Effect/RuntimeEffect';
import GameState from '../Game/GameState';

class RuntimeEnchantment extends AbilityKeywordRuntimeEntity {
  libraryID: number;
  creatingEntityInstanceId: number;
  residingCardInstanceId: number | null;
  imageName: string;

  constructor(
    name: string,
    imageName: string,
    libraryID: number,
    instanceId: number,
    creatingEntityInstanceId: number,
    creatingPlayerUserId: string,
    runtimeKeywords: RuntimeKeyword[],
    abilities: RuntimeAbility[],
    residingZoneInstanceId: number,
    residingCardInstanceId: number | null = null
  ) {
    super();

    this.libraryID = libraryID;

    this.ownerPlayerUserId = creatingPlayerUserId;
    this.instanceId = instanceId;
    this.residingZoneInstanceId = residingZoneInstanceId;
    this.creatingEntityInstanceId = creatingEntityInstanceId;
    this.residingCardInstanceId = residingCardInstanceId;
    this.name = name;
    this.imageName = imageName;
    this.keywords = runtimeKeywords;
    this.abilities = abilities;
  }

  toJSON(): any {
    const json = {
      // start super
      name: this.name,
      instanceId: this.instanceId,
      residingZoneInstanceId: this.residingZoneInstanceId,
      ownerPlayerUserId: this.ownerPlayerUserId,
      runtimeKeywords: this.keywords.map((k) => k.toJSON()),
      abilities: this.abilities.map((a) => a.toJSON()),
      // end super

      imageName: this.imageName,
      libraryID: this.libraryID,
      creatingEntityInstanceId: this.creatingEntityInstanceId,
      residingCardInstanceId: this.residingCardInstanceId,
    };

    return json;
  }

  static fromRuntimeJSON(json: any): RuntimeEnchantment {
    const runtimeEnchantment = new RuntimeEnchantment(
      json.name,
      json.imageName,
      json.libraryID,
      json.instanceId,
      json.creatingEntityInstanceId,
      json.ownerPlayerUserId,
      json.runtimeKeywords.map((keyword: any) => {
        return RuntimeKeyword.fromRuntimeJSON(keyword);
      }),
      json.abilities.map((ability: any) =>
        RuntimeAbility.fromRuntimeJSON(ability)
      ),
      json.residingZoneInstanceId,
      json.residingCardInstanceId
    );
    return runtimeEnchantment;
  }

  static fromLibraryJSON(
    json: any,
    creatingEntity: AbilityKeywordRuntimeEntity,
    ownerPlayer: PlayerInfo,
    residingZone: RuntimeZone,
    residingCard: RuntimeCard | null = null
  ): RuntimeEnchantment {
    const runtimeEnchantment = new RuntimeEnchantment(
      json.name,
      json.imageName,
      json.libraryID,
      json.instanceId,
      creatingEntity.instanceId,
      ownerPlayer.userId,
      json.runtimeKeywords.map((keyword: any) =>
        RuntimeKeyword.fromLibraryJSON(creatingEntity.instanceId, keyword)
      ),
      json.abilities.map((ability: any) =>
        RuntimeAbility.fromLibraryJSON(ability)
      ),
      residingZone.instanceId,
      residingCard.instanceId
    );

    return runtimeEnchantment;
  }
}

export default RuntimeEnchantment;
