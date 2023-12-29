declare class IntModifier {
    value: number;
    permanent: boolean;
    constructor(value: number, permanent: boolean);
    clone(): IntModifier;
}
export default IntModifier;
