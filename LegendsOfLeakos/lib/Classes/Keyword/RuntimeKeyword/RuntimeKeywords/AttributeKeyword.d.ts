import RuntimeKeyword from '../RuntimeKeyword';
import { Attribute } from '../../../../Enums/Keyword';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
declare class AttributeKeyword extends RuntimeKeyword {
    attribute: Attribute;
    constructor(myEntityId: number, indexForUpgrades: number, setDescription: string, setIsPermanent: boolean, setDuration: number, isActive: boolean, imageName: string, conditions: RuntimeCondition[], attribute: Attribute);
    toJSON(): any;
    clone(): RuntimeKeyword;
    static fromRuntimeJSON(json: any): RuntimeKeyword;
    static fromLibraryJSON(myEntityInstanceId: number, json: any): RuntimeKeyword;
    static isLibraryJSONValid(json: any): boolean;
    static createSampleLibraryJSON(): any;
}
export default AttributeKeyword;
