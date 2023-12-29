declare class LibraryCardEntry {
    libraryId: number;
    amount: number;
    constructor(libraryId: number, amount: number);
    toJSON(): {
        libraryId: number;
        amount: number;
    };
    static fromJSON(json: any): LibraryCardEntry;
}
export default LibraryCardEntry;
